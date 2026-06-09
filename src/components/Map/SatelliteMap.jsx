/**
 * SatelliteMap.jsx
 * Segundo mapa: vista satelital de Tacarigua usando teselas ESRI World Imagery.
 * Funciona completamente offline (las teselas se cachean en el Service Worker).
 */
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Coordenadas del centro de Tacarigua
const CENTER = [11.0505, -63.9008];
const ZOOM   = 14;

// Marcador central de Tacarigua
const TACARIGUA_MARKER = {
  lat: 11.0505,
  lng: -63.9008,
  label: 'Tacarigua, Parroquia Guevara',
  sublabel: 'Municipio Gómez · Nueva Esparta · Venezuela',
};

export default function SatelliteMap() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, {
      center: CENTER,
      zoom: ZOOM,
      zoomControl: true,
      attributionControl: true,
    });

    // ── Capa base: ESRI World Imagery (satelital) ─────────────
    const satellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; ' +
          'Source: Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, AeroGRID, IGN',
        maxZoom: 19,
      }
    );

    // ── Capa de nombres (calles y sectores transparentes) ─────
    const labels = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
      {
        opacity: 1, // Visible por defecto sobre el satélite
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>, under CC BY 3.0. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under ODbL.',
        maxZoom: 19,
        subdomains: 'abcd',
      }
    );

    satellite.addTo(map);
    labels.addTo(map); // Añadimos las etiquetas por defecto

    // ── Marcador central ───────────────────────────────────────
    const pulseIcon = L.divIcon({
      className: '',
      html: `
        <div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
          <div style="
            position:absolute;width:32px;height:32px;border-radius:50%;
            background:rgba(218,165,32,0.3);
            animation:sat-ring 1.6s ease-out infinite;
          "></div>
          <div style="
            width:16px;height:16px;border-radius:50%;
            background:#DAA520;border:3px solid #fff;
            box-shadow:0 2px 10px rgba(218,165,32,0.7);
            position:relative;z-index:1;
          "></div>
        </div>
        <style>
          @keyframes sat-ring {
            0%   { transform:scale(0.5);opacity:1; }
            100% { transform:scale(2.2);opacity:0; }
          }
        </style>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    L.marker([TACARIGUA_MARKER.lat, TACARIGUA_MARKER.lng], { icon: pulseIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:'Inter',sans-serif;padding:4px 2px;">
          <b style="font-size:14px;color:#1d3557;">📍 ${TACARIGUA_MARKER.label}</b><br>
          <span style="font-size:12px;color:#6b7280;">${TACARIGUA_MARKER.sublabel}</span>
        </div>
      `, { maxWidth: 260 })
      .openPopup();

    // ── Control de capas ───────────────────────────────────────
    L.control.layers(
      { '🛰️ Satelital': satellite },
      {},
      { position: 'topright', collapsed: false }
    ).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', minHeight: '420px', borderRadius: '0' }}
    />
  );
}
