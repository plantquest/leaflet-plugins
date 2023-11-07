import L from 'leaflet'
import './geofence-display.css'

const PlantquestGeofenceDisplay = L.Control.extend({
  options: {},

  initialize: function (this: any, options: any) {
    console.log('PGeoD init')
    this._state = {
      open: false,
      atype: {},
      roomattr: {},
      menuitems: [],
    }
    L.Util.setOptions(this, options)
  },

  onAdd: function (this: any, _map: any) {
    console.log('PGeoD onAdd', this.options)
    let div = L.DomUtil.create('div')

    let geo = new Geofence(null, null)
    console.log('geo:', geo)
    return div
  },

  onRemove: function (this: any, _map: any) {
    console.log('PGeoD onRemove')
  },

  clear: function (this: any) {
    console.log('PGeoD clear')
  },
})

class Geofence {
  ent = null
  ctx = null

  constructor(ent: any, ctx: any) {
    this.ent = ent
    this.ctx = ctx
  }
}

export { PlantquestGeofenceDisplay }
