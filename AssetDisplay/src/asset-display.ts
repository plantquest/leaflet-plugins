import Leaftlet from 'leaflet';
import 'leaflet.markercluster';

export class PlantquestAssetDisplay extends Leaftlet.Control {
  private map!: Leaftlet.Map;
  private clusterGroup!: Leaftlet.MarkerClusterGroup;
  private assets: any[];

  constructor(assets: any[]) {
      super();
      this.assets = assets;
      console.log('PlantquestAssetDisplay constructor', assets);
  }

  onAdd(map: Leaftlet.Map): HTMLElement {
      console.log('PlantquestAssetDisplay onAdd', map);
      this.map = map;
      this.initializeMap();
      return document.createElement('div');
  }

  private initializeMap(): void {
      this.clusterGroup = Leaftlet.markerClusterGroup({
          maxClusterRadius: 40,
          spiderfyOnMaxZoom: true,
          iconCreateFunction: (cluster) => {
              let sum = 0;
              cluster.getAllChildMarkers().forEach((marker: any) => {
                  sum += marker.options.value; // Accumulate the sum of the values
              });

              return Leaftlet.divIcon({
                  html: `<div class="cluster-marker">${sum}</div>`,
                  className: 'marker-cluster',
                  iconSize: Leaftlet.point(40, 40)
              });
          }
      });

      // Add assets as markers
        this.assets.forEach(asset => {
          const marker = Leaftlet.marker(Leaftlet.latLng(parseFloat(asset.y), parseFloat(asset.x)), {
            icon: Leaftlet.divIcon({
              html: `<div class="asset-marker">${asset.value}</div>`,
              className: 'marker-asset',
            }),
            value: asset.value  // Store the value in the marker options
          } as Leaftlet.MarkerOptions); // Add type assertion to specify 'value' property
          console.log("Adding marker at: ", asset.y, asset.x); // Log for debugging
          this.clusterGroup.addLayer(marker);
        });

        // Add the cluster group to the map
        this.map.addLayer(this.clusterGroup);
  }
}
