import { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, Users, ScrollText, Palette, Building2, BookOpen,
  Settings, ChevronDown, ChevronRight, Plus, Edit2, Trash2, X, Search,
  CheckCircle, XCircle, AlertCircle, ArrowLeft, RefreshCw, LogOut,
  Landmark, Clapperboard, FileText, Star, Zap, MapPin, Utensils,
  GraduationCap, Heart, Trophy, Stethoscope, Dumbbell, Calendar,
  Home, Flag, Info, ChevronLeft, Globe, BarChart3,
  Mail, Phone, ExternalLink, Camera, Save, Lock, UserCircle, List, Music, Image as ImageIcon
} from 'lucide-react';
import styles from './AdminDashboardModule.module.css';
import { adminMetricsMock, cultoresMock, historiaMock, bibliotecaMock } from '../data/mockData';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// ─── Grupos del menú lateral ────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: 'General', icon: LayoutDashboard,
    items: [
      { name: 'Inicio', icon: LayoutDashboard },
      { name: 'Mi Perfil', icon: UserCircle },
      { name: 'Usuarios', icon: Users },
    ]
  },
  {
    label: 'Historia', icon: ScrollText,
    items: [
      { name: 'Historia', icon: Landmark },
      { name: 'Historia Secciones', icon: FileText },
      { name: 'Historia Videos', icon: Clapperboard },
      { name: 'Historia Documentos', icon: FileText },
      { name: 'Historia Features', icon: Star },
      { name: 'Historia Datos Rápidos', icon: Zap },
    ]
  },
  {
    label: 'Cultura', icon: Palette,
    items: [
      { name: 'Cultores', icon: Users },
      { name: 'Costumbres', icon: Flag },
      { name: 'Gastronomía', icon: Utensils },
      { name: 'Centros Culturales', icon: Building2 },
    ]
  },
  {
    label: 'Sociedad', icon: Building2,
    items: [
      { name: 'Educación', icon: GraduationCap },
      { name: 'Hitos Educativos', icon: Trophy },
      { name: 'Educadores', icon: GraduationCap },
      { name: 'Sanidad', icon: Stethoscope },
      { name: 'Hitos Sanidad', icon: Trophy },
      { name: 'Deportes', icon: Dumbbell },
      { name: 'Medicina Trad', icon: Heart },
      { name: 'Personajes', icon: Users },
    ]
  },
  {
    label: 'Biblioteca', icon: BookOpen,
    items: [
      { name: 'Libros', icon: BookOpen },
      { name: 'Música', icon: Music },
      { name: 'Imágenes', icon: ImageIcon },
      { name: 'Videos', icon: Clapperboard },
      { name: 'Documentos', icon: FileText },
    ]
  },
  {
    label: 'Calendario', icon: Calendar,
    items: [
      { name: 'Efemérides', icon: Calendar },
    ]
  },
  {
    label: 'Geografía y Mapa', icon: MapPin,
    items: [
      { name: 'Lugares del Mapa', icon: MapPin },
      { name: 'Sectores', icon: Landmark },
      { name: 'Censos', icon: BarChart3 },
      { name: 'Highlights Geográficos', icon: Star },
    ]
  },
  {
    label: 'Nosotros', icon: Info,
    items: [
      { name: 'Nosotros Features', icon: CheckCircle },
      { name: 'Nosotros Valores', icon: Heart },
      { name: 'Nosotros Stats', icon: BarChart3 },
      { name: 'Misión/Visión', icon: Globe },
    ]
  },
  {
    label: 'Home', icon: Home,
    items: [
      { name: 'Hero Slides', icon: Clapperboard },
      { name: 'Home Cards', icon: Home },
      { name: 'Home Featured', icon: Star },
    ]
  },
];

// ─── Métricas del dashboard ─────────────────────────────────────────────────
const DASHBOARD_METRICS = [
  { key: 'usuariosActivos',     label: 'Usuarios',        icon: Users,         color: '#3b82f6' },
  { key: 'cultoresValidados',   label: 'Cultores',        icon: Palette,       color: '#a855f7' },
  { key: 'elementosBiblioteca', label: 'Biblioteca',      icon: BookOpen,      color: '#10b981' },
  { key: 'registrosHistoria',   label: 'Historia',        icon: Landmark,      color: '#f59e0b' },
  { key: 'costumbres',          label: 'Costumbres',      icon: Flag,          color: '#ec4899' },
  { key: 'gastronomia',         label: 'Gastronomía',     icon: Utensils,      color: '#f97316' },
  { key: 'centrosCulturales',   label: 'Centros Cult.',   icon: Building2,     color: '#8b5cf6' },
  { key: 'efemerides',          label: 'Efemérides',      icon: Calendar,      color: '#06b6d4' },
  { key: 'centrosSalud',        label: 'Salud',           icon: Stethoscope,   color: '#22c55e' },
  { key: 'instituciones',       label: 'Educación',       icon: GraduationCap, color: '#6366f1' },
  { key: 'disciplinasDeporte',  label: 'Deportes',        icon: Dumbbell,      color: '#ef4444' },
  { key: 'homeCards',           label: 'Home Cards',      icon: Home,          color: '#64748b' },
];

// ─── Endpoints por tipo ─────────────────────────────────────────────────────
const ENDPOINTS = {
  'Historia':               'historia',
  'Cultores':               'cultores',
  'Costumbres':             'cultura/costumbres',
  'Gastronomía':            'cultura/gastronomia',
  'Centros Culturales':     'cultura/centros',
  'Educación':              'sociedad/educacion',
  'Sanidad':                'sociedad/sanidad',
  'Deportes':               'sociedad/deportes',
  'Biblioteca':             'biblioteca',
  'Libros':                 'biblioteca',
  'Música':                 'biblioteca',
  'Imágenes':               'biblioteca',
  'Videos':                 'biblioteca',
  'Documentos':             'biblioteca',
  'Efemérides':             'calendario',
  'Home Cards':             'home_cards',
  'Usuarios':               'usuarios',
  'Medicina Trad':          'sociedad/medicina-trad',
  'Hitos Educativos':       'sociedad/educacion/hitos',
  'Hitos Sanidad':          'sociedad/sanidad/hitos',
  'Educadores':             'sociedad/educadores',
  'Personajes':             'sociedad/personajes',
  'Nosotros Features':      'nosotros/features',
  'Nosotros Valores':       'nosotros/valores',
  'Nosotros Stats':         'nosotros/stats',
  'Misión/Visión':          'nosotros/mision-vision',
  'Historia Secciones':     'historia/secciones',
  'Historia Videos':        'historia/videos',
  'Historia Documentos':    'historia/documentos',
  'Historia Features':      'historia/features',
  'Historia Datos Rápidos': 'historia/datos-rapidos',
  'Home Featured':          'home/featured',
  'Hero Slides':            'home/hero-slides',
  'Sectores':               'geografia/sectores',
  'Censos':                 'geografia/censos',
  'Highlights Geográficos': 'geografia/highlights',
  'Lugares del Mapa':       'mapa/lugares',
};

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper: convertir descripcion JSONB (array) a texto plano para textarea
function descToText(val) {
  if (!val) return '';
  if (Array.isArray(val)) return val.join('\n\n');
  if (typeof val === 'string') return val;
  return '';
}

// Helper: convertir texto plano (separado por líneas dobles) de vuelta a array
function textToDesc(text) {
  if (!text) return [];
  return text.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
}

