import L from 'leaflet'
import './geofence-display.css'

const PlantquestGeofenceDisplay = L.Control.extend({
  options: {},

  initialize: function (this: any, options: any) {
    console.log('PGeoD init')
    this._state = {}
    L.Util.setOptions(this, options)
  },

  onAdd: function (this: any, _map: any) {
    console.log('PGeoD onAdd', this.options)
    let div = L.DomUtil.create('div')

    // let geo = new Geofence(null, null)
    // console.log('geo:', geo)

    self.data.geofence = ['mock-data-1', 'mock-data-2', 'mock-data-3']

    self.data.geofence.forEach((ent) => {
      let geofence = new Geofence(ent, ctx)
      self.geofence.map[ent.id] =
        self.config.geofence.prepare(geofence) || geofence
    })

    //

    loadData()

    // GeofencePane related code
    _map.createPane('geofence')
    let geofencePane = _map.getPane('geofence')
    geofencePane.style.zIndex = 230
    geofencePane.style.pointerEvents = 'none'

    _map.createPane('geofenceLabel')
    let geofenceLabelPane = _map.getPane('geofenceLabel')
    geofenceLabelPane.style.zIndex = 235
    geofenceLabelPane.style.pointerEvents = 'none'

    self.layer.geofence = L.layerGroup(null, { pane: 'geofence' }).addTo(_map)
    self.layer.geofence.name$ = 'geofence'

    //

    self.showGeofence = function (geofence, show) {
      if (null == geofence) {
        return
      }

      show = !!show

      if (true === show) {
        geofence.show(self.layer.geofence)
      } else if (false === show) {
        geofence.hide()
      }
    }

    self.clearGeofences = function () {
      for (let geofenceID in self.geofence.map) {
        let geofence = self.geofence.map[geofenceID]
        delete self.geofence.map[geofenceID]
        if (geofence && geofence.hide) {
          geofence.hide()
        }
      }
    }

    //

    if (self.config.geofence.show.all) {
      self.send({
        srv: 'plantquest',
        part: 'assetmap',
        show: 'geofence',
        geofence: null,
      })
    }

    //
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
