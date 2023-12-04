import L from 'leaflet';
import 'leaflet.markercluster';

import './asset-display.css';

interface Asset {
  id: string;
  x: number;
  y: number;
  value: number;
}

interface AssetDisplayOptions extends L.ControlOptions {
  assets: Asset[];
}

interface CustomMarker extends L.Marker {
  assetValue?: number; // Extend the L.Marker to include the custom property
}

const PlantquestAssetDisplay = L.Control.extend({
  options: {} as AssetDisplayOptions,

  initialize: function (options: AssetDisplayOptions) {
    L.Util.setOptions(this, options);
  },

  onAdd: function (map: L.Map) {
    // Create a marker cluster group
    const markers = L.markerClusterGroup({
      iconCreateFunction: function(cluster) {
        const childMarkers = cluster.getAllChildMarkers() as CustomMarker[];
        let sum = 0;
        childMarkers.forEach(marker => {
          sum += marker.assetValue || 0;
        });
        return L.divIcon({
          html: `<div class="cluster-marker">${sum}</div>`,
          className: 'marker-cluster',
          iconSize: L.point(40, 40)
        });
      }
    });

    this.options.assets.forEach(asset => {
      console.log("Creating marker for asset:", asset); // Debug: Log each asset
    
      const marker = L.marker([asset.y, asset.x], {
        icon: L.divIcon({
          html: `<div class="asset-marker">${asset.value}</div>`,
          className: 'marker-asset',
          iconSize: L.point(60, 60) // Increased icon size
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
});

export { PlantquestAssetDisplay };
