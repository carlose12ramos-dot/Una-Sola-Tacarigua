import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { tacariguaPlaces } from './geoData';
import './mapStyles.css';

// ── Custom Icons ───────────────────────────────────────────
const createCustomIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const icons = {
  Religioso:    createCustomIcon('blue'),
  Gastronómico: createCustomIcon('orange'),
  Cultural:     createCustomIcon('violet'),
  Natural:      createCustomIcon('green'),
  Educativo:    createCustomIcon('yellow'),
  Salud:        createCustomIcon('red'),
  default:      createCustomIcon('grey'),
};

// ── Legend meta ────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Religioso',    color: '#3b82f6', emoji: '⛪' },
  { name: 'Cultural',     color: '#8b5cf6', emoji: '🎭' },
  { name: 'Gastronómico', color: '#f97316', emoji: '🌽' },
  { name: 'Educativo',    color: '#eab308', emoji: '📚' },
  { name: 'Natural',      color: '#22c55e', emoji: '🌿' },
  { name: 'Salud',        color: '#ef4444', emoji: '🏥' },
];

// ── Tile Pre-Warmer ────────────────────────────────────────
// Convierte coordenadas geográficas en índice de tesela (XYZ)
function latLngToTile(lat, lng, zoom) {
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
  return { x, y };
}

/**
 * Descarga en silencio las teselas OSM y ESRI para la zona de Tacarigua
 * (zoom 10-16). El Service Worker las intercepta y guarda en caché.
 * Solo se ejecuta si hay conexión a internet.
 */
async function warmTileCache() {
  if (!navigator.onLine) return;
  if (!('serviceWorker' in navigator)) return;

  // Bounding box de Tacarigua (con margen)
  const bounds = { minLat: 10.98, maxLat: 11.10, minLng: -63.96, maxLng: -63.86 };

  const osmSubdomains = ['a', 'b', 'c'];
  const cartoSubdomains = ['a', 'b', 'c', 'd'];
  
  const tileSets = [
    (x, y, z, i) => `https://${osmSubdomains[i % 3]}.tile.openstreetmap.org/${z}/${x}/${y}.png`,
    (x, y, z)    => `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`,
    (x, y, z, i) => `https://${cartoSubdomains[i % 4]}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/${z}/${x}/${y}.png`,
  ];

  const fetches = [];
  // Zoom 10-14: pocos tiles, se cargan todos
  // Zoom 15-16: solo el bbox ajustado de Tacarigua (más tiles)
  for (let zoom = 10; zoom <= 16; zoom++) {
    const tileMin = latLngToTile(bounds.maxLat, bounds.minLng, zoom);
    const tileMax = latLngToTile(bounds.minLat, bounds.maxLng, zoom);
    for (let x = tileMin.x; x <= tileMax.x; x++) {
      for (let y = tileMin.y; y <= tileMax.y; y++) {
        tileSets.forEach((urlFn, i) => {
          fetches.push(() => fetch(urlFn(x, y, zoom, i), { mode: 'no-cors' }).catch(() => {}));
        });
      }
    }
  }

  // Ejecución diferida y en lotes para no bloquear la red
  const BATCH = 6;
  const delay = ms => new Promise(r => setTimeout(r, ms));
  for (let i = 0; i < fetches.length; i += BATCH) {
    await Promise.all(fetches.slice(i, i + BATCH).map(fn => fn()));
    await delay(80); // pausa entre lotes
  }
}

