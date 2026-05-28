import React, { useState } from 'react';
import styles from './Sociedad.module.css';
import Educacion from './Educacion/Educacion';
import Sanidad from './Sanidad/Sanidad';
import Deportes from './Deportes/Deportes';

const tabs = [
  { id: 'educacion', label: 'Educación', icon: '📚', color: 'hsl(38,80%,52%)' },
  { id: 'sanidad',   label: 'Sanidad',   icon: '🏥', color: 'hsl(195,70%,42%)' },
  { id: 'deportes',  label: 'Deportes',   icon: '⚽', color: 'hsl(0,65%,50%)' },
];

const Sociedad = () => {
  const [activeTab, setActiveTab] = useState('educacion');

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
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerBadge}>Tacarigua Digital</span>
        <h1 className={styles.title}>Sociedad Tacarigüera</h1>
        <p className={styles.subtitle}>
          Educación, salud y deporte: los pilares de nuestra comunidad insular
        </p>
      </div>

      {/* Tabs */}
      <div className={styles.tabsWrapper}>
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={activeTab === tab.id ? { '--tab-accent': tab.color } : {}}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={styles.contentArea} key={activeTab}>
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Sociedad;
