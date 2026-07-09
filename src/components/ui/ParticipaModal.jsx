import { useState, useEffect, useRef } from 'react';
import {
  Send,
  CheckCircle,
  X,
  MessageSquarePlus,
  User,
  Tag,
  AlignLeft,
  Image as ImageIcon,
  Upload,
  Paperclip,
} from 'lucide-react';
import styles from './ParticipaModal.module.css';

import { supabase } from '../../config/supabaseClient';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const TIPO_OPTIONS = [
  { value: 'Cultura', label: '🎭 Cultura y Tradición' },
  { value: 'Historia', label: '📜 Historia' },
  { value: 'Geografía', label: '🗺️ Geografía' },
  { value: 'Sociedad', label: '🏘️ Sociedad' },
  { value: 'Otro', label: '💡 Otro' },
];

const INITIAL_FORM = {
  usuario_nombre: '',
  tipo_aporte: 'Cultura',
  detalles: '',
  imagen: '', // compat (legacy)
  adjuntos: [], // { name, mime, size, url }
};

function isImageFile(file) {
  return file && file.type && file.type.startsWith('image/');
}

// Compresión liviana para imágenes usando canvas (sin librerías externas)
async function compressImageIfNeeded(file, { maxWidth = 1600, maxHeight = 1600, quality = 0.75, minBytes = 250 * 1024 } = {}) {
  // Si no es imagen, no toca
  if (!isImageFile(file)) return file;

  // Si ya es pequeña, evita cómputo
  if (file.size <= minBytes) return file;

  // Rechazar formatos raros (igual se intenta, pero así evitamos errores)
  const img = await new Promise((resolve, reject) => {
    const el = new Image();
    const url = URL.createObjectURL(file);
    el.onload = () => {
      URL.revokeObjectURL(url);
      resolve(el);
    };
    el.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    el.src = url;
  });

  const canvas = document.createElement('canvas');
  let { width, height } = img;

  const scale = Math.min(maxWidth / width, maxHeight / height, 1);
  width = Math.round(width * scale);
  height = Math.round(height * scale);

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  // Preferir webp si el original es jpeg/png; para gifs animados no aplica aquí
  const outputMime = file.type === 'image/png' ? 'image/webp' : (file.type === 'image/jpeg' ? 'image/webp' : file.type);

  const blob = await new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b), outputMime, quality);
  });

  // Si no se pudo, retorna original
  if (!blob) return file;

  return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.webp', { type: outputMime });
}

function buildSupabaseObjectPath({ usuarioNombre, tipoAporte, filename }) {
  const safeName = (filename || 'archivo').replace(/[^a-zA-Z0-9._-]+/g, '_');
  const now = new Date();
  const datePart = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(16).slice(2);
  const userPart = (usuarioNombre || 'anon').replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 40);
  const tipoPart = (tipoAporte || 'general').replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 30);

  return `aportecidudadano/${tipoPart}/${userPart}/${datePart}/${rand}-${safeName}`;
}

