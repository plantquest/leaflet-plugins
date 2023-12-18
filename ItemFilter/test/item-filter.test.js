let Leaflet = require('../../verify/leaflet.js')
let { PlantquestItemFilter } = require('../dist/item-filter.umd.cjs')

describe('ItemFilter', () => {
  test('leaflet-happy', () => {
    expect(Leaflet).toBeDefined()
  })

  test('leaflet-map', () => {
    let map = L.map(document.createElement('div'))
    expect(map).toBeDefined()
  })

  test('item-filter-happy', () => {
    expect(PlantquestItemFilter).toBeDefined()
  })

  test('item-filter-create', () => {
    let plantquestItemFilter = new PlantquestItemFilter(options)
    expect(plantquestItemFilter).toBeDefined()
  })
})
