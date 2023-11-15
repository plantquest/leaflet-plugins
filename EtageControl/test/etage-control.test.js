let Leaflet = require('./verify/leaflet')
let { PlantquestEtageControl } = require('../src/etage-control.ts')

describe('leaflet', () => {
  test('happy', () => {
    expect(Leaflet).toBeDefined()
  })

  test('leaflet-map', () => {
    let map = L.map(document.createElement('div'))
    expect(map).toBeDefined()
  })

  test('plugin-happy', () => {
    let geo = PlantquestEtageControl()
    expect(geo).toBeDefined()
  })

  test('plugin-map', () => {
    let map = L.map(document.createElement('div'))
    let etage = PlantquestEtageControl()
    etage.addTo(map)
    expect(map).toBeDefined()
  })

  test('plugin-container', () => {
    let map = L.map(document.createElement('div'))
    let etage = PlantquestEtageControl()
    etage.addTo(map)
    let etageContainer = etage.getContainer()
    expect(etageContainer).toBeDefined()
  })
})
