import { DataLoader } from '@plantquest/data-loader';
// importing seneca for testing, as we have to receive/passthrough seneca instance
import Seneca from 'seneca-browser'


const map = L.map('map').setView([51.505, -0.09], 13);
const dataLoader = new DataLoader({
  query: {
    project_id: 'project_id',
    plant_id: 'plant_id',
    stage: 'stage'
  },
  seneca: Seneca, // TODO: SENECA INTEGGRATION - Testing
  entityNames: ['building', 'level', 'room', 'geofence', 'asset']
});

dataLoader.addTo(map);

// Load data
dataLoader.loadData().then(data => {
  console.log('Loaded data:', data);
});
