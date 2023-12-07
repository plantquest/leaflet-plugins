import L from 'leaflet'
import { Gubu } from 'gubu'
import { RasterCoords } from './rastercoords'
import './room-display.css'

// TODO: implement Gubu with interfaces
interface RoomDef {
  id: string
  name: string
  poly: Array<Array<string>>
  config: Object
}

// TODO bug: Gubu not catching mismatch in options argument
interface PlantquestRoomDisplayOptions extends L.ControlOptions {
  debug: boolean
  rooms: RoomDef[]
}

const PlantquestRoomDisplay = L.Layer.extend({
  initialize: function (this: any, rawOptions: PlantquestRoomDisplayOptions) {
    const PlantquestRoomDisplayOptionsShape = Gubu({})
    let options = PlantquestRoomDisplayOptionsShape(rawOptions)
    options.debug && console.log('RoomDisplay init function called.')

    L.Util.setOptions(this, options)
    this._state = {
      zindex: 0,
      roomByID: {},
    }
  },

  onAdd: function (this: any, _map: any) {
    let self = this
    self.options.debug && console.log('RoomDisplay onAdd function called.')
    self.options.debug &&
      console.log('Local room variable before add:', self._state.roomByID)

    self.options.rooms.forEach((roo: any) => {
      let room = new Room(roo, {
        map: _map,
        cfg: self.options.pqam.config,
        pqam: self.options.pqam,
      })
      self._state.roomByID[roo.id] = room
      self.showRoom(room, true)
    })

    self.options.debug &&
      console.log('Local room variable after add:', self._state.roomByID)

    console.log('map:', _map)
  },

  onRemove: function (this: any, _map: any) {
    let self = this
    self.options.debug && console.log('RoomDisplay onRemove function called.')
    self.options.debug &&
      console.log('Local room variable before remove:', self._state.roomByID)

    self.clearRooms()

    self.options.debug &&
      console.log('Local room variable after remove:', self._state.roomByID)
  },

  showRoom: function (room: Room, show: boolean) {
    if (null == room) {
      return
    }
    show = !!show
    if (true === show) {
      room.show()
    } else if (false === show) {
      room.hide()
    }
  },

  clearRooms: function () {
    let self = this
    for (let roomID in self._state.roomByID) {
      let room = self._state.roomByID[roomID]
      delete self._state.roomByID[roomID]
      if (room && room.hide) {
        room.hide()
      }
    }
  },

  resetDemoSelect: function (_map: any) {
    _map.setView([50.154377, 2154.375], 1.7)
  },
})

class Room {
  ent: any = null
  ctx: any = null
  poly: ReturnType<typeof L.polygon>
  cfgroom: any = null
  label: any = null

  constructor(ent: any, ctx: any) {
    this.ent = ent
    this.ctx = ctx
    this.cfgroom = ctx.cfg.room
    this.poly = L.polygon(ent.poly, {
      pane: 'room',
      color: this.cfgroom.color,
    })
  }

  show() {
    let self = this

    if (self.cfgroom.click.active) {
      self.poly.on('click', self.onClick.bind(self))
    }

    self.poly.addTo(self.ctx.map)
  }

  hide() {
    let self = this
    self.poly && self.poly.remove()
  }

  focus(room: any) {
    // Called by select()
    let self = this
    if (null == room) return

    let pqam = self.ctx.pqam

    // let roomlatlng = [0, 0]
    // for (let point of room.poly) {
    //   if (point[0] > roomlatlng[0]) {
    //     roomlatlng[0] = point[0]
    //     roomlatlng[1] = point[1]
    //   }
    // }

    // let roompos_y = self.convert_poly_y(pqam.config.mapImg, roomlatlng[0])
    // let roompos_x = roomlatlng[1]
    // let roompos = self.c_asset_coords(roompos_y, roompos_x - 30)
    let roompos = room.poly.getCenter()

    // self.ctx.map.setView(roompos, pqam.config.mapRoomFocusZoom)
    self.ctx.map.setView(roompos, pqam.config.mapRoomFocusZoom)

    // return roomlatlng
  }

