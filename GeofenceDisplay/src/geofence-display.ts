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

    self.clearGeofences()

    //

    // Load entities.
    const entnames = ['building', 'level', 'room', 'geofence', 'asset']

    // Clear previous data.
    for (let kind of entnames) {
      self.data[kind] = self.data[kind] || []
      self.data[kind].length = 0
    }

    self.data.geofence.forEach((ent) => {
      let geofence = new Geofence(ent, ctx)
      self.geofence.map[ent.id] =
        self.config.geofence.prepare(geofence) || geofence
    })

    //

    loadData()

    //

    self.map.createPane('geofence')
    let geofencePane = self.map.getPane('geofence')
    geofencePane.style.zIndex = 230
    geofencePane.style.pointerEvents = 'none'

    self.map.createPane('geofenceLabel')
    let geofenceLabelPane = self.map.getPane('geofenceLabel')
    geofenceLabelPane.style.zIndex = 235
    geofenceLabelPane.style.pointerEvents = 'none'

    self.layer.geofence = L.layerGroup(null, { pane: 'geofence' }).addTo(
      self.map
    )
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

    let ents = ['asset', 'room', 'building', 'level', 'geofence']

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
