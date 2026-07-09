import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Calendar, ArrowRight, History, Star, Heart, Music, Minus, ChevronRight } from 'lucide-react';
import styles from './Ephemeris.module.css';
import { calendarData } from '../../data/calendarData';

const TIPO_CONFIG = {
  historia: { icon: History, color: '#8b5a2b', bg: '#fdf5ed', label: 'Historia' },
  natalicio: { icon: Star, color: '#2e8b57', bg: '#edf7f1', label: 'Natalicio' },
  religiosa: { icon: Heart, color: '#7c3aed', bg: '#f5f0fe', label: 'Religioso' },
  cultural: { icon: Music, color: '#d97706', bg: '#fffbeb', label: 'Cultural' },
  duelo: { icon: Minus, color: '#374151', bg: '#f3f4f6', label: 'Duelo' },
};

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouse = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const resetTilt = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={resetTilt}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

const Ephemeris = () => {
  const [efemerides, setEfemerides] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    let events = calendarData.filter(e => e.mes === m && e.dia === d);
    if (events.length === 0) {
      events = calendarData
        .filter(e => e.mes === m)
        .sort((a, b) => Math.abs(a.dia - d) - Math.abs(b.dia - d))
        .slice(0, 4);
    }
    setTimeout(() => { setEfemerides(events); setLoading(false); }, 300);
  }, []);

  const activeEvent = efemerides[activeIdx];
  const config = activeEvent ? (TIPO_CONFIG[activeEvent.tipo] || TIPO_CONFIG.historia) : null;

  return (
    <section className={styles.section}>
      {/* Decorative blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.inner}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.sectionLabel}>
            <Calendar size={14} />
            Efemérides Locales
          </span>
          <h2 className={styles.sectionTitle}>La Memoria Vive en las Fechas</h2>
          <p className={styles.sectionDesc}>
            Historia, natalicios y tradiciones que forjaron la identidad de un pueblo
          </p>
        </motion.div>

        {loading ? (
          <div className={styles.loadingWrap}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              className={styles.spinner}
            />
          </div>
        ) : efemerides.length > 0 ? (
          <div className={styles.layout}>
            {/* Sidebar tabs */}
            <motion.div
              className={styles.sidebar}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {efemerides.map((item, idx) => {
                const cfg = TIPO_CONFIG[item.tipo] || TIPO_CONFIG.historia;
                const Icon = cfg.icon;
                const isActive = idx === activeIdx;
                return (
                  <motion.button
                    key={item.id}
                    className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                    onClick={() => setActiveIdx(idx)}
                    whileHover={{ x: 4 }}
                    style={{ '--accent': cfg.color }}
                  >
                    <div className={styles.tabIcon} style={{ background: cfg.bg, color: cfg.color }}>
                      <Icon size={18} />
                    </div>
                    <div className={styles.tabText}>
                      <span className={styles.tabDate}>{item.dia} de {MESES[item.mes - 1]}</span>
                      <span className={styles.tabTitle}>{item.titulo}</span>
                    </div>
                    {isActive && <ChevronRight size={16} className={styles.tabArrow} />}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Main Card */}
            <div className={styles.cardWrap}>
              <AnimatePresence mode="wait">
                {activeEvent && (
                  <TiltCard key={activeEvent.id} className={styles.mainCard}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, type: 'spring', stiffness: 120 }}
                      className={styles.cardInner}
                    >
                      {/* Glow accent */}
                      <div className={styles.cardGlow} style={{ background: config.color }} />

                      <div className={styles.cardTop}>
                        <div className={styles.cardIconWrap} style={{ background: config.bg, color: config.color }}>
                          <config.icon size={32} />
                        </div>
                        <div>
                          <span className={styles.cardBadge} style={{ color: config.color, background: config.bg }}>
                            {config.label}
                          </span>
                          {activeEvent.anio && (
                            <span className={styles.cardYear}>Año {activeEvent.anio}</span>
                          )}
                        </div>
                      </div>

                      <div className={styles.cardDate}>
                        {activeEvent.dia} de {MESES[activeEvent.mes - 1]}
                      </div>

                      <h3 className={styles.cardTitle}>{activeEvent.titulo}</h3>
                      <p className={styles.cardDesc}>{activeEvent.descripcion}</p>

                      <div className={styles.cardDivider} style={{ background: config.color }} />

                      <div className={styles.cardFooter}>
                        <span className={styles.cardFooterText}>
                          Una Sola Tacarigua — Patrimonio Histórico
                        </span>
                        <button
                          className={styles.cardBtn}
                          onClick={() => navigate('/calendario')}
                          style={{ '--btn-color': config.color }}
                        >
                          Ver más
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  </TiltCard>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : null}

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className={styles.ctaBtn}
            onClick={() => navigate('/calendario')}
            whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(30,58,95,0.25)' }}
            whileTap={{ scale: 0.97 }}
          >
            <Calendar size={20} />
            Explorar el Calendario Completo
            <ArrowRight size={18} className={styles.ctaBtnArrow} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Ephemeris;
