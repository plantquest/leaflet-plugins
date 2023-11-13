import L from 'leaflet'
// import Gubu from 'gubu'
import './geofence-display.css'
import { RasterCoords } from './rastercoords'

// TODO: implement Gubu with interfaces
interface Geofence {
  id: string
  title: string
  latlngs: Array<Array<string>>
  colour: string
}

interface PlantquestGeofenceDisplayOptions extends L.ControlOptions {
  debug: boolean
  geofences: Geofence[]
}

const PlantquestGeofenceDisplay = L.Layer.extend({
  // Use GUBU for options validation
  initialize: function (this: any, options: any) {
    let validatedOptions = options as PlantquestGeofenceDisplayOptions
    validatedOptions.debug &&
      console.log('GeofenceDisplay init function called.')
    L.Util.setOptions(this, options)
    this._state = {
      zindex: 0,
      geofenceByID: {},
    }
  },

  onAdd: function (this: any, _map: any) {
    let self = this
    self.options.debug && console.log('GeofenceDisplay onAdd function called.')
    self.options.debug &&
      console.log(
        'Local geofence variable before add:',
        self._state.geofenceByID
      )
    self.options.geofences.forEach((fence: any) => {
      let geo = self.options.geofences[fence]
      let geofence = new Geofence(geo, { map: _map })
      self._state.geofenceByID[geo.id] = geofence
      geofence.show()
    })
    self.options.debug &&
      console.log(
        'Local geofence variable after add:',
        self._state.geofenceByID
      )
  },

  onRemove: function (this: any, _map: any) {
    let self = this
    self.options.debug &&
      console.log('GeofenceDisplay onRemove function called.')
    self.options.debug &&
      console.log(
        'Local geofence variable before remove:',
        self._state.geofenceByID
      )
    for (let id in self._state.geofenceByID) {
      self._state.geofenceByID[id].hide()
      delete self._state.geofenceByID[id]
    }
    self.options.debug &&
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

  show() {
    let self = this
    if (null == self.poly) {
      let polyCoords = self.ent.latlngs
      self.poly = L.polygon(polyCoords, {
        color: self.ent.colour,
      })
    }
    self.poly.addTo(self.ctx.map)
  }

  hide() {
    let self = this
    self.poly && self.poly.remove()
  }

  //   convertPoly(img: any, poly: any) {
  //     // Quote from docs: 'unproject `coords` to the raster coordinates used by the raster image projection'
  //     let p = []
  //     let rc = new RasterCoords(self.map, self.config.mapImg)
  //     for (let part of poly) {
  //       p.push(rc.unproject([part[1], part[0]]))
  //     }
  //     return p
  //   }
}

export { PlantquestGeofenceDisplay }
