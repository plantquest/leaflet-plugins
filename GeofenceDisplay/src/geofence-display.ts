export {}

import L from 'leaflet'
import './geofence-display.css'
import './rastercoords.js'

const PlantquestGeofenceDisplay = L.Layer.extend({
  initialize: function (this: any, options: any) {
    console.log('PGeoD init')
    L.Util.setOptions(this, options)
    this._state = {
      // geofenceLabelPane.style.zIndex = 235
      //
      // this._state.GeofenceByID <-- move below map to here
      // self.geofence.map[ent.id] = self.config.geofence.prepare(geofence) || geofence
      //
      zindex: 0,
      geofenceByID: {},
    }
    this._state.geofenceByID = options
  },

  onAdd: function (this: any, _map: any) {
    let self = this
    console.log('self:', self)

    console.log('PGeoD onAdd', this.options)
    // let div = L.DomUtil.create('div')

    let geo = new Geofence(self._state.geofenceByID.geo1, null)
    console.log('geo:', geo)

    let geofence = geo.show()

    return geofence

    // // TODO: Define format and value of mock geofence data in dev/main.js
    // self.data.geofence = ['mock-data-1', 'mock-data-2', 'mock-data-3']

    // // TODO: Extract geofence.prepare() function
    // self.data.geofence.forEach((ent) => {
    //   let geofence = new Geofence(ent, ctx)
    //   self.geofence.map[ent.id] =
    //     self.config.geofence.prepare(geofence) || geofence
    // })

    // // GeofencePane related code
    // // TODO: Tie in with existing setup
    // _map.createPane('geofence')
    // let geofencePane = _map.getPane('geofence')
    // geofencePane.style.zIndex = 230
    // geofencePane.style.pointerEvents = 'none'

    // _map.createPane('geofenceLabel')
    // let geofenceLabelPane = _map.getPane('geofenceLabel')
    // geofenceLabelPane.style.zIndex = 235
    // geofenceLabelPane.style.pointerEvents = 'none'

    // self.layer.geofence = L.layerGroup(null, { pane: 'geofence' }).addTo(_map)
    // self.layer.geofence.name$ = 'geofence'

    // //

    // // TODO: show/clear geofence functionality required here?
    // self.showGeofence = function (geofence, show) {
    //   if (null == geofence) {
    //     return
    //   }

    //   show = !!show

    //   if (true === show) {
    //     geofence.show(self.layer.geofence)
    //   } else if (false === show) {
    //     geofence.hide()
    //   }
    // }

    // self.clearGeofences = function () {
    //   for (let geofenceID in self.geofence.map) {
    //     let geofence = self.geofence.map[geofenceID]
    //     delete self.geofence.map[geofenceID]
    //     if (geofence && geofence.hide) {
    //       geofence.hide()
    //     }
    //   }
    // }

    // // TODO: add geofencePane to div
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

  show() {
    if (null == this.poly) {
      // let polyCoords = this.convertPoly(this.ctx.cfg.mapImg, this.ent.polygon)
      let polyCoords = this.ent.latlngs
      this.poly = L.polygon(polyCoords, {
        pane: 'geofence',
        // color: this.ctx.cfg.geofence.color,
        color: this.ent.colour,
      })
      // if (this.ctx.cfg.geofence.click.active) {
      //   this.poly.on('click', this.onClick.bind(this))
      // }
      // let tooltip = L.tooltip({
      //   pane: 'geofenceLabel',
      //   permanent: true,
      //   direction: 'center',
      //   opacity: 1,
      //   className: 'polygon-labels',
      // })
      // this.poly.bindTooltip(tooltip)
      // tooltip.setContent(
      //   '<div class="' +
      //     'leaflet-zoom-animated ' +
      //     'plantquest-geofence-label ' +
      //     `">${this.ent.title}</div>`
      // )
    }

    return this.poly
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
