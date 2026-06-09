import { tacariguaPlaces } from './src/components/Map/geoData.js';

console.log("Checking places count:", tacariguaPlaces.length);
tacariguaPlaces.forEach((place, index) => {
  if (!place.name) {
    console.error(`Index ${index} is missing name`);
  }
  if (!place.geometry || !place.geometry.location || typeof place.geometry.location.lat !== 'number' || typeof place.geometry.location.lng !== 'number') {
    console.error(`Index ${index} (${place.name || 'Unnamed'}) has invalid geometry:`, place.geometry);
  }
  if (!place.category) {
    console.error(`Index ${index} (${place.name}) is missing category`);
  }
});
console.log("Validation complete!");
