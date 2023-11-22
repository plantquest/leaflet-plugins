import L from 'leaflet';
import './data-loader.css';

interface DataLoaderOptions extends L.ControlOptions {
  query: any; // Define the structure of your query object
  senecaPostFunction: Function; // Function to handle POST requests
  entityNames: string[]; // List of entities to load
  config: any; // Additional configuration if needed
}

interface RoomTypeMap {
  [key: string]: number;
}

const DataLoader = L.Control.extend({
  options: {
    entityNames: ['building', 'level', 'room', 'geofence', 'asset'], // Default entities
  } as DataLoaderOptions,

  _data: {} as any,
  isLoading: false,
  _isLoaded: false,

  initialize: function (options: DataLoaderOptions) {
    L.Util.setOptions(this, options);
    this._data = {};
  },

  loadData: async function () {
    if (this.isLoading) {
      return this._data; // Return current data if already loading
    }

    if (this._isLoaded) {
      return this._data; // Return data if already loaded
    }

    this.isLoading = true;
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

    // Process loaded data
    let processedData = this.generate({
      assets: this._data.asset || [],
      rooms: this._data.room || [],
    });

    this._data = processedData;

    this._isLoaded = true;
    this.isLoading = false;

    return this._data;
  },

  generate: function (collection: { assets: any[], rooms: any[] }) {
    let ROOM_ATYPE: RoomTypeMap = { 'Room/Area': 1 };
    let deps: any = { cp: {}, pc: {} };
    let relate = [
      [
        { pc: true, p: 'room', c: 'asset', exclude: (asset: any) => ROOM_ATYPE[asset.atype] },
        { pc: true, p: 'map',c: 'building' },
        { pc: true, p: 'building', c: 'level' },
        { pc: true, p: 'building', c: 'map' },
        { pc: true, p: 'map~building', c: 'level' },
        { pc: true, p: 'map~building~level', c: 'room',include: (asset: any) => ROOM_ATYPE[asset.atype] },
        { pc: true, p: 'building~level', c: 'map' },
        { pc: true, p: 'map~level',c: 'level', include: (asset: any) => asset.map },
  
        { cp: true, p: 'map~building~level', c: 'room' },
        { cp: true, p: 'room', c: 'asset', exclude: (asset: any) => ROOM_ATYPE[asset.atype] },
      ]    
    ];

    let maps: any = [];
    let levels: any = [];
    let buildings = new Set();
    let assetMap = {};
    let roomMap = {};

    Object.values(collection).forEach((assets: any) => {
      assets.forEach((asset: any) => {
        // Process each asset based on ROOM_ATYPE and other criteria
        // ...

        if (null != asset.level && '' !== asset.level) {
          if (!levels.includes(asset.level)) {
            levels.push(asset.level);
          }
        }
        
        if (null != asset.building && '' !== asset.building) {
          buildings.add(asset.building);
        }

        if (null != asset.map && '' !== asset.map) {
          if (!maps.includes(asset.map)) {
            maps.push(asset.map);
          }
        }

        relate.forEach((r: any) => {
          if (r.cp && (!r.exclude || !r.exclude(asset)) && (!r.include || r.include(asset))) {
            let pv = this.make_parent_val(r, asset);
            deps.cp[r.c] = (deps.cp[r.c] || {});
            deps.cp[r.c][this.make_child_id(r, asset)] = pv;
          }

          if (r.pc && (!r.exclude || !r.exclude(asset)) && (!r.include || r.include(asset))) {
            let pk = this.make_parent_key(r, asset);
            deps.pc[r.p] = (deps.pc[r.p] || {});
            deps.pc[r.p][pk] = (deps.pc[r.p][pk] || {});
            deps.pc[r.p][pk][r.c] = (deps.pc[r.p][pk][r.c] || []);
            this.insert_child(deps.pc[r.p][pk][r.c], this.make_child_id(r, asset));
          }
        });
      });
    });

    return {
      deps,
      maps: Array.from(maps),
      levels,
      buildings: Array.from(buildings),
      assetMap,
      roomMap
    };
  },

  make_parent_key: function (relate: any, asset: any) {
    return relate.p.split(/~/g).map((pn: any) => asset[pn]).join('~');
  },

  make_parent_val: function (relate: any, asset: any) {
    return relate.p.split(/~/g).reduce(((a: any, pn: any) => (a[pn] = asset[pn], a)), {});
  },

  make_child_id: function (relate: any, asset: any) {
    return asset[relate.c];
  },

  insert_child: function (arr: any, child: any) {
    if (arr instanceof Array) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === child) {
          return;
        } else if (arr[i] > child) {
          arr.splice(i, 0, child);
          return;
        }
      }
      arr.push(child);
    } else if (arr instanceof Set) {
      arr.add(child);
    }
  },

  onAdd: function (_map: L.Map) {
    // TODO: Do we need to do anything here?
    // Like add a loading indicator?
  },

  onRemove: function (_map: L.Map) {
    // Clean up if needed
  },

});

export { DataLoader };
