let Leaflet = require('../../verify/leaflet.js')
let { PlantquestRoomDisplay } = require('../dist/room-display.umd.cjs')

describe('RoomDisplay', () => {
  const options = {
    debug: true,
    rooms: [
      {
        id: 'roomA',
        name: 'Room A',
        poly: [
          [52.7, 2086],
          [52.7, 2115.7],
          [47.4, 2115.7],
          [47.4, 2086],
        ],
      },
      {
        id: 'roomB',
        name: 'Room B',
        poly: [
          [60.6, 2235],
          [60.6, 2255.3],
          [58.3, 2255.3],
          [58.3, 2252],
          [56.1, 2252],
          [56.1, 2235],
        ],
      },
      {
        id: 'roomC',
        name: 'Room C',
        poly: [
          [3.4, 2155.6],
          [3.4, 2172.5],
          [-3.4, 2172.5],
          [-3.4, 2155.6],
        ],
      },
    ],
    pqam: {
      loc: {
        poly: null,
        room: null,
        chosen: {
          poly: null,
          room: { poly: null },
        },
      },
      config: {
        mapImg: [7800, 5850],
        mapMaxZoom: 2,
        mapRoomFocusZoom: 4,
        room: {
          click: {
            active: true,
          },
          label: {
            zoom: null,
          },
          color: '#33f',
        },
      },
      data: {
        roomMap: {
          roomA: {
            id: 'roomA',
            name: 'Room A',
            poly: [
              [52.7, 2086],
              [52.7, 2115.7],
              [47.4, 2115.7],
              [47.4, 2086],
            ],
          },
          roomB: {
            id: 'roomB',
            name: 'Room B',
            poly: [
              [60.6, 2235],
              [60.6, 2255.3],
              [58.3, 2255.3],
              [58.3, 2252],
              [56.1, 2252],
              [56.1, 2235],
            ],
          },
          roomC: {
            id: 'roomC',
            name: 'Room C',
            poly: [
              [3.4, 2155.6],
              [3.4, 2172.5],
              [-3.4, 2172.5],
              [-3.4, 2155.6],
            ],
          },
        },
      },
      layer: { room: null },
      map: null,
      roomPopup: null,
      click: null,
    },
  }

  test('leaflet-happy', () => {
    expect(Leaflet).toBeDefined()
  })

  test('leaflet-map-happy', () => {
    let map1 = L.map(document.createElement('div'))
    expect(map1).toBeDefined()
  })

  test('leaflet-map-prep', () => {
    let map2 = L.map(document.createElement('div'), {
      minZoom: 1.7,
    }).setView([50.154377, 2154.375], 1.7)

    L.tileLayer(
      'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png'
    ).addTo(map2)

    map2.createPane('room')
    let roomPane1 = map2.getPane('room')
    roomPane1.style.zIndex = 230

    expect(map2._panes.room).toBeDefined()
  })

  test('room-display-happy', () => {
    expect(PlantquestRoomDisplay).toBeDefined()
  })

  test('room-display-create', () => {
    let plantquestRoomDisplay1 = new PlantquestRoomDisplay(options)
    expect(plantquestRoomDisplay1._state).toBeDefined()
  })

  test('room-display-add-rooms', () => {
    let map3 = L.map(document.createElement('div'), {
      minZoom: 1.7,
    }).setView([50.154377, 2154.375], 1.7)

    L.tileLayer(
      'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png'
    ).addTo(map3)

    map3.createPane('room')
    let roomPane2 = map3.getPane('room')
    roomPane2.style.zIndex = 230

    let plantquestRoomDisplay2 = new PlantquestRoomDisplay(options)
    expect(plantquestRoomDisplay2._map).toBeUndefined()
    plantquestRoomDisplay2.addTo(map3)
    expect(plantquestRoomDisplay2._map).toBeDefined()
  })

  test('room-display-remove-rooms', () => {
    let map4 = L.map(document.createElement('div'), {
      minZoom: 1.7,
    }).setView([50.154377, 2154.375], 1.7)

    L.tileLayer(
      'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png'
    ).addTo(map4)

    map4.createPane('room')
    let roomPane3 = map4.getPane('room')
    roomPane3.style.zIndex = 230

    let plantquestRoomDisplay3 = new PlantquestRoomDisplay(options)
    plantquestRoomDisplay3.addTo(map4)
    expect(plantquestRoomDisplay3._map).toBeDefined()
    plantquestRoomDisplay3.remove()
    expect(plantquestRoomDisplay3._map).toEqual(null)
  })

  test('room-display-on-click', () => {
    /*
    Changes to look for:
    - Room clicked on
    - zoom to Room (focus())
    - tooltip appears (select())
    */
    let map5 = L.map(document.createElement('div'), {
      minZoom: 1.7,
    }).setView([50.154377, 2154.375], 1.7)

    L.tileLayer(
      'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png'
    ).addTo(map5)

    map5.createPane('room')
    let roomPane4 = map5.getPane('room')
    roomPane4.style.zIndex = 230

    let plantquestRoomDisplay4 = new PlantquestRoomDisplay(options)
    plantquestRoomDisplay4.addTo(map5)

    // import { fireEvent } from '@react/testing-library'
    // fireEvent.click(roomElement)
    // expect(event.target._latlngs[0]).toEqual(options.pqam.data.roomMap[roomElementID])

    // clickRoom = Room object (extracted from map?)
    plantquestRoomDisplay4.simulateRoomClick('simRoomA')
  })

  test('room-display-focus', () => {
    let map6 = L.map(document.createElement('div'), {
      minZoom: 1.7,
    }).setView([50.154377, 2154.375], 1.7)

    L.tileLayer(
      'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png'
    ).addTo(map6)

    map6.createPane('room')
    let roomPane5 = map6.getPane('room')
    roomPane5.style.zIndex = 230

    let plantquestRoomDisplay5 = new PlantquestRoomDisplay(options)
    plantquestRoomDisplay5.addTo(map6)
  })

  test('room-display-select', () => {
    let map7 = L.map(document.createElement('div'), {
      minZoom: 1.7,
    }).setView([50.154377, 2154.375], 1.7)

    L.tileLayer(
      'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png'
    ).addTo(map7)

    map7.createPane('room')
    let roomPane6 = map7.getPane('room')
    roomPane6.style.zIndex = 230

    let plantquestRoomDisplay6 = new PlantquestRoomDisplay(options)
    plantquestRoomDisplay6.addTo(map7)
  })
})
