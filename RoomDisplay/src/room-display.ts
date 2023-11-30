import L from 'leaflet'
import { Gubu } from 'gubu'
import { RasterCoords } from './rastercoords'
import './room-display.css'

// TODO: implement Gubu with interfaces
interface RoomDef {
  id: string
  title: string
  latlngs: Array<Array<string>>
  colour: string
}

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

    self.options.rooms.forEach((geo: any) => {
      let room = new Room(geo, {
        map: _map,
        cfg: { room: { click: { active: true } } },
      })
      self._state.roomByID[geo.id] = room
      self.showRoom(room, true)
    })

    self.options.debug &&
      console.log('Local room variable after add:', self._state.roomByID)
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
      room.show(null, null)
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
})

class Room {
  ent: any = null
  ctx: any = null
  poly: any = null
  cfgroom: any = null
  label: any = null

  constructor(ent: any, ctx: any) {
    this.ent = ent
    this.ctx = ctx
    this.cfgroom = ctx.cfg.room
  }

  show(layer: any, room_poly: any) {
    let self = this
    if (null == self.poly) {
      self.poly = L.polygon(room_poly, {
        pane: 'room',
        color: self.cfgroom.color,
      })

      if (self.cfgroom.click.active) {
        self.poly.on('click', self.onClick.bind(self))
      }
    }

    self.poly.addTo(layer)

    return self.poly
  }

  hide() {}

  focus(room: any) {
    let self = this
    if (null == room) return

    let pqam = self.ctx.pqam

    let roomlatlng = [0, 0]
    for (let point of room.poly) {
      if (point[0] > roomlatlng[0]) {
        roomlatlng[0] = point[0]
        roomlatlng[1] = point[1]
      }
    }

    // let roompos = [roomlatlng[0],roomlatlng[1]-30]

    let roompos_y = self.convert_poly_y(pqam.config.mapImg, roomlatlng[0])
    let roompos_x = roomlatlng[1]
    let roompos = self.c_asset_coords(roompos_y, roompos_x - 30)
    // pqam.map.setView(roompos, pqam.config.mapRoomFocusZoom)
    pqam.map.setView(roompos, pqam.config.mapRoomFocusZoom)

    // pqam.zoomEndRender()

    return roomlatlng
  }

  select(roomId: any, opts?: any) {
    let self = this
    opts = opts || {}

    let pqam = self.ctx.pqam

    try {
      let room = pqam.data.roomMap[roomId]
      let isChosen =
        pqam.loc.chosen.room && roomId === pqam.loc.chosen.room.room

      if (null == pqam.data.roomMap[roomId] || isChosen) {
        self.focus(pqam.loc.chosen.room)
        return
      }

      pqam.log('selectRoom', roomId, room)

      // let roomState =
      //   pqam.current.room[room.room] ||
      //   (pqam.current.room[room.room] = { alarm: 'neutral' })

      if (pqam.loc.poly) {
        pqam.loc.poly.remove(pqam.layer.room)
        pqam.loc.poly = null
      }
      pqam.loc.room = null

      if (pqam.loc.chosen.poly && room !== pqam.loc.chosen.room) {
        // let prevRoom = pqam.loc.chosen.room
        // let prevRoomState =
        //   pqam.current.room[prevRoom.room] ||
        //   (pqam.current.room[prevRoom.room] = { alarm: 'neutral' })

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
        .openOn(pqam.map)

      if (!opts.mute) {
        pqam.click({ select: 'room', room: pqam.loc.chosen.room.room })
      }
    } catch (e: any) {
      pqam.log('ERROR', 'selectRoom', '1010', roomId, e.message, e)
    }
  }

  onZoom(zoom: any, mapID: any, layer: any) {
    let self = this
    let mapMatch = 1 + parseInt(mapID) == parseInt(self.ent.map)
    let showRoomLabel = 1 === parseInt(self.ent.showlabel)

    let showNameZoom =
      null == self.cfgroom.label.zoom
        ? self.ctx.cfg.mapMaxZoom
        : self.cfgroom.label.zoom

    let showLabel = showNameZoom <= zoom && mapMatch && showRoomLabel

    let shown = false

    if (showLabel) {
      if (null == self.label && self.ent.poly) {
        self.label = L.polygon(
          self.convertRoomPoly(self.ctx.cfg.mapImg, self.ent.poly),
          {
            color: 'transparent',
            pane: 'roomLabel',
            interactive: false,
          }
        )

        self.label.name$ = 'ROOM:' + self.ent.name

        let tooltip = L.tooltip({
          permanent: true,
          direction: 'center',
          opacity: 1,
          className: 'polygon-labels',
        })

        tooltip.setContent(
          '<div class="' +
            'xleaflet-zoom-animated ' +
            'plantquest-room-label ' +
            `">${self.ent.name}</div>`
        )

        self.label.bindTooltip(tooltip)

        // let _c = poly.getBounds().getCenter()
      }

      if (layer) {
        self.label.addTo(layer)
        shown = true
      }
    } else {
      if (null != self.label) {
        self.label.remove()
      }
    }
    return shown
  }

  onClick(event: any) {
    let self = this
    console.log('onClick', event)
    self.select(self.ent.id)
  }

  // Utility functions here for dev

  convert_poly_y(img: any, y: any) {
    let self = this
    self.ctx.debug && console.log('Utility function convert_poly_y called.')

    return img[1] - y
  }

  c_asset_coords(x: any, y: any) {
    let self = this
    self.ctx.debug && console.log('Utility function c_asset_coords called.')

    let rc = new RasterCoords({ map: null, imgsize: null })
    return rc.unproject([x, y])
  }

  convertRoomPoly(img: any, poly: any) {
    let self = this
    self.ctx.debug && console.log('Utility function convertRoomPoly called.')

    // console.log('CRP', img[1])
    let p = []
    let rc = new RasterCoords({ map: null, imgsize: null })
    for (let part of poly) {
      p.push(rc.unproject([part[1], img[1] - part[0]]))
    }
    return p
  }
}

export { PlantquestRoomDisplay }
