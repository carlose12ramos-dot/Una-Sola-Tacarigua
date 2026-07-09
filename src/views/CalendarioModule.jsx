import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Calendar, CalendarDays, History, Star, Heart, Music, Minus, Bell, Home, X, Sparkles } from 'lucide-react';
import SmartCalendar from '../components/calendario/SmartCalendar';
import { calendarData as calendarDataLocal } from '../data/calendarData';

const MESES_FULL = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MESES_SHORT = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

const TIPO_CONFIG = {
  historia:  { icon: History,  color: '#8b5a2b', gradient: 'linear-gradient(135deg, #8b5a2b, #c47c3a)', bg: 'rgba(139,90,43,0.1)',   label: 'Historia'  },
  natalicio: { icon: Star,     color: '#2e8b57', gradient: 'linear-gradient(135deg, #2e8b57, #3cb371)', bg: 'rgba(46,139,87,0.1)',   label: 'Natalicio' },
  religiosa: { icon: Heart,    color: '#7c3aed', gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)', bg: 'rgba(124,58,237,0.1)',  label: 'Religioso' },
  cultural:  { icon: Music,    color: '#d97706', gradient: 'linear-gradient(135deg, #d97706, #f59e0b)', bg: 'rgba(217,119,6,0.1)',   label: 'Cultural'  },
  duelo:     { icon: Minus,    color: '#374151', gradient: 'linear-gradient(135deg, #374151, #6b7280)', bg: 'rgba(55,65,81,0.1)',    label: 'Duelo'     },
};

const STATS = [
  { value: '200+', label: 'Efemérides registradas' },
  { value: '447', label: 'Años de historia' },
  { value: '12',  label: 'Meses de memoria' },
];

