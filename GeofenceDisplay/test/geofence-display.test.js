let Leaflet = require('./verify/leaflet')
require('./verify/L.WatermarkControl')

describe('leaflet', () => {
  test('happy', () => {
    expect(Leaflet).toBeDefined()
  })

  test('leaflet-map', () => {
    let map = L.map(document.createElement('div'))
    expect(map).toBeDefined()
  })

  test('plugin-happy', () => {
    let map = L.map(document.createElement('div'))
    let watermark = L.control.watermark()
    expect(watermark).toBeDefined()
  })

  test('plugin-map', () => {
    let map = L.map(document.createElement('div'))
    let watermark = L.control.watermark()
    watermark.addTo(map)
    expect(map).toBeDefined()
  })

  test('plugin-container', () => {
    let map = L.map(document.createElement('div'))
    let watermark = L.control.watermark()
    watermark.addTo(map)
    let wmcontainer = watermark.getContainer()
    expect(wmcontainer).toBeDefined()
  })
})
