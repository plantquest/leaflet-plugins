import { DataLoader } from '@plantquest/data-loader';

const map = L.map('map').setView([51.505, -0.09], 13);
const dataLoader = new DataLoader({
  query: {
    project_id: 'project_id',
    plant_id: 'plant_id',
    stage: 'stage'
  },
  senecaPostFunction: SenecaPostFunction, // TODO: SENECA INTEGGRATION
  entityNames: ['building', 'level', 'room', 'geofence', 'asset']
});

dataLoader.addTo(map);

// Load data
dataLoader.loadData().then(data => {
  console.log('Loaded data:', data);
});
