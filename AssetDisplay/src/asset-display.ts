import L from 'leaflet';
import 'leaflet.markercluster';

import './asset-display.css';

interface Asset {
  id: string;
  x: number;
  y: number;
  value: number;
  color: string;
  borderColor: string;
}

interface AssetDisplayOptions extends L.ControlOptions {
  assets: Asset[];
}

interface CustomMarker extends L.Marker {
  assetValue?: number;
}

const PlantquestAssetDisplay = L.Control.extend({
  options: {} as AssetDisplayOptions,
  _map: null as L.Map | null,
  clusterLayer: null as L.MarkerClusterGroup | null,

  initialize: function (options: AssetDisplayOptions) {
    L.Util.setOptions(this, options);
    this.clusterLayer = L.markerClusterGroup(); 
  },

  onAdd: function (map: L.Map) {
    this._map = map;
    const markers = L.markerClusterGroup({
      maxClusterRadius: 10,
      iconCreateFunction: function(cluster) {
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

    this.options.assets.forEach(asset => {
      const marker = L.marker([asset.y, asset.x], {
        icon: L.divIcon({
          html: `<div class="asset-marker" style="background-color: ${asset.color}; border-color: ${asset.borderColor};">${asset.value}</div>`,
          className: 'marker-asset',
          iconSize: L.point(30, 30)
        })
      }) as CustomMarker;
      marker.assetValue = asset.value;
      markers.addLayer(marker);
    });

    map.addLayer(markers);
    return L.DomUtil.create('div', 'asset-display-container');
  },

  onRemove: function (_map: L.Map) {
    // Clean up if needed
  },
  getClusterLayer: function() {
    return this.clusterLayer;
  },
  hideClusters: function() {
    if (this._map && this.clusterLayer) {
      this._map.removeLayer(this.clusterLayer);
    }
  },

  showClusters: function() {
    if (this._map && this.clusterLayer) {
      this._map.addLayer(this.clusterLayer);
    }
  },
});

export { PlantquestAssetDisplay };
