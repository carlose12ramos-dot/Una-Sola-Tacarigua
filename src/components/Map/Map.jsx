import React, { useEffect, useRef } from 'react';
import { TacariguaMap } from './mapComponent';

export default function Map() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mapInstance = new TacariguaMap(containerRef.current);
    mapInstance.initMap();

    return () => {
      mapInstance.destroy();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="map-container"
      style={{ width: '100%', height: '100%', minHeight: '420px', display: 'block', background: '#eaeaea', borderRadius: '0' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '420px', color: '#666' }}>
        Cargando mapa interactivo…
      </div>
    </div>
  );
}
