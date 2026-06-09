import React, { useState, useEffect } from 'react';
import CultivatorCard from '../components/culture/CultivatorCard';
import CultureItemCard from '../components/culture/CultureItemCard';
import styles from './CultureModule.module.css';
import { cultoresMock, costumbresMock, gastronomiaMock } from '../data/mockData';

const MAIN_TABS = ['Cultores', 'Costumbres y Tradiciones', 'Gastronomía'];
const CULTORES_SUBTABS = ['Todos', 'Cantantes', 'Músicos', 'Compositores', 'Artesanos', 'Personajes Populares'];

const CultureModule = () => {
  const [activeTab, setActiveTab] = useState('Cultores');
  const [activeSubTab, setActiveSubTab] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulación de carga (o fetch a Supabase en el futuro)
    setLoading(true);
    setTimeout(() => {
      let data = [];
      if (activeTab === 'Cultores') {
        if (activeSubTab === 'Todos') {
          data = cultoresMock;
        } else {
          // Filtrado básico basado en la disciplina. 
          // (Asumiendo que 'disciplina' coincide aproximadamente con los subtabs)
          data = cultoresMock.filter(c => c.disciplina.toLowerCase().includes(activeSubTab.toLowerCase().slice(0, 4)));
        }
      } else if (activeTab === 'Costumbres y Tradiciones') {
        data = costumbresMock;
      } else if (activeTab === 'Gastronomía') {
        data = gastronomiaMock;
      }
      
      setItems(data);
      setLoading(false);
    }, 400);
  }, [activeTab, activeSubTab]);

  return (
    <section className={styles.container} id="cultura">
      <div className="container">
        <div className={styles.header}>
        </div>

        {/* Main Tabs */}
        <div className={styles.tabsContainer}>
          {MAIN_TABS.map(tab => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => {
                setActiveTab(tab);
                setActiveSubTab('Todos'); // Reset subtab on main tab change
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sub Tabs for Cultores */}
        {activeTab === 'Cultores' && (
          <div className={styles.subTabsContainer}>
            {CULTORES_SUBTABS.map(subtab => (
              <button
                key={subtab}
                className={`${styles.subTab} ${activeSubTab === subtab ? styles.activeSubTab : ''}`}
                onClick={() => setActiveSubTab(subtab)}
              >
                {subtab}
              </button>
            ))}
          </div>
        )}

        {/* Content Area */}
        {loading ? (
          <p style={{ textAlign: 'center' }}>Cargando directorio...</p>
        ) : (
          <div className={styles.grid}>
            {items.length > 0 ? (
              items.map(item => (
                activeTab === 'Cultores' 
                  ? <CultivatorCard key={item.id} cultor={item} />
                  : <CultureItemCard key={item.id} item={item} />
              ))
            ) : (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No se encontraron registros en esta categoría.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CultureModule;