// ── Map Class ──────────────────────────────────────────────
export class TacariguaMap {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.layers = {};
    this.userMarker = null;
    CATEGORIES.forEach(({ name }) => {
      this.layers[name] = L.layerGroup();
    });
  }

  // ── Geolocalización en tiempo real ─────────────────────
  locateUser(lat, lng) {
    if (!this.map) return;

    // Remove previous user marker if it exists
    if (this.userMarker) {
      this.map.removeLayer(this.userMarker);
      this.userMarker = null;
    }

    // Create a pulsing circle marker for the user
    const userIcon = L.divIcon({
      className: '',
      html: `
        <div style="
          width: 18px;
          height: 18px;
          background: #2563eb;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 0 0 6px rgba(37,99,235,0.25), 0 2px 8px rgba(0,0,0,0.3);
          animation: user-pulse 2s ease-in-out infinite;
        "></div>
        <style>
          @keyframes user-pulse {
            0%, 100% { box-shadow: 0 0 0 4px rgba(37,99,235,0.3), 0 2px 8px rgba(0,0,0,0.3); }
            50% { box-shadow: 0 0 0 12px rgba(37,99,235,0.08), 0 2px 8px rgba(0,0,0,0.3); }
          }
        </style>
      `,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
      popupAnchor: [0, -14],
    });

    this.userMarker = L.marker([lat, lng], { icon: userIcon, zIndexOffset: 1000 })
      .bindPopup('<div class="custom-popup"><div class="popup-header" style="border-left:4px solid #2563eb"><span class="popup-emoji">📍</span><h3>Tu ubicación actual</h3></div></div>', { maxWidth: 200 })
      .addTo(this.map)
      .openPopup();

    this.map.flyTo([lat, lng], 16, { animate: true, duration: 1.5 });
  }

  initMap() {
    this.map = L.map(this.containerId).setView([11.0505, -63.9008], 14);
    this.locationMarker = null;
    this.locationCircle = null;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(this.map);

    this.populateMarkers();

    // Layer control
    L.control.layers(null, this.layers, { collapsed: false }).addTo(this.map);
    Object.values(this.layers).forEach(layer => layer.addTo(this.map));

    this.drawBoundaries();
    this.addLegend();
    this.addGeolocationControl();

    // Pre-calienta teselas para uso offline (se ejecuta en background)
    setTimeout(() => warmTileCache(), 2000);

    // Herramienta temporal para el desarrollador/usuario para obtener coordenadas
    this.map.on('click', (e) => {
      const coords = `${e.latlng.lat.toFixed(7)}, ${e.latlng.lng.toFixed(7)}`;
      alert(`Coordenadas: ${coords}\nCópialas y envíaselas al asistente.`);
      console.log(`Coordenadas: ${coords}`);
    });
  }

  // ── Boundary polygon from Google Maps KML ─────────────
  drawBoundaries() {
    // Polígono que replica la delimitación oficial de Tacarigua en Google Maps
    // cubre Tacarigüita (NE), Corazón de Jesús (centro), Los Andes, El Manantial y San Sebastián (SW)
    const bounds = [
      [11.0630, -63.9135], // NO — límite Rancho Pitahaya
      [11.0615, -63.9035], // N  — Hacienda Nido de Águilas
      [11.0580, -63.8950], // NE — inicio Tacarigüita
      [11.0540, -63.8895], // E  — La Poza de Cayito / La Grea
      [11.0495, -63.8865], // E  — Capilla Dulce Corazón de María
      [11.0470, -63.8900], // SE — Cachapera de Peter
      [11.0415, -63.8955], // SE — vía El Portachuelo Sur
      [11.0360, -63.9010], // S  — La Palma Real
      [11.0295, -63.9080], // SO — La Huerta de Elicio
      [11.0390, -63.9140], // O  — límite suroeste San Sebastián
      [11.0470, -63.9145], // O  — borde Campo Santo San Sebastián
      [11.0545, -63.9155], // NO — Cerro Pelón
    ];

    const polygon = L.polygon(bounds, {
      color: '#ef4444',
      fillColor: '#fca5a5',
      fillOpacity: 0.08,
      weight: 2.5,
      dashArray: '6, 5',
    }).addTo(this.map);

    polygon.bindTooltip(
      '<b>Tacarigua — Parroquia Guevara</b><br><small>Tacarigüita · Corazón de Jesús · Los Andes · El Manantial · San Sebastián</small>',
      { permanent: false, direction: 'center' }
    );
  }

  // ── Markers ────────────────────────────────────────────
  populateMarkers() {
    tacariguaPlaces.forEach(place => {
      const { lat, lng } = place.geometry.location;
      const category = place.category || 'default';
      const icon = icons[category] || icons.default;

      const marker = L.marker([lat, lng], { icon });

      const catMeta = CATEGORIES.find(c => c.name === category);
      const emoji = catMeta ? catMeta.emoji : '📍';
      const color = catMeta ? catMeta.color : '#6b7280';

      const popupContent = `
        <div class="custom-popup">
          <div class="popup-header" style="border-left: 4px solid ${color}">
            <span class="popup-emoji">${emoji}</span>
            <h3>${place.name}</h3>
          </div>
          <span class="badge" style="background:${color}20; color:${color}; border:1px solid ${color}40">
            ${category}
          </span>
          <p class="vicinity">📍 ${place.vicinity}</p>
          <p class="summary">${place.editorial_summary}</p>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280 });

      marker.on('click', () => {
        this.map.flyTo([lat, lng], 17, { animate: true, duration: 1.2 });
      });

      if (this.layers[category]) {
        this.layers[category].addLayer(marker);
      }
    });
  }

  // ── Geolocation Control ────────────────────────────────
  addGeolocationControl() {
    const geoControl = L.control({ position: 'bottomleft' });
    geoControl.onAdd = () => {
      const btn = L.DomUtil.create('button', 'geo-locate-btn');
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
          <circle cx="12" cy="12" r="8" stroke-dasharray="2 3"/>
        </svg>
        <span>Mi ubicación</span>
      `;
      btn.title = 'Ver mi ubicación en el mapa';
      L.DomEvent.disableClickPropagation(btn);
      L.DomEvent.on(btn, 'click', () => this._locateUser(btn));
      return btn;
    };
    geoControl.addTo(this.map);
  }

  _locateUser(btn) {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización.');
      return;
    }
    btn.classList.add('loading');
    btn.querySelector('span').textContent = 'Localizando...';
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng, accuracy } = pos.coords;

        // Remove old markers
        if (this.locationMarker) this.map.removeLayer(this.locationMarker);
        if (this.locationCircle) this.map.removeLayer(this.locationCircle);

        // Accuracy circle
        this.locationCircle = L.circle([lat, lng], {
          radius: accuracy,
          color: '#3b82f6',
          fillColor: '#93c5fd',
          fillOpacity: 0.2,
          weight: 1.5,
        }).addTo(this.map);

        // Pulsing "you are here" marker
        const youAreHereIcon = L.divIcon({
          className: '',
          html: `<div class="you-are-here"><div class="you-are-here-dot"></div></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
        this.locationMarker = L.marker([lat, lng], { icon: youAreHereIcon })
          .addTo(this.map)
          .bindPopup(`<b>📍 Estás aquí</b><br><small>Precisión: ±${Math.round(accuracy)} m</small>`);

        this.map.flyTo([lat, lng], 16, { animate: true, duration: 1.5 });
        this.locationMarker.openPopup();

        btn.classList.remove('loading');
        btn.classList.add('active');
        btn.querySelector('span').textContent = 'Mi ubicación';
      },
      (err) => {
        btn.classList.remove('loading');
        btn.querySelector('span').textContent = 'Mi ubicación';
        alert(`No se pudo obtener tu ubicación: ${err.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  // ── Legend ─────────────────────────────────────────────
  addLegend() {
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      const rows = CATEGORIES.map(
        ({ name, color, emoji }) =>
          `<div class="legend-item">
            <span class="legend-dot" style="background:${color}"></span>
            <span class="legend-emoji">${emoji}</span>
            ${name}
          </div>`
      ).join('');
      div.innerHTML = `<h4 style="margin:0 0 8px;font-size:13px;color:#1d3557">Categorías</h4>${rows}`;
      return div;
    };
    legend.addTo(this.map);
  }

  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
