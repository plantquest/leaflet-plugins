import L from 'leaflet'
import { Gubu } from 'gubu'
import './geofence-display.css'
// import { RasterCoords } from './rastercoords'

// TODO: implement Gubu with interfaces
interface GeofenceDef {
  id: string
  title: string
  latlngs: Array<Array<string>>
  colour: string
}

interface PlantquestGeofenceDisplayOptions extends L.ControlOptions {
  debug: boolean
  geofences: GeofenceDef[]
}

const PlantquestGeofenceDisplay = L.Layer.extend({
  initialize: function (
    this: any,
    rawOptions: PlantquestGeofenceDisplayOptions
  ) {
    const PlantquestGeofenceDisplayOptionsShape = Gubu({})
    let options = PlantquestGeofenceDisplayOptionsShape(rawOptions)
    options.debug && console.log('GeofenceDisplay init function called.')

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

    self.options.geofences.forEach((geo: any) => {
      let geofence = new Geofence(geo, { map: _map })
      self._state.geofenceByID[geo.id] = geofence
      self.showGeofence(geofence, true)
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

    self.clearGeofences()

    self.options.debug &&
      console.log(
        'Local geofence variable after remove:',
        self._state.geofenceByID
      )
  },

  showGeofence: function (geofence: Geofence, show: boolean) {
    if (null == geofence) {
      return
    }
    show = !!show
    if (true === show) {
      geofence.show()
    } else if (false === show) {
      geofence.hide()
    }
  },

  clearGeofences: function () {
    let self = this
    for (let geofenceID in self._state.geofenceByID) {
      let geofence = self._state.geofenceByID[geofenceID]
      delete self._state.geofenceByID[geofenceID]
      if (geofence && geofence.hide) {
        geofence.hide()
      }
    }
  },
})

class Geofence {
  ent: any = null
  ctx: any = null
  poly: ReturnType<typeof L.polygon>

  constructor(ent: any, ctx: any) {
    this.ent = ent
    this.ctx = ctx
    this.poly = L.polygon(ent.latlngs, { color: ent.colour })
  }

  show() {
    let self = this
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
