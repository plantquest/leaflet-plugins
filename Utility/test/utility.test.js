let Leaflet = require('../../verify/leaflet.js')
let { PlantquestUtility } = require('../dist/utility.umd.cjs')

describe('Utility', () => {
  const options = {
    debug: false,
  }

  test('leaflet-happy', () => {
    expect(Leaflet).toBeDefined()
  })

  test('leaflet-map-happy', () => {
    let map1 = L.map(document.createElement('div'))
    expect(map1).toBeDefined()
  })

  test('leaflet-map-prep', () => {})

  test('utility-happy', () => {
    expect(PlantquestUtility).toBeDefined()
  })

  test('utility-create', () => {
    let plantquestUtility1 = new PlantquestUtility(options)
    expect(plantquestUtility1._state).toBeDefined()
  })

  test('utility-add-utilities', () => {})

  test('utility-remove-utilities', () => {})
})
