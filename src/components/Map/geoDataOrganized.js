import { tacariguaPlaces } from './geoData';

// Agrupa los lugares por categoría para un acceso más conveniente
export const placesByCategory = tacariguaPlaces.reduce((acc, place) => {
  const category = place.category || 'default';
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(place);
  return acc;
}, {});

// Exporta una lista de todas las categorías presentes
export const allCategories = Object.keys(placesByCategory);

// Opcional: exporta la lista plana (manteniendo compatibilidad)
export { tacariguaPlaces };
