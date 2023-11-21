let Leaflet = require('../../verify/leaflet.js')
let { PlantquestDataLoader } = require('../dist/data-loader.umd.cjs')

describe('DataLoader', () => {

  test('leaflet-happy', () => {
    expect(Leaflet).toBeDefined()
  })

  test('leaflet-map', () => {
    let map = L.map(document.createElement('div'))
    expect(map).toBeDefined()
  })

})
