import L from 'leaflet'
import './item-filter.css'

// To be verified.
interface PlantquestItemFilterOptions extends L.ControlOptions {
  debug?: boolean
}

const PlantquestItemFilter = L.Control.extend({
  options: {
    position: 'topright'
  } as PlantquestItemFilterOptions,

  // Initialize the properties of the class, including the custom ones.
  _map: null as L.Map | null,
  _container: null as HTMLElement | null,

  initialize: function (options: PlantquestItemFilterOptions) {
    this.options.debug && console.log(`Initializing ItemFilter with options: ${JSON.stringify(options)}`);

    L.Util.setOptions(this, options)
  },

  onAdd: function (map: L.Map) {
    const self = this
    self.options.debug && console.log(`Adding ItemFilter to map: ${map}`);

    self._map = map
    const container = L.DomUtil.create('div', 'item-filter-container')
    self._container = container
    L.DomEvent.disableClickPropagation(container)

    return container
  },

  show: function() {
    if (this._container) {
      this._container.style.display = '';
    }
  },

  // Method to hide the control
  hide: function() {
    if (this._container) {
      this._container.style.display = 'none';
    }
  },

  onRemove: function (_map: L.Map) {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
  },
  
})

export { PlantquestItemFilter }