// ─── COMPONENTE TOAST ────────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div className={styles.toastContainer}>
      {toasts.map(t => (
        <div key={t.id} className={`${styles.toast} ${styles[`toast_${t.type}`]}`}>
          {t.type === 'success' && <CheckCircle size={18} />}
          {t.type === 'error'   && <XCircle size={18} />}
          {t.type === 'warn'    && <AlertCircle size={18} />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

// ─── COMPONENTE CONFIRM MODAL ────────────────────────────────────────────────
function ConfirmModal({ config, onClose }) {
  if (!config.show) return null;
  const IconComponent = config.icon || Trash2;
  return (
    <div className={styles.confirmOverlay} onClick={onClose}>
      <div className={styles.confirmBox} onClick={e => e.stopPropagation()}>
        <div className={styles.confirmIcon}><IconComponent size={28} /></div>
        <h3 className={styles.confirmTitle}>{config.title || '¿Eliminar registro?'}</h3>
        <p className={styles.confirmText}>{config.message || 'Esta acción no se puede deshacer.'}</p>
        <div className={styles.confirmActions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
          <button type="button" className={styles.deleteConfirmBtn} onClick={() => { config.onConfirm(); onClose(); }}>
            {config.confirmLabel || 'Sí, eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL ────────────────────────────────────────────────────
function AdminDashboardModule({ adminUser, onLogout }) {
  const [activeTab, setActiveTab]           = useState('Inicio');
  const [expandedGroups, setExpandedGroups] = useState({
    General: true, Historia: false, Cultura: false, Sociedad: false,
    Biblioteca: false, Calendario: true, 'Geografía y Mapa': false, Nosotros: false, Home: false
  });
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [uploadingKey, setUploadingKey]     = useState(null);
  const [allData, setAllData]               = useState({});
  const [metrics, setMetrics]               = useState(adminMetricsMock);
  const [loading, setLoading]               = useState(true);
  const [isOffline, setIsOffline]           = useState(false);
  const [profileForm, setProfileForm] = useState({
    nombre: adminUser?.nombre || 'Carlos Eduardo Ramos González',
    correo: adminUser?.correo || 'carlose12ramos@gmail.com',
    telefono: '(0416) 198-0831',
    biografia: 'Estudiante de Ingeniería de Sistemas · Músico · Cultor · Desarrollador del proyecto "Una Sola Tacarigua", dedicado a la digitalización y preservación del patrimonio cultural de la Parroquia Guevara.',
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profilePassword, setProfilePassword] = useState({ new: '', confirm: '' });

  // Toast
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  // Confirm Modal
  const [confirmConfig, setConfirmConfig] = useState({ show: false, message: '', onConfirm: null });
  const askConfirm = (message, onConfirm, options = {}) => setConfirmConfig({ show: true, message, onConfirm, ...options });
  const closeConfirm = () => setConfirmConfig({ show: false, message: '', onConfirm: null });

  // Modal CRUD
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, mode: 'create', data: null });
  const openModal  = (type, mode = 'create', data = null) => setModalConfig({ isOpen: true, type, mode, data: data || {} });
  const closeModal = () => setModalConfig({ isOpen: false, type: null, mode: 'create', data: null });

  // Búsqueda y paginación
  const [tableSearch, setTableSearch] = useState('');
  const [tableFilter, setTableFilter] = useState('');
  const [tablePage, setTablePage]     = useState(1);
  const PAGE_SIZE = 10;

  // ─── Fetch ────────────────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const metricsRes = await fetch(`${API_BASE}/admin/metrics`);
      if (!metricsRes.ok) throw new Error('API no disponible');
      setMetrics(await metricsRes.json());

      if (activeTab !== 'Inicio' && ENDPOINTS[activeTab]) {
        const res = await fetch(`${API_BASE}/${ENDPOINTS[activeTab]}`);
        const data = res.ok ? await res.json() : [];
        const storeKey = ENDPOINTS[activeTab] === 'biblioteca' ? 'Biblioteca' : activeTab;
        setAllData(prev => ({ ...prev, [storeKey]: data }));
      }
      setIsOffline(false);
    } catch {
      setIsOffline(true);
      setMetrics(adminMetricsMock);
      setAllData(prev => ({
        ...prev,
        Historia: historiaMock,
        Cultores: cultoresMock,
        Biblioteca: bibliotecaMock,
      }));
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => { fetchAll(); }, [fetchAll]);
  useEffect(() => {
    setTableSearch('');
    setTablePage(1);
    const formatTabs = { 'Libros': 'Libros', 'Música': 'Música', 'Imágenes': 'Imágenes', 'Videos': 'Videos', 'Documentos': 'Documentos' };
    setTableFilter(formatTabs[activeTab] || '');
    if (activeTab !== 'Efemérides') {
      setSelectedCalDay(null);
      setCalViewMode('calendar');
      setCalSearch('');
      setCalPage(1);
    }
  }, [activeTab]);

  useEffect(() => {
    if (adminUser) {
      setProfileForm(prev => ({
        ...prev,
        nombre: adminUser.nombre || prev.nombre,
        correo: adminUser.correo || prev.correo,
      }));
    }
  }, [adminUser]);

  // ─── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = (type, id) => {
    askConfirm('Esta acción eliminará el registro permanentemente.', async () => {
      if (isOffline) { showToast('Sin conexión al backend', 'error'); return; }
      try {
        const res = await fetch(`${API_BASE}/${ENDPOINTS[type]}/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${adminUser?.token}` },
        });
        if (res.ok) { showToast('Registro eliminado correctamente'); fetchAll(); }
        else showToast('No se pudo eliminar el registro', 'error');
      } catch { showToast('Error de conexión', 'error'); }
    });
  };

  // ─── Save (create / edit) ─────────────────────────────────────────────────
  const handleModalSave = async (e) => {
    e.preventDefault();
    if (isOffline) { showToast('Sin conexión al backend', 'error'); return; }
    const { type, mode, data } = modalConfig;

    // Convertir campos JSONB antes de enviar
    let payload = { ...data };
    if (type === 'Cultores' && typeof payload.descripcion === 'string') {
      payload.descripcion = textToDesc(payload.descripcion);
    }

    const url    = mode === 'create' ? `${API_BASE}/${ENDPOINTS[type]}` : `${API_BASE}/${ENDPOINTS[type]}/${data.id}`;
    const method = mode === 'create' ? 'POST' : 'PUT';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminUser?.token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showToast(mode === 'create' ? 'Registro creado exitosamente' : 'Registro actualizado');
        closeModal();
        fetchAll();
      } else {
        showToast('Error al guardar los datos', 'error');
      }
    } catch { showToast('Error de conexión', 'error'); }
  };

  // ─── Sidebar ──────────────────────────────────────────────────────────────
  const toggleGroup = (label) => setExpandedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  const navTo = (name) => setActiveTab(name);

  // ─── Dashboard ────────────────────────────────────────────────────────────
  const renderDashboard = () => (
    <div className={styles.dashboard}>
      {isOffline && (
        <div className={styles.offlineBanner}>
          <AlertCircle size={16} />
          <span><strong>Modo local:</strong> Backend no conectado. Se muestran datos de prueba.</span>
        </div>
      )}

      <div className={styles.dashboardHeader} style={{ justifyContent: 'flex-end' }}>
        <button className={styles.refreshBtn} onClick={fetchAll} title="Actualizar datos">
          <RefreshCw size={16} />
          <span>Actualizar Métricas</span>
        </button>
      </div>

      <div className={styles.metricsGrid}>
        {DASHBOARD_METRICS.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className={styles.metricCard} style={{ '--metric-color': color }}>
            <div className={styles.metricIcon} style={{ background: `${color}18`, color }}>
              <Icon size={22} />
            </div>
            <div className={styles.metricValue}>{loading ? '—' : (metrics[key] ?? '—')}</div>
            <div className={styles.metricTitle}>{label}</div>
          </div>
        ))}
      </div>

      {/* Accesos rápidos */}
      <div className={styles.quickAccessGrid}>
        {[
          { tab: 'Historia',   icon: Landmark,    label: 'Gestionar Historia',   color: '#f59e0b' },
          { tab: 'Cultores',   icon: Palette,     label: 'Gestionar Cultores',   color: '#a855f7' },
          { tab: 'Libros', icon: BookOpen,    label: 'Gestionar Biblioteca', color: '#10b981' },
          { tab: 'Educación',  icon: GraduationCap, label: 'Gestionar Educación', color: '#6366f1' },
          { tab: 'Efemérides', icon: Calendar,    label: 'Gestionar Efemérides', color: '#06b6d4' },
          { tab: 'Usuarios',   icon: Users,       label: 'Gestionar Usuarios',   color: '#3b82f6' },
        ].map(({ tab, icon: Icon, label, color }) => (
          <button key={tab} className={styles.quickCard} onClick={() => navTo(tab)} style={{ '--qc-color': color }}>
            <Icon size={20} style={{ color }} />
            <span>{label}</span>
            <ChevronRight size={14} className={styles.quickArrow} />
          </button>
        ))}
      </div>
    </div>
  );

  // ─── Campo de imagen dual (URL + Subir) ─────────────────────────────────
  const imageField = (label, key, data, setData) => {
    const handleFileUpload = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploadingKey(key);
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData });
        if (res.ok) {
          const { url } = await res.json();
          setData(url);
          showToast('Imagen subida correctamente');
        } else {
          showToast('Error al subir la imagen', 'error');
        }
      } catch { showToast('Error de conexión al subir imagen', 'error'); }
      finally { setUploadingKey(null); }
    };
    const val = data[key] || '';
    const setVal = (v) => setModalConfig(prev => ({ ...prev, data: { ...prev.data, [key]: v } }));
    return (
      <div className={styles.formGroup} key={key}>
        <label>{label}</label>
        <div className={styles.imageInputDual}>
          <input
            type="text"
            placeholder="Pega una URL aquí..."
            value={val}
            onChange={e => setVal(e.target.value)}
            className={styles.imageUrlInput}
          />
          <label className={styles.uploadFileBtn} title="Subir desde dispositivo">
            {uploadingKey === key ? '⏳' : '📁'}
            <input type="file" accept="image/*,application/pdf" style={{ display: 'none' }}
              onChange={handleFileUpload} />
          </label>
        </div>
        {val && (
          <img src={val} alt="Preview" className={styles.imagePreview}
            onError={e => { e.target.style.display = 'none'; }} />
        )}
      </div>
    );
  };

  // ─── Formularios modales por tipo ────────────────────────────────────────
  const renderModalForm = () => {
    const { type, data } = modalConfig;

    const field = (label, key, inputType = 'text', opts = {}) => (
      <div className={styles.formGroup} key={key}>
        <label>{label}</label>
        <input
          type={inputType}
          value={data[key] || ''}
          onChange={e => setModalConfig(prev => ({ ...prev, data: { ...prev.data, [key]: e.target.value } }))}
          {...opts}
        />
      </div>
    );
    const textarea = (label, key, rows = 3, placeholder = '') => (
      <div className={styles.formGroup} key={key}>
        <label>{label}</label>
        <textarea
          value={data[key] || ''}
          rows={rows}
          placeholder={placeholder}
          onChange={e => setModalConfig(prev => ({ ...prev, data: { ...prev.data, [key]: e.target.value } }))}
        />
      </div>
    );
    const select = (label, key, options) => (
      <div className={styles.formGroup} key={key}>
        <label>{label}</label>
        <select
          value={data[key] || options[0]?.value}
          onChange={e => setModalConfig(prev => ({ ...prev, data: { ...prev.data, [key]: e.target.value } }))}
        >
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    );
    const imgF = (label, key) => imageField(label, key, data, (v) =>
      setModalConfig(prev => ({ ...prev, data: { ...prev.data, [key]: v } }))
    );

    // Textarea especial para descripcion JSONB (array de párrafos)
    const jsonArrayTextarea = (label, key, rows = 6) => (
      <div className={styles.formGroup} key={key}>
        <label>{label} <small style={{ color: '#94a3b8', fontWeight: 400 }}>(separa párrafos con una línea en blanco)</small></label>
        <textarea
          value={descToText(data[key])}
          rows={rows}
          placeholder="Escribe el primer párrafo&#10;&#10;Escribe el segundo párrafo&#10;&#10;Escribe el tercer párrafo..."
          onChange={e => setModalConfig(prev => ({ ...prev, data: { ...prev.data, [key]: e.target.value } }))}
        />
      </div>
    );

    const FORMS = {
      'Historia':              [field('Año', 'anio'), field('Título', 'titulo', 'text', { required: true }), textarea('Descripción', 'descripcion', 4), imgF('Imagen', 'imagen'), select('Estado', 'activo', [{ value: 'true', label: 'Activo' }, { value: 'false', label: 'Oculto' }])],
      'Cultores':              [field('Nombre completo', 'nombre', 'text', { required: true }), field('Disciplina artística', 'disciplina', 'text', { required: true }), field('Especialidad', 'especialidad'), field('Localidad', 'localidad'), field('Años de actividad / Fechas', 'anios'), jsonArrayTextarea('Texto biográfico', 'descripcion', 8), imgF('Foto', 'imagen')],
      'Costumbres':            [field('Nombre', 'nombre', 'text', { required: true }), field('Categoría', 'categoria'), textarea('Descripción', 'descripcion', 4), imgF('Imagen', 'imagen')],
      'Gastronomía':           [field('Nombre', 'nombre', 'text', { required: true }), textarea('Descripción', 'descripcion', 4), imgF('Imagen', 'imagen')],
      'Centros Culturales':    [field('Título', 'titulo', 'text', { required: true }), field('Subtítulo', 'subtitulo'), textarea('Resumen', 'resumen', 3), imgF('Imagen', 'imagen')],
      'Educación':             [field('Nombre institución', 'nombre', 'text', { required: true }), field('Nivel educativo', 'nivel'), textarea('Descripción', 'descripcion', 3), imgF('Imagen', 'imagen')],
      'Sanidad':               [field('Nombre', 'nombre', 'text', { required: true }), field('Tipo (Ambulatorio, Hospital...)', 'tipo'), field('Dirección', 'direccion'), field('Horarios', 'horarios'), textarea('Servicios', 'servicios', 3), field('Teléfono', 'telefono'), imgF('Imagen', 'imagen')],
      'Deportes':              [field('Disciplina', 'disciplina', 'text', { required: true }), field('Icono (emoji)', 'icono'), field('Color (hex)', 'color_hex'), textarea('Descripción', 'descripcion', 3)],
      'Efemérides':            [field('Día (1-31)', 'dia', 'number'), field('Mes (1-12)', 'mes', 'number'), field('Año', 'anio', 'number'), select('Tipo', 'tipo', [{ value: 'historia', label: 'Historia' }, { value: 'natalicio', label: 'Natalicio' }, { value: 'religiosa', label: 'Religiosa' }, { value: 'cultural', label: 'Cultural' }, { value: 'duelo', label: 'Duelo' }]), field('Título', 'titulo', 'text', { required: true }), textarea('Descripción', 'descripcion', 3)],
      'Home Cards':            [select('Tipo', 'tipo', [{ value: 'historia', label: 'Historia' }, { value: 'cultura', label: 'Cultura' }, { value: 'sociedad', label: 'Sociedad' }, { value: 'geografia', label: 'Geografía' }, { value: 'biblioteca', label: 'Biblioteca' }, { value: 'calendario', label: 'Calendario' }, { value: 'nosotros', label: 'Nosotros' }]), field('Título', 'titulo', 'text', { required: true }), textarea('Descripción', 'descripcion', 2), textarea('Detalle Modal', 'detalle', 4), imgF('Imagen', 'imagen')],
      'Biblioteca':            [field('Título', 'titulo', 'text', { required: true }), field('Autor', 'autor', 'text', { required: true }), field('Categoría', 'categoria', 'text', { required: true }), select('Formato', 'formato', [{ value: 'Libros', label: 'Libros' }, { value: 'Música', label: 'Música' }, { value: 'Videos', label: 'Videos' }, { value: 'Documentos', label: 'Documentos' }, { value: 'Imágenes', label: 'Imágenes' }]), imgF('Portada', 'imagen'), field('URL Archivo / Pista de audio', 'url_archivo')],
      'Libros':                [select('Formato', 'formato', [{ value: 'Libros', label: 'Libros' }]), field('Título', 'titulo', 'text', { required: true }), field('Autor', 'autor', 'text', { required: true }), field('Categoría', 'categoria', 'text', { required: true }), imgF('Portada', 'imagen'), field('URL Archivo / Pista de audio', 'url_archivo')],
      'Música':                [select('Formato', 'formato', [{ value: 'Música', label: 'Música' }]), field('Título', 'titulo', 'text', { required: true }), field('Autor', 'autor', 'text', { required: true }), field('Categoría', 'categoria', 'text', { required: true }), imgF('Portada', 'imagen'), field('URL Archivo / Pista de audio', 'url_archivo')],
      'Imágenes':              [select('Formato', 'formato', [{ value: 'Imágenes', label: 'Imágenes' }]), field('Título', 'titulo', 'text', { required: true }), field('Autor', 'autor', 'text', { required: true }), field('Categoría', 'categoria', 'text', { required: true }), imgF('Portada', 'imagen'), field('URL Archivo / Pista de audio', 'url_archivo')],
      'Videos':                [select('Formato', 'formato', [{ value: 'Videos', label: 'Videos' }]), field('Título', 'titulo', 'text', { required: true }), field('Autor', 'autor', 'text', { required: true }), field('Categoría', 'categoria', 'text', { required: true }), imgF('Portada', 'imagen'), field('URL Archivo / Pista de audio', 'url_archivo')],
      'Documentos':            [select('Formato', 'formato', [{ value: 'Documentos', label: 'Documentos' }]), field('Título', 'titulo', 'text', { required: true }), field('Autor', 'autor', 'text', { required: true }), field('Categoría', 'categoria', 'text', { required: true }), imgF('Portada', 'imagen'), field('URL Archivo / Pista de audio', 'url_archivo')],
      'Usuarios':              [field('Nombre', 'nombre', 'text', { required: true }), field('Correo', 'correo', 'email', { required: true }), ...(modalConfig.mode === 'create' ? [field('Contraseña', 'password')] : []), select('Rol', 'rol', [{ value: 'ciudadano', label: 'Ciudadano' }, { value: 'colaborador', label: 'Colaborador' }, { value: 'admin', label: 'Administrador' }])],
      'Medicina Trad':         [field('Nombre', 'nombre', 'text', { required: true }), textarea('Descripción', 'descripcion', 3), field('Icono (emoji)', 'icono')],
      'Hitos Educativos':      [field('Año / Período', 'anio', 'text', { required: true }), textarea('Evento o hito', 'evento', 4)],
      'Hitos Sanidad':         [field('Período', 'periodo', 'text', { required: true }), field('Título', 'titulo', 'text', { required: true }), field('Icono (emoji)', 'icono'), textarea('Resumen', 'resumen', 3), imgF('Imagen', 'imagen')],
      'Educadores':            [field('Nombre', 'nombre', 'text', { required: true }), field('Apodo', 'apodo'), textarea('Descripción', 'descripcion', 3), imgF('Foto', 'imagen')],
      'Personajes':            [field('Nombre', 'nombre', 'text', { required: true }), textarea('Resumen biográfico', 'resumen', 4)],
      'Nosotros Features':     [field('Título', 'titulo', 'text', { required: true }), textarea('Descripción', 'descripcion', 2), field('Icono (emoji)', 'icono')],
      'Nosotros Valores':      [field('Título', 'titulo', 'text', { required: true }), textarea('Descripción', 'descripcion', 2), field('Icono (emoji)', 'icono')],
      'Nosotros Stats':        [field('Indicador / Etiqueta', 'label', 'text', { required: true }), field('Valor (ej: +500, 100%)', 'valor', 'text', { required: true }), field('Icono (emoji)', 'icono')],
      'Misión/Visión':         [select('Tipo', 'tipo', [{ value: 'mision', label: 'Misión' }, { value: 'vision', label: 'Visión' }]), field('Título', 'titulo', 'text', { required: true }), textarea('Contenido', 'contenido', 4)],
      'Historia Secciones':    [field('Título', 'titulo', 'text', { required: true }), textarea('Contenido HTML/texto', 'contenido', 5)],
      'Historia Videos':       [field('URL del Video (YouTube embed...)', 'src', 'text', { required: true }), field('Título', 'titulo'), textarea('Caption / Descripción', 'caption', 2)],
      'Historia Documentos':   [field('Título', 'titulo', 'text', { required: true }), textarea('Descripción', 'descripcion', 2), imgF('Imagen del documento', 'src'), field('URL documento completo', 'full_src'), field('Texto alternativo', 'alt')],
      'Historia Features':     [field('Título', 'titulo', 'text', { required: true }), textarea('Descripción', 'descripcion', 3), field('Nombre icono Lucide (Landmark, BookOpen...)', 'icono_nombre')],
      'Historia Datos Rápidos': [field('Etiqueta', 'label', 'text', { required: true }), textarea('Texto descriptivo', 'texto', 3), field('Nombre icono Lucide (Scroll, MapPin...)', 'icono_nombre')],
      'Home Featured':         [field('Título', 'titulo', 'text', { required: true }), textarea('Descripción', 'descripcion', 2), field('Ruta interna (path)', 'path', 'text', { required: true }), field('Nombre icono Lucide (Palette, Map...)', 'icono_nombre'), imgF('Imagen', 'imagen_src')],
      'Hero Slides':           [field('Título del slide', 'title'), field('Subtítulo', 'subtitle'), imgF('Imagen de fondo', 'image_key')],
      'Sectores':              [field('Icono (emoji)', 'icono', 'text', { required: true }), field('Título del sector', 'title', 'text', { required: true }), textarea('Contenido descriptivo', 'content', 3)],
      'Censos':                [field('Año del censo', 'year', 'number', { required: true }), field('Número de viviendas', 'housing', 'number'), field('Población total', 'population', 'number')],
      'Highlights Geográficos': [field('Icono (emoji)', 'icono', 'text', { required: true }), field('Título', 'title', 'text', { required: true }), textarea('Descripción', 'description', 3)],
      'Lugares del Mapa':      [field('Nombre del lugar', 'name', 'text', { required: true }), field('Latitud', 'lat', 'number', { required: true }), field('Longitud', 'lng', 'number', { required: true }), select('Categoría', 'category', [{ value: 'iglesia', label: 'Iglesia' }, { value: 'plaza', label: 'Plaza' }, { value: 'salud', label: 'Salud' }, { value: 'educacion', label: 'Educación' }, { value: 'recreacion', label: 'Recreación' }, { value: 'gobierno', label: 'Gobierno' }, { value: 'otro', label: 'Otro' }]), textarea('Descripción / Resumen editorial', 'editorial_summary', 2), field('Dirección o zona', 'vicinity')],
    };
    return FORMS[type] || null;
  };

  // ─── Tabla genérica con búsqueda, filtro y paginación ────────────────────
  const renderGenericTable = (title, type, columns, filterConfig, dataType) => {
    const rawItems = allData[dataType || type] || [];
    const q = tableSearch.toLowerCase();
    const filtered = rawItems.filter(item => {
      const matchSearch = columns.some(c => String(item[c.key] || '').toLowerCase().includes(q));
      const matchFilter = filterConfig ? !tableFilter || String(item[filterConfig.key] || '') === tableFilter : true;
      return matchSearch && matchFilter;
    });
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated  = filtered.slice((tablePage - 1) * PAGE_SIZE, tablePage * PAGE_SIZE);

    return (
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <div>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <p className={styles.sectionSubtitle}>{filtered.length} registro{filtered.length !== 1 ? 's' : ''} encontrados</p>
          </div>
          <div className={styles.tableActions}>
            {filterConfig?.options?.length > 0 && (
              <select
                className={styles.tableFilterSelect}
                value={tableFilter}
                onChange={e => { setTableFilter(e.target.value); setTablePage(1); }}
              >
                <option value="">{filterConfig.label || 'Todos'}</option>
                {filterConfig.options.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            )}
            <div className={styles.searchBar}>
              <Search size={15} />
              <input
                type="text"
                placeholder="Buscar..."
                value={tableSearch}
                onChange={e => { setTableSearch(e.target.value); setTablePage(1); }}
              />
              {tableSearch && <button type="button" onClick={() => setTableSearch('')}><X size={14} /></button>}
            </div>
            <button className={styles.addBtn} onClick={() => openModal(type, 'create')}>
              <Plus size={16} /> Añadir
            </button>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map(c => <th key={c.key}>{c.label}</th>)}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={columns.length + 1} className={styles.emptyRow}>
                  {tableSearch ? 'No se encontraron resultados.' : 'Sin registros aún. Haz clic en "Añadir" para crear el primero.'}
                </td></tr>
              ) : (
                paginated.map((item, idx) => (
                  <tr key={item.id || idx} className={styles.tableRow}>
                    {columns.map(c => (
                      <td key={c.key}>
                        {c.render ? c.render(item[c.key], item) : (
                          c.key === 'imagen' && item[c.key]
                            ? <img src={item[c.key]} alt="" className={styles.thumbImg} onError={e => { e.target.style.display = 'none'; }} />
                            : <span className={styles.cellText}>{String(item[c.key] ?? '—').slice(0, 70)}</span>
                        )}
                      </td>
                    ))}
                    <td>
                      <div className={styles.actionBtns}>
                        <button type="button" className={styles.editBtn} onClick={() => openModal(type, 'edit', item)} title="Editar">
                          <Edit2 size={14} />
                        </button>
                        <button type="button" className={styles.deleteBtn} onClick={() => handleDelete(type, item.id)} title="Eliminar">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button disabled={tablePage === 1} onClick={() => setTablePage(p => p - 1)}><ChevronLeft size={16} /></button>
            <span>Página {tablePage} de {totalPages}</span>
            <button disabled={tablePage === totalPages} onClick={() => setTablePage(p => p + 1)}><ChevronRight size={16} /></button>
          </div>
        )}
      </div>
    );
  };

  // ─── Mi Perfil ───────────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    if (profilePassword.new && profilePassword.new !== profilePassword.confirm) {
      showToast('Las contraseñas no coinciden', 'error');
      return;
    }
    setSavingProfile(true);
    try {
      const payload = { id: adminUser?.id || 'demo-admin', ...profileForm };
      if (profilePassword.new) payload.password = profilePassword.new;
      const res = await fetch(`${API_BASE}/admin/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminUser?.token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showToast('Perfil actualizado correctamente');
        setProfilePassword({ new: '', confirm: '' });
      } else {
        showToast('Error al guardar el perfil', 'error');
      }
    } catch {
      showToast('Error de conexión', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData });
      if (res.ok) {
        const { url } = await res.json();
        showToast('Foto de perfil actualizada (refresca la página para ver el cambio)');
      } else {
        showToast('Error al subir la foto', 'error');
      }
    } catch {
      showToast('Error de conexión', 'error');
    }
  };

  const profileRow = (label, key, type = 'text', placeholder = '') => (
    <div className={styles.profileRow} key={key}>
      <label className={styles.profileLabel}>{label}</label>
      <input
        type={type}
        className={styles.profileInput}
        value={profileForm[key] || ''}
        placeholder={placeholder}
        onChange={e => setProfileForm(prev => ({ ...prev, [key]: e.target.value }))}
      />
    </div>
  );

  const renderProfilePage = () => (
    <div className={styles.profilePage}>
      <button className={styles.profileBackLink} onClick={() => setActiveTab('Inicio')}>
        <ArrowLeft size={16} /> Volver al Panel General
      </button>

      <div className={styles.profileCard}>
        <div className={styles.profilePhotoSection}>
          <div className={styles.profilePhotoWrap}>
            <img src={adminUser?.imagen || adminUser?.foto || "/images/Carlos Ramos.png"} alt="Foto de perfil" className={styles.profilePhoto} />
            <label className={styles.profilePhotoOverlay}>
              <Camera size={20} />
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleProfilePhotoUpload} />
            </label>
          </div>
          <h2 className={styles.profileCardName}>{profileForm.nombre}</h2>
          <span className={styles.profileCardRole}>Administrador</span>
        </div>

        <div className={styles.profileCardBody}>
          <h3 className={styles.profileSectionTitle}>Información Personal</h3>
          {profileRow('Nombre completo', 'nombre', 'text', 'Tu nombre completo')}
          {profileRow('Correo electrónico', 'correo', 'email', 'tu@correo.com')}
          {profileRow('Teléfono', 'telefono', 'text', '+58 412 123 4567')}

          <h3 className={styles.profileSectionTitle}>Biografía</h3>
          <div className={styles.profileRow}>
            <label className={styles.profileLabel}>Biografía</label>
            <textarea
              className={styles.profileTextarea}
              value={profileForm.biografia || ''}
              rows={4}
              placeholder="Cuéntanos sobre ti..."
              onChange={e => setProfileForm(prev => ({ ...prev, biografia: e.target.value }))}
            />
          </div>

          <h3 className={styles.profileSectionTitle}>Seguridad</h3>
          <div className={styles.profileRow}>
            <label className={styles.profileLabel}>Nueva contraseña</label>
            <input
              type="password"
              className={styles.profileInput}
              value={profilePassword.new}
              placeholder='Dejar en blanco para mantener la actual'
              onChange={e => setProfilePassword(prev => ({ ...prev, new: e.target.value }))}
            />
          </div>
          <div className={styles.profileRow}>
            <label className={styles.profileLabel}>Confirmar contraseña</label>
            <input
              type="password"
              className={styles.profileInput}
              value={profilePassword.confirm}
              placeholder='Repite la nueva contraseña'
              onChange={e => setProfilePassword(prev => ({ ...prev, confirm: e.target.value }))}
            />
          </div>

          <button
            className={styles.profileSaveBtn}
            onClick={handleSaveProfile}
            disabled={savingProfile}
          >
            <Save size={16} /> {savingProfile ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );

  // ─── Calendario ──────────────────────────────────────────────────────────
  const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const DAY_NAMES = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

  const daysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const firstDayOfMonth = (m, y) => new Date(y, m, 1).getDay();

  const [selectedCalDay, setSelectedCalDay] = useState(null);
  const [calViewMode, setCalViewMode] = useState('calendar');
  const [calPage, setCalPage] = useState(1);
  const [calSearch, setCalSearch] = useState('');
  const CAL_PAGE_SIZE = 10;

  const renderCalendario = () => {
    const allItems = allData['Efemérides'] || [];
    const monthItems = allItems.filter(i => parseInt(i.mes) === calMonth + 1);
    const totalDays = daysInMonth(calMonth, calYear);
    const startDay = firstDayOfMonth(calMonth, calYear);

    const getDayItems = (d) => monthItems.filter(i => parseInt(i.dia) === d);

    const listRaw = calViewMode === 'list' ? allItems : (selectedCalDay ? monthItems.filter(i => parseInt(i.dia) === selectedCalDay) : monthItems);
    const q = calSearch.toLowerCase();
    const listItems = q ? listRaw.filter(i =>
      (i.titulo || '').toLowerCase().includes(q) ||
      (i.tipo || '').toLowerCase().includes(q) ||
      (i.descripcion || '').toLowerCase().includes(q) ||
      String(i.dia || '').includes(q)
    ) : listRaw;
    const totalCalPages = Math.ceil(listItems.length / CAL_PAGE_SIZE);
    const safePage = Math.min(calPage, Math.max(1, totalCalPages));
    const paginatedItems = listItems.slice((safePage - 1) * CAL_PAGE_SIZE, safePage * CAL_PAGE_SIZE);

    const tipoColor = (t) => {
      const map = { historia: '#f59e0b', natalicio: '#10b981', religiosa: '#6366f1', cultural: '#ec4899', duelo: '#64748b' };
      return map[t] || '#64748b';
    };

    const cells = [];
    for (let i = 0; i < startDay; i++) cells.push(<div key={`pad-${i}`} className={styles.calDayCell} />);
    for (let d = 1; d <= totalDays; d++) {
      const dayItems = getDayItems(d);
      const isToday = d === new Date().getDate() && calMonth === new Date().getMonth() && calYear === new Date().getFullYear();
      const isSelected = selectedCalDay === d;
      cells.push(
        <button
          key={d}
          type="button"
          className={`${styles.calDayCell} ${dayItems.length ? styles.calDayHasEfem : ''} ${isToday ? styles.calDayToday : ''} ${isSelected ? styles.calDaySelected : ''}`}
          onClick={() => { setSelectedCalDay(prev => prev === d ? null : d); }}
        >
          <span className={styles.calDayNum}>{d}</span>
          {dayItems.length > 0 && (
            <span className={styles.calBadgeWrap}>
              {dayItems.slice(0, 2).map((it, idx) => (
                <span key={idx} className={styles.calEfemBadge} style={{ background: tipoColor(it.tipo) + '22', color: tipoColor(it.tipo) }}>
                  {it.titulo?.slice(0, 12)}{it.titulo?.length > 12 ? '…' : ''}
                </span>
              ))}
              {dayItems.length > 2 && <span className={styles.calEfemMore}>+{dayItems.length - 2}</span>}
            </span>
          )}
        </button>
      );
    }

    return (
      <div className={styles.calPage}>
        {/* Header */}
        <div className={styles.dashboardHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Calendario</h2>
            <p className={styles.sectionSubtitle}>
              {calViewMode === 'list'
                ? `Todas las efemérides — ${allItems.length} registro${allItems.length !== 1 ? 's' : ''}`
                : selectedCalDay
                  ? `${selectedCalDay} de ${MONTHS[calMonth]} de ${calYear} — ${listItems.length} efeméride${listItems.length !== 1 ? 's' : ''}`
                  : `${MONTHS[calMonth]} de ${calYear} — ${monthItems.length} efeméride${monthItems.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>
          <div className={styles.tableActions}>
            <div className={styles.searchBar} style={{ minWidth: 220 }}>
              <Search size={15} />
              <input
                type="text"
                placeholder="Buscar efeméride por título, tipo, día..."
                value={calSearch}
                onChange={e => { setCalSearch(e.target.value); setCalPage(1); }}
              />
              {calSearch && <button type="button" onClick={() => setCalSearch('')}><X size={14} /></button>}
            </div>
            <div className={styles.calViewToggle}>
              <button
                type="button"
                className={`${styles.calViewBtn} ${calViewMode === 'calendar' ? styles.calViewBtnActive : ''}`}
                onClick={() => { setCalViewMode('calendar'); }}
              >
                <Calendar size={15} /> Calendario
              </button>
              <button
                type="button"
                className={`${styles.calViewBtn} ${calViewMode === 'list' ? styles.calViewBtnActive : ''}`}
                onClick={() => { setCalViewMode('list'); }}
              >
                <List size={15} /> Lista
              </button>
            </div>
            <button className={styles.addBtn} onClick={() => openModal('Efemérides', 'create', { dia: selectedCalDay || '', mes: calMonth + 1, anio: calYear })}>
              <Plus size={16} /> Añadir
            </button>
          </div>
        </div>

        {calViewMode === 'calendar' && (
          <>
            {/* Navigation */}
            <div className={styles.calNav}>
              <button type="button" className={styles.calNavBtn} onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); setSelectedCalDay(null); }}>
                <ChevronLeft size={18} />
              </button>
              <span className={styles.calNavLabel}>{MONTHS[calMonth]} {calYear}</span>
              <button type="button" className={styles.calNavBtn} onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); setSelectedCalDay(null); }}>
                <ChevronRight size={18} />
              </button>
              <button type="button" className={styles.calTodayBtn} onClick={() => { const n = new Date(); setCalMonth(n.getMonth()); setCalYear(n.getFullYear()); setSelectedCalDay(null); }}>
                Hoy
              </button>
            </div>

            {/* Grid */}
            <div className={styles.calGrid}>
              {DAY_NAMES.map(d => <div key={d} className={styles.calDayHeader}>{d}</div>)}
              {cells}
            </div>
          </>
        )}

        {/* Lista */}
        <div className={styles.calListSection}>
          <div className={styles.calListHeader}>
            <h3 className={styles.calListTitle}>
              {calViewMode === 'list'
                ? 'Todas las efemérides'
                : selectedCalDay
                  ? `Efemérides del ${selectedCalDay}`
                  : `Efemérides de ${MONTHS[calMonth]}`
              }
              <span className={styles.calListCount}>{listItems.length} registro{listItems.length !== 1 ? 's' : ''}</span>
            </h3>
            <div className={styles.calListHeaderRight}>
              {calViewMode === 'calendar' && selectedCalDay && (
                <button type="button" className={styles.calClearFilter} onClick={() => setSelectedCalDay(null)}>
                  <X size={14} /> Mostrar todas
                </button>
              )}
            </div>
          </div>

          {listItems.length === 0 ? (
            <div className={styles.calEmpty}>
              <Calendar size={40} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
              <p>No hay efemérides{calViewMode === 'calendar' ? ` para ${selectedCalDay ? `el día ${selectedCalDay}` : 'este mes'}` : ''}.</p>
              <button className={styles.addBtn} style={{ marginTop: '0.5rem' }} onClick={() => openModal('Efemérides', 'create', { dia: selectedCalDay || '', mes: calMonth + 1, anio: calYear })}>
                <Plus size={16} /> Crear primera efeméride
              </button>
            </div>
          ) : (
            <>
              <div className={styles.calListGrid}>
                {paginatedItems.map((item) => (
                  <div key={item.id} className={styles.calListItem}>
                    <div className={styles.calListItemLeft}>
                      <span className={styles.calListItemDate}>
                        {item.dia} · {MONTHS[parseInt(item.mes) - 1] || ''}
                        {item.anio ? ` · ${item.anio}` : ''}
                      </span>
                      <span className={styles.calListItemTipo} style={{ background: tipoColor(item.tipo) + '22', color: tipoColor(item.tipo) }}>
                        {capitalize(item.tipo)}
                      </span>
                      <span className={styles.calListItemTitle}>{item.titulo}</span>
                      {item.descripcion && <p className={styles.calListItemDesc}>{item.descripcion.slice(0, 120)}{item.descripcion.length > 120 ? '…' : ''}</p>}
                    </div>
                    <div className={styles.actionBtns}>
                      <button type="button" className={styles.editBtn} onClick={() => openModal('Efemérides', 'edit', item)} title="Editar">
                        <Edit2 size={14} />
                      </button>
                      <button type="button" className={styles.deleteBtn} onClick={() => handleDelete('Efemérides', item.id)} title="Eliminar">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {totalCalPages > 1 && (
                <div className={styles.pagination}>
                  <button disabled={safePage <= 1} onClick={() => setCalPage(p => p - 1)}><ChevronLeft size={16} /></button>
                  <span>Página {safePage} de {totalCalPages} ({listItems.length} registros)</span>
                  <button disabled={safePage >= totalCalPages} onClick={() => setCalPage(p => p + 1)}><ChevronRight size={16} /></button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  // ─── Router de contenido ──────────────────────────────────────────────────
  const renderContent = () => {
    switch (activeTab) {
      case 'Inicio':    return renderDashboard();
      case 'Mi Perfil': return renderProfilePage();
      case 'Historia':  return renderGenericTable('Línea de Tiempo Histórica', 'Historia', [{ key: 'anio', label: 'Año' }, { key: 'titulo', label: 'Título' }, { key: 'activo', label: 'Estado', render: v => <span className={v ? styles.badgeActivo : styles.badgeOculto}>{v ? 'Activo' : 'Oculto'}</span> }]);
      case 'Cultores':  return renderGenericTable('Cultores y Artistas', 'Cultores', [{ key: 'nombre', label: 'Nombre' }, { key: 'disciplina', label: 'Disciplina' }, { key: 'localidad', label: 'Localidad' }, { key: 'descripcion', label: 'Biografía', render: v => <span className={styles.cellText}>{descToText(v).slice(0, 35)}{descToText(v).length > 35 ? '…' : ''}</span> }, { key: 'imagen', label: 'Foto' }]);
      case 'Costumbres': return renderGenericTable('Costumbres Tradicionales', 'Costumbres', [{ key: 'nombre', label: 'Nombre' }, { key: 'categoria', label: 'Categoría' }]);
      case 'Gastronomía': return renderGenericTable('Gastronomía Local', 'Gastronomía', [{ key: 'nombre', label: 'Plato/Dulce' }, { key: 'imagen', label: 'Imagen' }]);
      case 'Centros Culturales': return renderGenericTable('Centros e Instituciones Culturales', 'Centros Culturales', [{ key: 'titulo', label: 'Nombre' }, { key: 'subtitulo', label: 'Subtítulo' }, { key: 'imagen', label: 'Imagen' }]);
      case 'Educación': return renderGenericTable('Instituciones Educativas', 'Educación', [{ key: 'nombre', label: 'Institución' }, { key: 'nivel', label: 'Nivel' }]);
      case 'Hitos Educativos': return renderGenericTable('Hitos Educativos', 'Hitos Educativos', [{ key: 'anio', label: 'Año/Período' }, { key: 'evento', label: 'Evento' }]);
      case 'Educadores': return renderGenericTable('Educadores Destacados', 'Educadores', [{ key: 'nombre', label: 'Nombre' }, { key: 'apodo', label: 'Apodo' }, { key: 'imagen', label: 'Foto' }]);
      case 'Sanidad':   return renderGenericTable('Centros de Salud', 'Sanidad', [{ key: 'nombre', label: 'Nombre' }, { key: 'tipo', label: 'Tipo' }, { key: 'horarios', label: 'Horarios' }]);
      case 'Hitos Sanidad': return renderGenericTable('Hitos de Salud', 'Hitos Sanidad', [{ key: 'periodo', label: 'Período' }, { key: 'titulo', label: 'Título' }]);
      case 'Deportes':  return renderGenericTable('Deportes y Disciplinas', 'Deportes', [{ key: 'disciplina', label: 'Disciplina' }, { key: 'icono', label: 'Icono' }]);
      case 'Medicina Trad': return renderGenericTable('Medicina Tradicional', 'Medicina Trad', [{ key: 'nombre', label: 'Nombre' }, { key: 'icono', label: 'Icono' }]);
      case 'Personajes': return renderGenericTable('Personajes Destacados', 'Personajes', [{ key: 'nombre', label: 'Nombre' }]);
      case 'Efemérides': return renderCalendario();
      case 'Libros':     return renderGenericTable('Libros', 'Libros', [{ key: 'titulo', label: 'Título' }, { key: 'autor', label: 'Autor' }, { key: 'imagen', label: 'Portada' }], { key: 'formato', label: '', options: [] }, 'Biblioteca');
      case 'Música':     return renderGenericTable('Música', 'Música', [{ key: 'titulo', label: 'Título' }, { key: 'autor', label: 'Autor' }, { key: 'imagen', label: 'Portada' }], { key: 'formato', label: '', options: [] }, 'Biblioteca');
      case 'Imágenes':   return renderGenericTable('Imágenes', 'Imágenes', [{ key: 'titulo', label: 'Título' }, { key: 'autor', label: 'Autor' }, { key: 'imagen', label: 'Portada' }], { key: 'formato', label: '', options: [] }, 'Biblioteca');
      case 'Videos':     return renderGenericTable('Videos', 'Videos', [{ key: 'titulo', label: 'Título' }, { key: 'autor', label: 'Autor' }, { key: 'imagen', label: 'Portada' }], { key: 'formato', label: '', options: [] }, 'Biblioteca');
      case 'Documentos': return renderGenericTable('Documentos', 'Documentos', [{ key: 'titulo', label: 'Título' }, { key: 'autor', label: 'Autor' }, { key: 'imagen', label: 'Portada' }], { key: 'formato', label: '', options: [] }, 'Biblioteca');
      case 'Usuarios':  return renderGenericTable('Gestión de Usuarios', 'Usuarios', [{ key: 'nombre', label: 'Nombre' }, { key: 'correo', label: 'Correo' }, { key: 'rol', label: 'Rol', render: v => <span className={styles.tipoBadge}>{capitalize(v)}</span> }]);
      // Geografía y Mapa
      case 'Lugares del Mapa':       return renderGenericTable('Lugares del Mapa Interactivo', 'Lugares del Mapa', [{ key: 'name', label: 'Nombre' }, { key: 'category', label: 'Categoría', render: v => <span className={styles.tipoBadge}>{capitalize(v)}</span> }, { key: 'vicinity', label: 'Dirección' }]);
      case 'Sectores':               return renderGenericTable('Sectores Geográficos', 'Sectores', [{ key: 'icono', label: 'Icono' }, { key: 'title', label: 'Título' }]);
      case 'Censos':                 return renderGenericTable('Censos de Población', 'Censos', [{ key: 'year', label: 'Año' }, { key: 'population', label: 'Población' }, { key: 'housing', label: 'Viviendas' }]);
      case 'Highlights Geográficos': return renderGenericTable('Datos Destacados del Municipio', 'Highlights Geográficos', [{ key: 'icono', label: 'Icono' }, { key: 'title', label: 'Título' }, { key: 'description', label: 'Descripción' }]);
      // Nosotros
      case 'Nosotros Features': return renderGenericTable('Módulos del Portal (Nosotros)', 'Nosotros Features', [{ key: 'icono', label: 'Icono' }, { key: 'titulo', label: 'Título' }]);
      case 'Nosotros Valores':  return renderGenericTable('Valores del Proyecto (Nosotros)', 'Nosotros Valores', [{ key: 'icono', label: 'Icono' }, { key: 'titulo', label: 'Título' }]);
      case 'Nosotros Stats':    return renderGenericTable('Estadísticas Clave (Nosotros)', 'Nosotros Stats', [{ key: 'icono', label: 'Icono' }, { key: 'label', label: 'Indicador' }, { key: 'valor', label: 'Valor' }]);
      case 'Misión/Visión':     return renderGenericTable('Misión y Visión', 'Misión/Visión', [{ key: 'tipo', label: 'Tipo', render: v => <span className={styles.tipoBadge}>{v === 'mision' ? 'Misión' : 'Visión'}</span> }, { key: 'titulo', label: 'Título' }]);
      // Historia (subitems)
      case 'Historia Secciones':     return renderGenericTable('Secciones de Historia', 'Historia Secciones', [{ key: 'titulo', label: 'Título' }]);
      case 'Historia Videos':        return renderGenericTable('Videos Históricos', 'Historia Videos', [{ key: 'titulo', label: 'Título' }, { key: 'src', label: 'URL' }]);
      case 'Historia Documentos':    return renderGenericTable('Documentos y Archivos', 'Historia Documentos', [{ key: 'titulo', label: 'Título' }, { key: 'alt', label: 'Alt' }]);
      case 'Historia Features':      return renderGenericTable('Aspectos Históricos', 'Historia Features', [{ key: 'icono_nombre', label: 'Icono' }, { key: 'titulo', label: 'Título' }]);
      case 'Historia Datos Rápidos': return renderGenericTable('Datos y Curiosidades', 'Historia Datos Rápidos', [{ key: 'icono_nombre', label: 'Icono' }, { key: 'label', label: 'Etiqueta' }]);
      // Home
      case 'Hero Slides':  return renderGenericTable('Carrusel Principal (Hero)', 'Hero Slides', [{ key: 'title', label: 'Título' }, { key: 'subtitle', label: 'Subtítulo' }]);
      case 'Home Cards':   return renderGenericTable('Tarjetas de la Página de Inicio', 'Home Cards', [{ key: 'titulo', label: 'Título' }, { key: 'tipo', label: 'Tipo' }]);
      case 'Home Featured':return renderGenericTable('Secciones Destacadas en Inicio', 'Home Featured', [{ key: 'titulo', label: 'Título' }, { key: 'path', label: 'Ruta' }]);
      default: return renderDashboard();
    }
  };

  const activeGroupLabel = NAV_GROUPS.find(g => g.items.some(i => i.name === activeTab))?.label;

  return (
    <div className={styles.adminContainer}>
      <Toast toasts={toasts} />
      <ConfirmModal config={confirmConfig} onClose={closeConfirm} />

      {/* Modal CRUD */}
      {modalConfig.isOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{modalConfig.mode === 'create' ? 'Añadir' : 'Editar'}: {modalConfig.type}</h3>
              <button type="button" onClick={closeModal} className={styles.closeBtn}><X size={20} /></button>
            </div>
            <form onSubmit={handleModalSave}>
              <div className={styles.modalBody}>
                {renderModalForm()}
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={closeModal} className={styles.cancelBtn}>Cancelar</button>
                <button type="submit" className={styles.saveBtn}>Guardar cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <div className={styles.brandIcon} />
          <div className={styles.brandTextWrap}>
            <div className={styles.brandName}>Una Sola Tacarigua</div>
            <div className={styles.brandSub}>Panel Admin</div>
          </div>
        </div>

        <nav className={styles.navMenu}>
          {NAV_GROUPS.map(({ label, icon: GroupIcon, items }) => (
            <div key={label} className={styles.navGroup}>
              <button
                type="button"
                className={`${styles.navGroupHeader} ${activeGroupLabel === label ? styles.navGroupHeaderActive : ''}`}
                onClick={() => toggleGroup(label)}
              >
                <GroupIcon size={16} className={styles.groupIcon} />
                <span>{label}</span>
                {expandedGroups[label] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {expandedGroups[label] && (
                <ul className={styles.navGroupItems}>
                  {items.map(({ name, icon: ItemIcon }) => (
                    <li key={name}>
                      <button
                        type="button"
                        className={activeTab === name ? styles.navItemActive : styles.navItem}
                        onClick={() => navTo(name)}
                      >
                        <ItemIcon size={14} />
                        <span>{name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

      </aside>

      {/* Main */}
      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>{activeTab === 'Inicio' ? 'Panel de Administrador General' : activeTab}</h1>
            <p className={styles.welcomeText}>Bienvenido, {adminUser?.nombre || 'Carlos Eduardo Ramos González'}</p>
          </div>
          <div className={styles.userProfile}>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{adminUser?.nombre || 'Carlos Eduardo Ramos González'}</div>
              <div className={styles.userRole}>Administrador</div>
            </div>
            <div className={styles.userAvatar} onClick={() => setActiveTab('Mi Perfil')} title="Ver perfil">
              <img src={adminUser?.imagen || adminUser?.foto || "/images/Carlos Ramos.png"} alt="Admin" className={styles.avatarImg} />
            </div>
            <button type="button" className={styles.logoutBtn} onClick={() => askConfirm('¿Estás seguro de que deseas cerrar sesión?', onLogout, { icon: LogOut, title: 'Cerrar sesión', confirmLabel: 'Sí, cerrar sesión' })}>Cerrar sesión</button>
          </div>
        </header>

        <div className={styles.contentArea}>
          {loading && activeTab !== 'Inicio' ? (
            <div className={styles.loaderWrap}><RefreshCw size={24} className={styles.spinnerIcon} /></div>
          ) : (
            renderContent()
          )}
        </div>

        <footer className={styles.adminFooter}>
          <p className={styles.footerCopy}>© {new Date().getFullYear()} Una Sola Tacarigua</p>
          <p className={styles.devCredit}>Desarrollado por Carlos Eduardo Ramos González</p>
        </footer>
      </main>
    </div>
  );
}

export default AdminDashboardModule;
