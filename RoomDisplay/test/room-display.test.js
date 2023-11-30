let Leaflet = require('../../verify/leaflet.js')
let { PlantquestRoomDisplay } = require('../dist/room-display.umd.cjs')

describe('RoomDisplay', () => {
  const options = {}

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
  })

  test('room-display-happy', () => {
    expect(PlantquestRoomDisplay).toBeDefined()
  })

  // test('room-display-create', () => {})

  // test('room-display-add-rooms', () => {})

  // test('room-display-remove-rooms', () => {})
})
