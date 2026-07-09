import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Sociedad.module.css';
import Educacion from './Educacion/Educacion';
import Sanidad from './Sanidad/Sanidad';
import Deportes from './Deportes/Deportes';
import HeroHeader from '../ui/HeroHeader';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../ui/ScrollReveal';

const tabs = [
  {
    id: 'educacion',
    label: 'Educación',
    icon: '📚',
    color: 'hsl(38,80%,52%)',
    stat: '150+',
    statLabel: 'Años de historia educativa',
    desc: 'Desde 1875, cuna de maestros y sabios del pueblo.',
  },
  {
    id: 'sanidad',
    label: 'Sanidad',
    icon: '🏥',
    color: 'hsl(195,70%,42%)',
    stat: '1.500',
    statLabel: 'Años de medicina ancestral',
    desc: 'De los curanderos Tacaribas al dispensario moderno.',
  },
  {
    id: 'deportes',
    label: 'Deportes',
    icon: '🏅',
    color: 'hsl(0,65%,50%)',
    stat: '2',
    statLabel: 'Medallas Olímpicas Especiales',
    desc: 'Atletas que pusieron a Tacarigua en el mapa mundial.',
  },
];

const Sociedad = () => {
  const [activeTab, setActiveTab] = useState('educacion');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'educacion': return <Educacion />;
      case 'sanidad': return <Sanidad />;
      case 'deportes': return <Deportes />;
      default: return <Educacion />;
    }
  };

  return (
    <div className={styles.sociedadContainer}>

      {/* ── Hero Header ── */}
      <HeroHeader
        title="La Sociedad Tacarigüera"
        description="Conoce cómo se educó, sanó y destacó en el deporte este pueblo de raíces indígenas que hoy sigue siendo orgullo de Margarita."
        theme="ocean"
        shape="waves"
        images={[
          '/Portada documentos/Portada Tacarigua Educativa.png',
          '/Portada documentos/Portada Tacarigua Educativa 2.png',
          '/Portada documentos/Portada Tacarigua Sanitaria.png',
          '/Portada documentos/Portada Tacarigua Sanitaria 2.png',
          '/Portada documentos/Portada Tacarigua Deportiva.png',
          '/Portada documentos/Portada Tacarigua Deportiva 2.png'
        ]}
      >
        <StaggerContainer delay={0.2}>
          <div className={styles.statRow}>
            {tabs.map((t, index) => (
              <StaggerItem key={t.id} index={index}>
                <motion.button
                  type="button"
                  className={`${styles.statCard} ${activeTab === t.id ? styles.statCardActive : ''}`}
                  onClick={() => setActiveTab(t.id)}
                  style={{ '--card-color': t.color }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={styles.statIcon}>{t.icon}</span>
                  <span className={styles.statValue}>{t.stat}</span>
                  <span className={styles.statLabel}>{t.statLabel}</span>
                  <span className={styles.statDesc}>{t.desc}</span>
                </motion.button>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </HeroHeader>

      {/* ── Tabs ── */}
      <ScrollReveal variant="up" delay={0.1}>
        <div className={styles.tabsWrapper}>
          <div className={styles.tabsContainer}>
            {tabs.map((tab) => (
              <motion.button
                type="button"
                key={tab.id}
                className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                style={activeTab === tab.id ? { '--tab-accent': tab.color } : {}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                <span className={styles.tabLabel}>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={styles.contentArea}
        >
          {renderActiveTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Sociedad;