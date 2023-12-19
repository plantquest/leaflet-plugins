let Leaflet = require('../../verify/leaflet.js')
let { PlantquestAssetDisplay } = require('../dist/asset-display.umd.cjs')

//TODO: Update and adapt tests after refactoring and functional AssetDisplay
describe('AssetDisplay', () => {
  test('leaflet-happy', () => {
    expect(Leaflet).toBeDefined()
  })

  test('leaflet-map', () => {
    let map = L.map(document.createElement('div'))
    expect(map).toBeDefined()
  })

  test('asset-display-happy', () => {
    expect(PlantquestAssetDisplay).toBeDefined()
  })

})
