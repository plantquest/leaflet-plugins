import L from 'leaflet'
import './asset-display.css'

interface Asset {
  id: string;
  name: string;
  xco: number;
  yco: number;
  atype: string;
}

interface AssetDisplayOptions extends L.ControlOptions {
  assets: Asset[];
}

const PlantquestAssetDisplay = L.Control.extend({
  //TODO: Check all possible options to pass in the constructor
  options: {} as AssetDisplayOptions,

  initialize: function (options: AssetDisplayOptions) {
    L.Util.setOptions(this, options);
  },

  onAdd: function (map: L.Map) {
    // Initial setup for mocked assets
    const container = L.DomUtil.create('div', 'asset-display-container');
    this.options.assets.forEach((asset: Asset) => {
      L.marker([asset.xco, asset.yco])
        .addTo(map)
        .bindPopup(`${asset.name} (${asset.atype})`);
    });
    return container;
  },

  onRemove: function (_map: L.Map) {
    // Clean up if needed
  },
});

export { PlantquestAssetDisplay };