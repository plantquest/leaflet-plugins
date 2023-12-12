import L from 'leaflet'
import { Gubu } from 'gubu'
import { RasterCoords } from './rastercoords'
import './building-display.css'

// TODO: implement Gubu with interfaces
interface BuildingDef {
  id: string
  name: string
  poly: Array<Array<string>>
  config: Object
}

// TODO bug: Gubu not catching mismatch in options argument
interface PlantquestBuildingDisplayOptions extends L.ControlOptions {
  debug: boolean
  buildings: BuildingDef[]
}

const PlantquestBuildingDisplay = L.Layer.extend({
  initialize: function (
    this: any,
    rawOptions: PlantquestBuildingDisplayOptions
  ) {
    const PlantquestBuildingDisplayOptionsShape = Gubu({})
    let options = PlantquestBuildingDisplayOptionsShape(rawOptions)
    options.debug && console.log('BuildingDisplay init function called.')

    L.Util.setOptions(this, options)
    this._state = {
      zindex: 0,
      buildingByID: {},
    }
  },

  onAdd: function (this: any, _map: any) {
    let self = this
    self.options.debug && console.log('BuildingDisplay onAdd function called.')
    self.options.debug &&
      console.log(
        'Local building variable before add:',
        self._state.buildingByID
      )

    self.options.buildings.forEach((bui: any) => {
      let building = new Building(bui, {
        map: _map,
        cfg: self.options.pqam.config,
        pqam: self.options.pqam,
      })
      self._state.buildingByID[bui.id] = building
      self.showBuilding(building, true)
    })

    self.options.debug &&
      console.log(
        'Local building variable after add:',
        self._state.buildingByID
      )

    console.log('map:', _map)
  },

  onRemove: function (this: any, _map: any) {
    let self = this
    self.options.debug &&
      console.log('BuildingDisplay onRemove function called.')
    self.options.debug &&
      console.log(
        'Local building variable before remove:',
        self._state.buildingByID
      )

    self.clearBuildings()

    self.options.debug &&
      console.log(
        'Local building variable after remove:',
        self._state.buildingByID
      )
  },

  showBuilding: function (building: Building, show: boolean) {
    if (null == building) {
      return
    }
    show = !!show
    if (true === show) {
      building.show()
    } else if (false === show) {
      building.hide()
    }
  },

  clearBuildings: function () {
    let self = this
    for (let buildingID in self._state.buildingByID) {
      let building = self._state.buildingByID[buildingID]
      delete self._state.buildingByID[buildingID]
      if (building && building.hide) {
        building.hide()
      }
    }
  },

  resetDemoSelect: function (_map: any) {
    _map.setView([50.154377, 2154.375], 1.7)
  },
})

class Building {
  ent: any = null
  ctx: any = null
  poly: ReturnType<typeof L.polygon>
  cfgbuilding: any = null
  label: any = null

  constructor(ent: any, ctx: any) {
    this.ent = ent
    this.ctx = ctx
    this.cfgbuilding = ctx.cfg.building
    this.poly = L.polygon(ent.poly, {
      pane: 'building',
      color: this.cfgbuilding.color,
    })
  }

  show() {
    let self = this

    if (self.cfgbuilding.click.active) {
      self.poly.on('click', self.onClick.bind(self))
    }

    self.poly.addTo(self.ctx.map)
  }

  hide() {
    let self = this
    self.poly && self.poly.remove()
  }