export default function ParticipaModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const firstInputRef = useRef(null);

  // Adjuntos locales (File[])
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);


  // Focus management & keyboard trap
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleClose = () => {
    setStatus('idle');
    setErrorMessage('');
    setFormData(INITIAL_FORM);
    setSelectedFiles([]);
    onClose();
  };


  if (!isOpen) return null;

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    addFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    addFiles(files);
  };

  const addFiles = (files) => {
    // Deduplicar por (name+size+lastModified)
    const newFiles = [...selectedFiles, ...files];
    const seen = new Set();
    const deduped = newFiles.filter((f) => {
      const key = `${f.name}-${f.size}-${f.lastModified}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    setSelectedFiles(deduped);
  };

  const removeFile = (idxToRemove) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== idxToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setStatus('loading');

    let timeoutId;

    try {
      // 1) Subir adjuntos (si hay)
      let adjuntos = [];

      if (selectedFiles.length > 0) {
        if (!supabase) {
          throw new Error('No se pudo procesar el archivo.');
        }

        const bucket = 'aportaciones';

        const uploaded = await Promise.all(
          selectedFiles.map(async (file) => {
            const compressed = await compressImageIfNeeded(file);
            const path = buildSupabaseObjectPath({
              usuarioNombre: formData.usuario_nombre,
              tipoAporte: formData.tipo_aporte,
              filename: compressed.name,
            });

            const { error } = await supabase.storage
              .from(bucket)
              .upload(path, compressed, {
                upsert: false,
                contentType: compressed.type || file.type || 'application/octet-stream',
              });

            if (error) throw error;

            const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(path);

            return {
              name: file.name,
              mime: file.type,
              size: file.size,
              url: publicData.publicUrl,
            };
          })
        );

        adjuntos = uploaded;
      }

      // Timeout de 20s solo para el request de la API de base de datos
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), 20000);

      // 2) Enviar al backend metadata
      const payload = {
        usuario_nombre: formData.usuario_nombre,
        tipo_aporte: formData.tipo_aporte,
        detalles: formData.detalles,
        imagen: formData.imagen || (adjuntos[0]?.url || null),
        adjuntos,
      };

      const res = await fetch(`${API_BASE}/sugerencias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!res.ok) {
        let details = '';
        try {
          const body = await res.json();
          details = body?.error ? `: ${body.error}` : '';
        } catch {
          // ignore
        }
        throw new Error(`No se pudo enviar tu aporte${details}.`);
      }

      setStatus('success');
    } catch (err) {
      if (err?.name === 'AbortError') {
        setErrorMessage('Se demoró demasiado en enviar. Intenta nuevamente.');
      } else {
        setErrorMessage(err?.message || 'No se pudo enviar tu aporte. Intenta nuevamente.');
      }
      setStatus('error');
    } finally {
      clearTimeout(timeoutId);
    }
  };


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Participación Ciudadana"
    >
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <MessageSquarePlus size={22} />
          </div>
          <div>
            <h2 className={styles.headerTitle}>Aportes Ciudadanos</h2>
            <p className={styles.headerSub}>
              Construyamos juntos nuestra historia. Envía tus aportes, fotos o sugerencias para enriquecer Una Sola Tacarigua.
            </p>
          </div>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Body */}
        <div className={styles.body}>
          {status === 'success' ? (
            <div className={styles.successState}>
              <div className={styles.successRing}>
                <CheckCircle size={40} />
              </div>
              <h3 className={styles.successTitle}>¡Gracias por participar!</h3>
              <p className={styles.successText}>
                Tu aporte fue enviado al equipo de moderación. Pronto lo revisaremos para publicarlo en el portal.
              </p>
              <div className={styles.successActions}>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData(INITIAL_FORM);
                    setSelectedFiles([]);
                  }}
                  className={styles.btnSecondary}
                >
                  Enviar otro aporte
                </button>
                <button onClick={handleClose} className={styles.btnPrimary}>
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Nombre */}
              <div className={`${styles.field} ${focusedField === 'nombre' ? styles.fieldFocused : ''}`}>
                <label className={styles.label} htmlFor="pm-nombre">
                  <User size={14} />
                  Tu Nombre o Organización
                </label>
                <input
                  ref={firstInputRef}
                  id="pm-nombre"
                  name="usuario_nombre"
                  type="text"
                  className={styles.input}
                  placeholder="Ej. Juan Pérez, Fundación Tacarigua…"
                  value={formData.usuario_nombre}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('nombre')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              {/* Tipo */}
              <div className={`${styles.field} ${focusedField === 'tipo' ? styles.fieldFocused : ''}`}>
                <label className={styles.label} htmlFor="pm-tipo">
                  <Tag size={14} />
                  Tipo de Aporte
                </label>
                <div className={styles.selectWrapper}>
                  <select
                    id="pm-tipo"
                    name="tipo_aporte"
                    className={styles.select}
                    value={formData.tipo_aporte}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('tipo')}
                    onBlur={() => setFocusedField(null)}
                  >
                    {TIPO_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className={styles.selectChevron}>▾</div>
                </div>
              </div>

              {/* Detalles */}
              <div className={`${styles.field} ${focusedField === 'detalles' ? styles.fieldFocused : ''}`}>
                <label className={styles.label} htmlFor="pm-detalles">
                  <AlignLeft size={14} />
                  Detalles de tu aporte
                </label>
                <textarea
                  id="pm-detalles"
                  name="detalles"
                  className={styles.textarea}
                  placeholder="Cuéntanos con detalle tu contribución, historia o sugerencia para la comunidad de Tacarigua…"
                  value={formData.detalles}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('detalles')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  required
                />
                <div className={styles.charCount}>{formData.detalles.length} caracteres</div>
              </div>

              {/* Adjuntos (Drag & Drop) */}
              <div className={styles.field}>
                <label className={styles.label}>
                  <Paperclip size={14} />
                  Archivos Adjuntos <span className={styles.optional}>(imágenes, videos, audios, documentos)</span>
                </label>

                <div 
                  className={`${styles.fileDropZone} ${isDragging ? styles.fileDropZoneActive : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click() }}
                >
                  <Upload size={28} className={styles.fileDropIcon} />
                  <div className={styles.fileDropText}>
                    Haz clic para seleccionar o arrastra archivos aquí
                  </div>
                  <div className={styles.fileDropSubtext}>
                    Soporta: PDF, DOCX, JPG, PNG, MP4, MP3, ZIP... (Max: 50MB)
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    id="pm-adjuntos"
                    name="adjuntos"
                    type="file"
                    className={styles.fileInputHidden}
                    accept="image/*,video/*,audio/*,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip"
                    multiple
                    onChange={handleFilesChange}
                  />
                </div>

                {selectedFiles.length > 0 && (
                  <div className={styles.fileList}>
                    {selectedFiles.map((f, idx) => (
                      <div key={`${f.name}-${idx}`} className={styles.fileChip}>
                        <div className={styles.fileChipInfo}>
                          <Paperclip size={14} style={{ opacity: 0.6 }} />
                          <span className={styles.fileChipName} title={f.name}>{f.name}</span>
                          <span className={styles.fileChipSize}>
                            ({Math.round((f.size / 1024) * 10) / 10} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          className={styles.removeFileBtn}
                          onClick={() => removeFile(idx)}
                          aria-label={`Eliminar ${f.name}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {status === 'error' && (
                <div className={styles.errorBanner} role="alert">
                  ⚠️ {errorMessage || 'No se pudo enviar tu aporte. Intenta nuevamente.'}
                </div>
              )}


              <button type="submit" className={styles.btnPrimary} disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <span className={styles.spinner} /> Enviando…
                  </>
                ) : (
                  <>
                    <Send size={18} /> Enviar Aporte
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

