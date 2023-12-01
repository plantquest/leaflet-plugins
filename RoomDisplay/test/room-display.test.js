let Leaflet = require('../../verify/leaflet.js')
let { PlantquestRoomDisplay } = require('../dist/room-display.umd.cjs')

describe('RoomDisplay', () => {
  const options = {
    debug: false,
    rooms: [
      {
        id: 'roomA',
        title: 'Room A',
        pane: 'room',
        room_poly: [
          [53.138881, 2086.226563],
          [53.138881, 2116],
          [47.135928, 2116],
          [47.135928, 2086.226563],
        ],
      },
      {
        id: 'roomB',
        title: 'Room B',
        pane: 'room',
        room_poly: [
          [60.309538, 2234.9375],
          [60.309538, 2255.273438],
          [58.52124, 2255.273438],
          [58.52124, 2252.109375],
          [56.248232, 2252.109375],
          [56.248232, 2234.9375],
        ],
      },
      {
        id: 'roomC',
        title: 'Room C',
        pane: 'room',
        room_poly: [
          [3.653769, 2155.78125],
          [3.653769, 2173.007813],
          [-2.670909, 2173.007813],
          [-2.670909, 2155.78125],
        ],
      },
    ],
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
})