  select(roomId: any, opts?: any) {
    // Called by onClick()
    let self = this
    opts = opts || {}

    let pqam = self.ctx.pqam

    // Data to be moved from rooms to pqam.data
    let room = pqam.data.roomMap[roomId]
    let isChosen = pqam.loc.chosen.room && roomId === pqam.loc.chosen.room.room

    if (null == pqam.data.roomMap[roomId] || isChosen) {
      self.focus(pqam.loc.chosen.room)
      return
    }

    if (pqam.loc.poly) {
      pqam.loc.poly.remove(pqam.layer.room)
      pqam.loc.poly = null
    }
    pqam.loc.room = null

    if (pqam.loc.chosen.poly && room !== pqam.loc.chosen.room) {
      pqam.loc.chosen.poly.remove(pqam.layer.room)
      pqam.loc.chosen.poly = null
    }

    if (pqam.loc.popup) {
      pqam.loc.popup.remove(pqam.map)
      pqam.loc.popop = null
    }

    pqam.loc.chosen.room = room

    let room_poly = self.convertRoomPoly(pqam.config.mapImg, room.poly)

    pqam.loc.chosen.poly = L.polygon(room_poly, {
      pane: 'room',
      color: pqam.config.room.color,
    })

    // Recursion?
    pqam.loc.chosen.poly.on('click', () => self.select(room.room))

    pqam.loc.chosen.poly.addTo(pqam.layer.room)

    let roomlatlng: any = self.focus(room)

    // convert for popup
    let roompos_y = self.convert_poly_y(pqam.config.mapImg, roomlatlng[0])
    let roompos_x = roomlatlng[1]
    let roompos = self.c_asset_coords(roompos_y - 4, roompos_x + 5)

    // map focus on room selection
    pqam.loc.popup = L.popup({
      autoClose: false,
      closeOnClick: false,
    })
      .setLatLng(roompos)
      .setContent(pqam.roomPopup(pqam.loc.chosen.room))
      .openOn(self.ctx.map)
  }

  // NOTE: Removed temporarily as part of ongoing development
  // Originally took layer as param
  // onZoom(zoom: any, mapID: any) {
  //   // Called by zoomEndRender() [temp]
  //   // which is called by PQAM map instance and focus()?
  //   let self = this
  //   let mapMatch = 1 + parseInt(mapID) == parseInt(self.ent.map)
  //   let showRoomLabel = 1 === parseInt(self.ent.showlabel)

  //   let showNameZoom =
  //     null == self.cfgroom.label.zoom
  //       ? self.ctx.cfg.mapMaxZoom
  //       : self.cfgroom.label.zoom

  //   let showLabel = showNameZoom <= zoom && mapMatch && showRoomLabel

  //   let shown = false

  //   if (showLabel) {
  //     if (null == self.label && self.ent.poly) {
  //       self.label = L.polygon(
  //         self.convertRoomPoly(self.ctx.cfg.mapImg, self.ent.poly),
  //         {
  //           color: 'transparent',
  //           pane: 'roomLabel',
  //           interactive: false,
  //         }
  //       )

  //       self.label.name$ = 'ROOM:' + self.ent.name

  //       let tooltip = L.tooltip({
  //         permanent: true,
  //         direction: 'center',
  //         opacity: 1,
  //         className: 'polygon-labels',
  //       })

  //       tooltip.setContent(
  //         '<div class="' +
  //           'xleaflet-zoom-animated ' +
  //           'plantquest-room-label ' +
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
    // BUG TODO: Zoom and tooltip defaults to C regardless of click unless rooms are added and removed first
    let self = this
    console.log('onClick', event)
    // self.demoSelect()
    // self.ent.id = 'roomA' etc
    self.select(self.ent.id)
  }

  demoSelect() {
    let self = this
    let roomCenter = self.poly.getCenter()
    self.ctx.map.flyTo(roomCenter, 4)

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
        'plantquest-room-label ' +
        `">${self.ent.name}</div>`
    )
  }

  // Utility functions here for dev

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

  convertRoomPoly(img: any, poly: any) {
    let self = this
    self.ent.debug && console.log('Utility function convertRoomPoly called.')

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

export { PlantquestRoomDisplay }
