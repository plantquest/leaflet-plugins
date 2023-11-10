export {}

import L from 'leaflet'
import './geofence-display.css'
import './rastercoords.js'

const PlantquestGeofenceDisplay = L.Layer.extend({
  initialize: function (this: any, options: any) {
    console.log('GeofenceDisplay init function called.')
    L.Util.setOptions(this, options)
    this._state = {
      zindex: 0,
      geofenceByID: {},
    }
  },

  onAdd: function (this: any, _map: any) {
    console.log('GeofenceDisplay onAdd function called.')
    let self = this
    console.log('Local geofence variable before add:', self._state.geofenceByID)
    for (let geodata in self.options.geofences) {
      let geo = self.options.geofences[geodata]
      let geofence = new Geofence(geo, null)
      self._state.geofenceByID[geo.id] = geofence
      geofence.show(_map)
    }
    console.log('Local geofence variable after add:', self._state.geofenceByID)
  },

  onRemove: function (this: any, _map: any) {
    console.log('GeofenceDisplay onRemove function called.')
    let self = this
    console.log(
      'Local geofence variable before remove:',
      self._state.geofenceByID
    )
    for (let id in self._state.geofenceByID) {
      self._state.geofenceByID[id].hide()
      delete self._state.geofenceByID[id]
    }
    console.log(
      'Local geofence variable after remove:',
      self._state.geofenceByID
    )
  },
})

class Geofence {
  ent: any = null
  ctx: any = null
  poly: any = null

  constructor(ent: any, ctx: any) {
    this.ent = ent
    this.ctx = ctx
  }

  show(map: any) {
    if (null == this.poly) {
      let polyCoords = this.ent.latlngs
      this.poly = L.polygon(polyCoords, {
        color: this.ent.colour,
      })
    }
    this.poly.addTo(map)
  }

  hide() {
    console.log('Geofence class hide function called.')
    this.poly && this.poly.remove()
  }

  // convertPoly(img: any, poly: any) {
  //   // Quote from docs: 'unproject `coords` to the raster coordinates used by the raster image projection'
  //   let p = []
  //   let rc = new L.RasterCoords(self.map, self.config.mapImg)
  //   for (let part of poly) {
  //     p.push(rc.unproject([part[1], part[0]]))
  //   }
  //   return p
  // }
}

export { PlantquestGeofenceDisplay }
