import React, { useState } from 'react';
import styles from './Sociedad.module.css';
import Educacion from './Educacion/Educacion';
import Sanidad from './Sanidad/Sanidad';
import Deportes from './Deportes/Deportes';

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
  const activeData = tabs.find((t) => t.id === activeTab);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'educacion': return <Educacion />;
      case 'sanidad':   return <Sanidad />;
      case 'deportes':  return <Deportes />;
      default:          return <Educacion />;
    }
  };

  return (
    <div className={styles.sociedadContainer}>

      {/* ── Hero Header ── */}
      <header className={styles.heroHeader}>
        <div className={styles.heroHeaderInner}>
          <h1 className={styles.heroTitle}>La Sociedad Tacarigüera</h1>
          <p className={styles.heroSubtitle}>
            Conoce cómo se educó, sanó y destacó en el deporte este pueblo
            de raíces indígenas que hoy sigue siendo orgullo de Margarita.
          </p>

          {/* Stat cards */}
          <div className={styles.statRow}>
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`${styles.statCard} ${activeTab === t.id ? styles.statCardActive : ''}`}
                onClick={() => setActiveTab(t.id)}
                style={{ '--card-color': t.color }}
              >
                <span className={styles.statIcon}>{t.icon}</span>
                <span className={styles.statValue}>{t.stat}</span>
                <span className={styles.statLabel}>{t.statLabel}</span>
                <span className={styles.statDesc}>{t.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Tabs ── */}
      <div className={styles.tabsWrapper}>
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              style={activeTab === tab.id ? { '--tab-accent': tab.color } : {}}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className={styles.contentArea} key={activeTab}>
        {renderActiveTab()}
      </div>

    </div>
  );
};

export default Sociedad;