const CalendarioModule = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filter, setFilter] = useState('todos');
  const [bellOpen, setBellOpen] = useState(false);
  const [calendarData, setCalendarData] = useState(calendarDataLocal);
  const bellRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || '/api'}/calendario`)
      .then(res => res.json())
      .then(apiData => {
        if (apiData && apiData.length > 0) {
          // Normalize API data to same shape as local data
          const normalized = apiData
            .filter(item => item.activo !== false)
            .map(item => ({
              id: String(item.id),
              mes: item.mes,
              dia: item.dia,
              tipo: item.tipo || 'historia',
              titulo: item.titulo,
              descripcion: item.descripcion || '',
              anio: item.anio || null,
            }));
          // Merge: API data takes priority, deduplicate by content (mes+dia+titulo)
          const apiKeys = new Set(normalized.map(e => `${e.mes}-${e.dia}-${e.titulo}`));
          const localFiltered = calendarDataLocal.filter(e => !apiKeys.has(`${e.mes}-${e.dia}-${e.titulo}`));
          setCalendarData([...normalized, ...localFiltered]);
        }
      })
      .catch(() => {
        // Keep local data on error
      });
  }, []);

  const today = new Date();
  const todayEvents = calendarData.filter(e => e.mes === today.getMonth() + 1 && e.dia === today.getDate());

  useEffect(() => {
    setSelectedEvents(todayEvents);
    setSelectedDate(today);
  }, []);

  // Close bell popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setBellOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectEvent = (events, date) => {
    setSelectedEvents(events);
    setSelectedDate(date);
  };

  const filteredData = filter === 'todos' ? calendarData : calendarData.filter(e => e.tipo === filter);

  const tiposOrden = ['todos', 'historia', 'natalicio', 'religiosa', 'cultural', 'duelo'];

  return (
    <div style={{ background: '#0d1b2a', minHeight: '100vh', position: 'relative' }}>
      <Helmet>
        <title>Calendario Inteligente | Una Sola Tacarigua</title>
        <meta name="description" content="Efemérides, historia y fechas importantes de Tacarigua y San Sebastián" />
      </Helmet>

      {/* ── FLOATING ACTION BUTTONS (Bell + Home) ── */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end' }}>
        {/* Notification Bell */}
        <div ref={bellRef} style={{ position: 'relative' }}>
          <AnimatePresence>
            {bellOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{
                  position: 'absolute', bottom: '4rem', right: 0,
                  width: '320px',
                  background: 'rgba(13,27,42,0.97)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212,160,69,0.3)',
                  borderRadius: '1rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Bell size={16} color='#d4a045' />
                    <span style={{ color: '#d4a045', fontWeight: 700, fontSize: '0.9rem' }}>Efemérides de Hoy</span>
                  </div>
                  <button onClick={() => setBellOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}>
                    <X size={16} />
                  </button>
                </div>
                <div style={{ padding: '0.75rem', maxHeight: '280px', overflowY: 'auto' }}>
                  {todayEvents.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {todayEvents.map((evt) => {
                        const cfg = TIPO_CONFIG[evt.tipo] || TIPO_CONFIG.historia;
                        return (
                          <div key={evt.id} style={{
                            background: 'rgba(255,255,255,0.04)',
                            borderRadius: '0.75rem',
                            padding: '0.75rem',
                            borderLeft: `3px solid ${cfg.color}`,
                          }}>
                            <div style={{ fontSize: '0.78rem', color: cfg.color, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>{cfg.label}{evt.anio ? ` · ${evt.anio}` : ''}</div>
                            <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.88rem', lineHeight: 1.4 }}>{evt.titulo}</div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '1.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>
                      <CalendarDays size={28} style={{ marginBottom: '0.5rem', opacity: 0.4 }} />
                      <p>No hay efemérides para hoy</p>
                    </div>
                  )}
                </div>
                <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.07)', textAlign: 'center', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
                  {today.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setBellOpen(!bellOpen)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            style={{
              width: 52, height: 52, borderRadius: '50%',
              background: bellOpen ? 'rgba(212,160,69,0.9)' : 'rgba(13,27,42,0.9)',
              border: '1px solid rgba(212,160,69,0.5)',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: bellOpen ? '#1a2e4a' : '#d4a045',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              position: 'relative',
            }}
            aria-label="Ver efemérides del día"
          >
            <Bell size={22} />
            {todayEvents.length > 0 && (
              <span style={{
                position: 'absolute', top: 6, right: 6,
                width: 10, height: 10, borderRadius: '50%',
                background: '#ef4444',
                border: '2px solid #0d1b2a',
                animation: 'pulseRed 2s infinite',
              }} />
            )}
          </motion.button>
        </div>

        {/* Back to Home button */}
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(13,27,42,0.9)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.7)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}
          aria-label="Volver al inicio"
          title="Volver al inicio"
        >
          <Home size={22} />
        </motion.button>
      </div>

      {/* ── HERO ─────────────────────── */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '6rem 0 5rem',
        background: 'linear-gradient(160deg, #0d1b2a 0%, #1a2e4a 60%, #0d1b2a 100%)',
      }}>
        {/* Background image overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/images/iglesia-plaza-tacarigua-aerea.webp')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.08,
        }} />
        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,160,69,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(212,160,69,0.15)', color: '#d4a045',
                border: '1px solid rgba(212,160,69,0.3)',
                padding: '0.45rem 1.3rem', borderRadius: '99px',
                fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.5px',
                textTransform: 'uppercase', marginBottom: '1.75rem',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={13} />
              Memoria Histórica
            </motion.div>

            <h1 style={{
              fontFamily: 'var(--fuente-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900, color: '#fff',
              lineHeight: 1.1, marginBottom: '1.25rem',
            }}>
              Calendario Inteligente<br />
              <span style={{ color: '#d4a045' }}>de Tacarigua</span>
            </h1>

            <p style={{
              color: 'rgba(255,255,255,0.55)', fontSize: '1.15rem',
              maxWidth: '580px', margin: '0 auto 3rem', lineHeight: 1.7,
            }}>
              Efemérides, natalicios, tradiciones y fechas históricas de Una Sola Tacarigua
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: '#d4a045',
                    fontFamily: 'var(--fuente-display)',
                  }}>{s.value}</div>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER BAR ─────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: 'rgba(13,27,42,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '1rem 0',
      }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {tiposOrden.map(tipo => {
              const cfg = TIPO_CONFIG[tipo];
              const isActive = filter === tipo;
              return (
                <motion.button
                  key={tipo}
                  onClick={() => setFilter(tipo)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '0.5rem 1.3rem',
                    borderRadius: '99px',
                    border: isActive
                      ? `1px solid ${cfg ? cfg.color : '#d4a045'}`
                      : '1px solid rgba(255,255,255,0.1)',
                    background: isActive
                      ? cfg ? cfg.bg : 'rgba(212,160,69,0.15)'
                      : 'rgba(255,255,255,0.04)',
                    color: isActive
                      ? cfg ? cfg.color : '#d4a045'
                      : 'rgba(255,255,255,0.5)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cfg && <cfg.icon size={13} />}
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────── */}
      <section style={{ padding: '4rem 0 6rem', position: 'relative' }}>
        {/* Decorative blob */}
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,90,43,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
            gap: '2.5rem',
            alignItems: 'start',
          }}>
            {/* Calendar */}
            <div>
              <SmartCalendar events={filteredData} onSelectEvent={handleSelectEvent} />
            </div>

            {/* Event detail panel */}
            <div style={{
              position: 'sticky', top: '80px',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              borderRadius: '1.5rem',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              {/* Panel header */}
              <div style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 0 0 rgba(34,197,94,0.4)',
                    animation: 'pulseGreen 2s infinite',
                  }} />
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: '1rem' }}>
                    Detalle del Día
                  </span>
                </div>
                <AnimatePresence mode="popLayout">
                  {selectedDate && (
                    <motion.div
                      key={selectedDate.toDateString()}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      style={{
                        background: 'linear-gradient(135deg, #d4a045, #b8791f)',
                        color: '#1a2e4a',
                        padding: '0.4rem 1rem',
                        borderRadius: '99px',
                        fontWeight: 800, fontSize: '0.85rem',
                      }}
                    >
                      {selectedDate.getDate()} {MESES_SHORT[selectedDate.getMonth()]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Events list */}
              <div style={{ padding: '1.5rem', maxHeight: '550px', overflowY: 'auto' }}>
                <AnimatePresence mode="popLayout">
                  {selectedEvents.length > 0 ? (
                    <motion.div
                      key={selectedDate?.toDateString()}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                      {selectedEvents.map((evento, idx) => {
                        const cfg = TIPO_CONFIG[evento.tipo] || TIPO_CONFIG.historia;
                        return (
                          <motion.div
                            key={evento.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08, type: 'spring', stiffness: 150 }}
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              borderRadius: '1rem',
                              padding: '1.25rem',
                              border: '1px solid rgba(255,255,255,0.07)',
                              position: 'relative', overflow: 'hidden',
                            }}
                          >
                            <div style={{
                              position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
                              background: cfg.gradient,
                            }} />
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                              <div style={{
                                width: 36, height: 36, borderRadius: '10px',
                                background: cfg.bg, color: cfg.color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                              }}>
                                <cfg.icon size={16} />
                              </div>
                              <div>
                                <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3, marginBottom: '0.25rem' }}>
                                  {evento.titulo}
                                </h4>
                                <span style={{
                                  fontSize: '0.7rem', fontWeight: 700,
                                  color: cfg.color,
                                  background: cfg.bg,
                                  padding: '0.2rem 0.6rem', borderRadius: '99px',
                                  textTransform: 'uppercase', letterSpacing: '0.5px',
                                }}>
                                  {cfg.label}{evento.anio ? ` · ${evento.anio}` : ''}
                                </span>
                              </div>
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                              {evento.descripcion}
                            </p>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ textAlign: 'center', padding: '3rem 1rem' }}
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                          width: 64, height: 64, borderRadius: '50%',
                          background: 'rgba(255,255,255,0.05)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          margin: '0 auto 1.5rem',
                          color: 'rgba(255,255,255,0.2)',
                        }}
                      >
                        <CalendarDays size={32} />
                      </motion.div>
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: '0.5rem' }}>
                        Sin efemérides este día
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem' }}>
                        Selecciona un día marcado en el calendario
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulseGreen {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          70% { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        @keyframes pulseRed {
          0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.6); }
          70% { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
        }
        @media (max-width: 900px) {
          .calendar-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default CalendarioModule;
