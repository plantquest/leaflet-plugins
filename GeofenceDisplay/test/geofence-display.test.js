let Leaflet = require('./verify/leaflet.js')
let { PlantquestGeofenceDisplay } = require('../dist/geofence-display.umd.cjs')

describe('GeofenceDisplay', () => {
  const options = {
    debug: true,
    geofences: [
      {
        id: 'coffeewerk',
        title: 'Coffewerk+Press',
        latlngs: [
          [53.271455, -9.054129],
          [53.271237, -9.054666],
          [53.271096, -9.054494],
          [53.270852, -9.054365],
          [53.271404, -9.053936],
        ],
        colour: 'purple',
      },
      {
        id: 'plamas',
        title: 'Plámás',
        latlngs: [
          [53.270467, -9.058356],
          [53.270197, -9.058871],
          [53.270095, -9.058142],
          [53.270172, -9.057584],
        ],
        colour: 'purple',
      },
    ],
  }

  test('leaflet-happy', () => {
    expect(Leaflet).toBeDefined()
  })

  test('leaflet-map', () => {
    let map = L.map(document.createElement('div'))
    expect(map).toBeDefined()
  })

  test('geofence-display-happy', () => {
    expect(PlantquestGeofenceDisplay).toBeDefined()
  })

  test('geofence-display-create', () => {
    let plantquestGeofenceDisplay = new PlantquestGeofenceDisplay(options)
    expect(plantquestGeofenceDisplay).toBeDefined()
  })

  // test('geofence-display-add-geofences', () => {
  //   let map = L.map(document.createElement('div'))
  //   let plantquestGeofenceDisplay = new PlantquestGeofenceDisplay(options)
  //   plantquestGeofenceDisplay.addTo(map)
  // })
})
