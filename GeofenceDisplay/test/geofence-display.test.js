let Leaflet = require('./verify/leaflet')
let { PlantquestGeofenceDisplay } = require('../src/geofence-display.ts')

describe('leaflet', () => {
  test('happy', () => {
    expect(Leaflet).toBeDefined()
  })

  test('leaflet-map', () => {
    let map = L.map(document.createElement('div'))
    expect(map).toBeDefined()
  })

  test('plugin-happy', () => {
    let geo = PlantquestGeofenceDisplay()
    expect(geo).toBeDefined()
  })

  test('plugin-map', () => {
    let map = L.map(document.createElement('div'))
    let geo = PlantquestGeofenceDisplay()
    geo.addTo(map)
    expect(map).toBeDefined()
  })

  test('plugin-container', () => {
    let map = L.map(document.createElement('div'))
    let geo = PlantquestGeofenceDisplay()
    geo.addTo(map)
    let geocontainer = geo.getContainer()
    expect(geocontainer).toBeDefined()
  })
})
