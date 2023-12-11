import L from 'leaflet';
import 'leaflet.markercluster';

export interface Asset {
  id: string;
  x: number;
  y: number;
  value: number;
}

interface AssetDisplayOptions extends L.ControlOptions {
  assets: Asset[];
}

interface CustomMarker extends L.Marker {
  assetValue?: number;
}

export const PlantquestAssetDisplay = L.Control.extend({
  options: {} as AssetDisplayOptions,
  _map: null as L.Map | null,

  initialize: function (options: AssetDisplayOptions) {
    L.Util.setOptions(this, options);
  },

  onAdd: function (map: L.Map) {
    this._map = map;
    const clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 40, // Adjust this value as needed
      spiderfyOnMaxZoom: true,
      iconCreateFunction: function(cluster) {
        console.log("Cluster being created with markers:", cluster.getAllChildMarkers());
        const childMarkers = cluster.getAllChildMarkers() as CustomMarker[];
        let sum = 0;
        childMarkers.forEach(marker => {
          sum += marker.assetValue || 0;
        });

        const clusterColor = sum > 10 ? 'yellow' : 'lightgreen';
        return L.divIcon({
          html: `<div class="cluster-marker" style="background-color: ${clusterColor};">${sum}</div>`,
          className: 'marker-cluster',
          iconSize: L.point(40, 40)
        });
      }
    });

    console.log('this.options', this.options)
    this.options.assets.forEach(asset => {
      if (typeof asset.x === 'number' && typeof asset.y === 'number') {
        const marker = L.marker([asset.y, asset.x], {
          icon: L.divIcon({
            html: `<div class="asset-marker">${asset.value}</div>`,
            className: 'marker-asset',
            iconSize: L.point(30, 30)
          })
        }) as CustomMarker;
        marker.assetValue = asset.value;
        console.log('marker', marker);
        clusterGroup.addLayer(marker);
      } else {
        console.error('Invalid asset coordinates:', asset);
      }
    });

    map.addLayer(clusterGroup);
    return L.DomUtil.create('div', 'asset-display-container');
  },

  onRemove: function (_map: L.Map) {
    // Clean up if needed
  }
});