  focus(building: any) {
    // BUG TODO: Zoom defaults to buildingC regardless of click unless buildings are added and removed first
    // Called by select()
    let self = this
    if (null == building) return

    let pqam = self.ctx.pqam

    // let buildinglatlng = [0, 0]
    // for (let point of building.poly) {
    //   if (point[0] > buildinglatlng[0]) {
    //     buildinglatlng[0] = point[0]
    //     buildinglatlng[1] = point[1]
    //   }
    // }

    // let buildingpos_y = self.convert_poly_y(pqam.config.mapImg, buildinglatlng[0])
    // let buildingpos_x = buildinglatlng[1]
    // let buildingpos = self.c_asset_coords(buildingpos_y, buildingpos_x - 30)
    let buildingpos = self.poly.getCenter()

    // self.ctx.map.setView(buildingpos, pqam.config.mapBuildingFocusZoom)
    self.ctx.map.flyTo(buildingpos, pqam.config.mapBuildingFocusZoom)

    // Originally returns buildinglatlng
    return buildingpos
  }

  select(buildingId: any, opts?: any) {
    // Called by onClick()
    let self = this
    opts = opts || {}

    let pqam = self.ctx.pqam

    // Building is a Building obj
    let building = pqam.data.buildingMap[buildingId]
    // isChosen is a boolean
    // building.poly originally building.building
    let isChosen =
      pqam.loc.chosen.building && buildingId === pqam.loc.chosen.building.poly

    // Focus on chosen building and return if isChosen is truthy OR if no data
    if (null == pqam.data.buildingMap[buildingId] || isChosen) {
      self.focus(pqam.loc.chosen.building)
      return
    }
    // Proceeding given that either no building chosen yet or there is data in buildingMap

    // loc.poly is set in pqam self.checkBuildings()
    // checkBuildings() only called in setInterval() method if self.config.building?.outline?.active is truthy
    // Has a tooltip bound to it (building name)
    if (pqam.loc.poly) {
      // Polygon remove() method does NOT have arguments
      pqam.loc.poly.remove(pqam.layer.building)
      pqam.loc.poly = null
    }

    // Resets loc.building to null regardless of if value exists already or not
    pqam.loc.building = null

    // If chosen.poly is truthy AND building does not match chosen building (which could be null at this point)
    if (pqam.loc.chosen.poly && building !== pqam.loc.chosen.building) {
      // Polygon remove() method does NOT have arguments
      pqam.loc.chosen.poly.remove(pqam.layer.building)
      pqam.loc.chosen.poly = null
    }

    // Just remove popup from loc obj
    if (pqam.loc.popup) {
      // Popup remove() method does NOT have arguments
      pqam.loc.popup.remove(pqam.map)
      pqam.loc.popop = null
    }

    // Finally assigning chosen building
    pqam.loc.chosen.building = building

    // Leaving commented until building coords need converting
    // let building_poly = self.convertBuildingPoly(pqam.config.mapImg, building.poly)

    // 'building' originally 'building_poly'
    // Should be building or self.poly?
    // Creating building polygon, assigning to chosen.poly
    pqam.loc.chosen.poly = L.polygon(building, {
      pane: 'building',
      color: pqam.config.building.color,
    })

    // Recursion?
    // Originally self.select(building.building)
    // Should poly be called building?
    pqam.loc.chosen.poly.on('click', () => self.select(building.poly))

    // Originally .addTo(pqam.layer.building)
    // Only one layer (the map) in this current setup
    pqam.loc.chosen.poly.addTo(self.ctx.map)

    // let buildinglatlng: any = self.focus(building)
    let buildingpos: any = self.focus(building)

    // convert for popup
    // let buildingpos_y = self.convert_poly_y(pqam.config.mapImg, buildinglatlng[0])
    // let buildingpos_x = buildinglatlng[1]
    // let buildingpos = self.c_asset_coords(buildingpos_y - 4, buildingpos_x + 5)

    // map focus on building selection
    // Set popup location to building centre
    // Set popup content to loc.chosen.building details
    pqam.loc.popup = L.popup({
      autoClose: false,
      closeOnClick: false,
    })
      .setLatLng(buildingpos)
      .setContent(self.buildingPopup(pqam.loc.chosen.building))
      .openOn(self.ctx.map)
  }

