import L from 'leaflet';
import './data-loader.css';

interface DataLoaderOptions extends L.ControlOptions {
  // TODO: Get the real list of options from Seneca
  query: any; // Define the structure of your query object
  senecaPostFunction: Function; // Function to handle POST requests
  entityNames: string[]; // List of entities to load
  config: any; // Additional configuration if needed
}

interface DataLoaderData {
  [key: string]: any[]; // Replace `any[]` with more specific types if available
}


const DataLoader = L.Control.extend({
  options: {
    position: 'topright',
    entityNames: ['building', 'level', 'room', 'geofence', 'asset'], // Default entities
  } as DataLoaderOptions,

  _data: {} as DataLoaderData,
  _isLoading: false,
  _isLoaded: false,

  initialize: function (options: DataLoaderOptions) {
    L.Util.setOptions(this, options);
    this._data = {};
  },

  loadData: async function () {
    if (this._isLoading) {
      await new Promise(r => setTimeout(r, 33));
    }

    if (this._isLoaded) {
      return this._data;
    }

    this._isLoading = true;
    let query = this.options.query;

    // Clear previous data
    this.options.entityNames.forEach(kind => {
      this._data[kind] = [];
    });

    // Load entities
    for (let kind of this.options.entityNames) {
      try {
        let res = await this.options.senecaPostFunction('srv:plantquest,part:assetmap', { list: kind, query });
        if (res && res.ok) {
          this._data[kind] = res.list;
        }
      } catch (e) {
        console.error('Error loading entity:', kind, e);
      }
    }


    // TODO: Add additional processing here if needed
    // ...

    this._isLoaded = true;
    this._isLoading = false;

    return this._data;
  },

  onAdd: function (_map: L.Map) {
    // Do we need to create the DataLoader's DOM element?
    // ...
    return L.DomUtil.create('div', 'data-loader-container');
  },

  onRemove: function (_map: L.Map) {
    // Clean up if needed
  },

  // TODO: Add additional methods
  // Additional methods...
});

export { DataLoader };
