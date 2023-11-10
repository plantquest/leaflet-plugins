export {}

import L from 'leaflet'
import './geofence-display.css'
import './rastercoords.js'

const PlantquestGeofenceDisplay = L.Layer.extend({
  initialize: function (this: any, options: any) {
    console.log('PGeoD init')
    L.Util.setOptions(this, options)
    this._state = {
      zindex: 0,
      geofenceByID: {},
    }
    this._state.geofenceByID = options
  },

  onAdd: function (this: any, _map: any) {
    let self = this
    let geo = new Geofence(self._state.geofenceByID.geo1, null)
    geo.show(_map)
  },

  onRemove: function (this: any, _map: any) {
    console.log('PGeoD onRemove')
  },

  clear: function (this: any) {
    console.log('PGeoD clear')
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
    // this.poly && this.poly.remove()
  }

  onClick(event: any) {
    console.log('Click!:', event)
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