  // NOTE: Removed temporarily as part of ongoing development
  // Originally took layer as param
  // onZoom(zoom: any, mapID: any) {
  //   // Called by zoomEndRender() [temp]
  //   // which is called by PQAM map instance and focus()?
  //   let self = this
  //   let mapMatch = 1 + parseInt(mapID) == parseInt(self.ent.map)
  //   let showBuildingLabel = 1 === parseInt(self.ent.showlabel)

  //   let showNameZoom =
  //     null == self.cfgbuilding.label.zoom
  //       ? self.ctx.cfg.mapMaxZoom
  //       : self.cfgbuilding.label.zoom

  //   let showLabel = showNameZoom <= zoom && mapMatch && showBuildingLabel

  //   let shown = false

  //   if (showLabel) {
  //     if (null == self.label && self.ent.poly) {
  //       self.label = L.polygon(
  //         self.convertBuildingPoly(self.ctx.cfg.mapImg, self.ent.poly),
  //         {
  //           color: 'transparent',
  //           pane: 'buildingLabel',
  //           interactive: false,
  //         }
  //       )

  //       self.label.name$ = 'BUILDING:' + self.ent.name

  //       let tooltip = L.tooltip({
  //         permanent: true,
  //         direction: 'center',
  //         opacity: 1,
  //         className: 'polygon-labels',
  //       })

  //       tooltip.setContent(
  //         '<div class="' +
  //           'xleaflet-zoom-animated ' +
  //           'plantquest-building-label ' +
  //           `">${self.ent.name}</div>`
  //       )

  //       self.label.bindTooltip(tooltip)
  //     }

  //     if (self.ctx.map) {
  //       self.label.addTo(self.ctx.map)
  //       shown = true
  //     }
  //   } else {
  //     if (null != self.label) {
  //       self.label.remove()
  //     }
  //   }
  //   return shown
  // }

  onClick(event: any) {
    // BUG TODO: Zoom and tooltip defaults to C regardless of click unless buildings are added and removed first
    let self = this
    console.log('onClick', event)
    // self.demoSelect()
    // self.ent.id = 'buildingA' etc
    self.select(self.ent.id)
  }

  demoSelect() {
    let self = this
    let buildingCenter = self.poly.getCenter()
    self.ctx.map.flyTo(
      buildingCenter,
      self.ctx.pqam.config.mapBuildingFocusZoom
    )

    let tooltip = L.tooltip({
      permanent: true,
      direction: 'center',
      opacity: 1,
      className: 'polygon-labels',
    })

    self.poly.bindTooltip(tooltip)

    tooltip.setContent(
      '<div class="' +
        'xleaflet-zoom-animated ' +
        'plantquest-building-label ' +
        `">${self.ent.name}</div>`
    )
  }

  // Utility functions here for dev

  buildingPopup = function (building: any) {
    let html = []

    // Originally building.building
    html.push('<h2 class="plantquest-building-popup">', building.poly, '</h2>')

    return html.join('\n')
  }

  convert_poly_y(img: any, y: any) {
    let self = this
    self.ent.debug && console.log('Utility function convert_poly_y called.')

    return img[1] - y
  }

  c_asset_coords(x: any, y: any) {
    let self = this
    self.ent.debug && console.log('Utility function c_asset_coords called.')

    let rc = new RasterCoords({
      map: self.ctx.map,
      imgsize: self.ctx.pqam.config.mapImg,
    })
    return rc.unproject([x, y])
  }

  convertBuildingPoly(img: any, poly: any) {
    let self = this
    self.ent.debug &&
      console.log('Utility function convertBuildingPoly called.')

    let p = []
    let rc = new RasterCoords({
      map: self.ctx.map,
      imgsize: self.ctx.pqam.config.mapImg,
    })
    for (let part of poly) {
      p.push(rc.unproject([part[1], img[1] - part[0]]))
    }
    return p
  }
}

export { PlantquestBuildingDisplay }
