let Leaflet = require('../../verify/leaflet.js')
let { PlantquestGeofenceDisplay } = require('../dist/geofence-display.umd.cjs')

describe('GeofenceDisplay', () => {
  const options = {
    debug: true,
    geofences: [
      {
        id: 'buildingA',
        title: 'Building A',
        latlngs: [
          [52.7, 2086],
          [52.7, 2115.7],
          [47.4, 2115.7],
          [47.4, 2086],
        ],
      },
      {
        id: 'buildingB',
        title: 'Building B',
        latlngs: [
          [60.6, 2235],
          [60.6, 2255.3],
          [58.3, 2255.3],
          [58.3, 2252],
          [56.1, 2252],
          [56.1, 2235],
        ],
      },
      {
        id: 'buildingC',
        title: 'Building C',
        latlngs: [
          [3.4, 2155.6],
          [3.4, 2172.5],
          [-3.4, 2172.5],
          [-3.4, 2155.6],
        ],
      },
    ],
    pqam: { config: { geofence: { click: { active: true }, color: '#f3f' } } },
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

    map2.createPane('geofence')
    let geofencePane1 = map2.getPane('geofence')
    geofencePane1.style.zIndex = 230

    map2.createPane('geofenceLabel')
    let geofenceLabelPane1 = map2.getPane('geofenceLabel')
    geofenceLabelPane1.style.zIndex = 235

    expect(map2._panes.geofence).toBeDefined()
    expect(map2._panes.geofenceLabel).toBeDefined()
  })

  test('geofence-display-happy', () => {
    expect(PlantquestGeofenceDisplay).toBeDefined()
  })

  test('geofence-display-create', () => {
    let plantquestGeofenceDisplay1 = new PlantquestGeofenceDisplay(options)
    expect(plantquestGeofenceDisplay1._state).toBeDefined()
  })

  test('geofence-display-add-geofences', () => {
    let map3 = L.map(document.createElement('div'), {
      minZoom: 1.7,
    }).setView([50.154377, 2154.375], 1.7)

    L.tileLayer(
      'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png'
    ).addTo(map3)

    map3.createPane('geofence')
    let geofencePane2 = map3.getPane('geofence')
    geofencePane2.style.zIndex = 230

    map3.createPane('geofenceLabel')
    let geofenceLabelPane2 = map3.getPane('geofenceLabel')
    geofenceLabelPane2.style.zIndex = 235

    let plantquestGeofenceDisplay2 = new PlantquestGeofenceDisplay(options)
    expect(plantquestGeofenceDisplay2._map).toBeUndefined()
    plantquestGeofenceDisplay2.addTo(map3)
    expect(plantquestGeofenceDisplay2._map).toBeDefined()
  })

  test('geofence-display-remove-geofences', () => {
    let map4 = L.map(document.createElement('div'), {
      minZoom: 1.7,
    }).setView([50.154377, 2154.375], 1.7)

    L.tileLayer(
      'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png'
    ).addTo(map4)

    map4.createPane('geofence')
    let geofencePane3 = map4.getPane('geofence')
    geofencePane3.style.zIndex = 230

    map4.createPane('geofenceLabel')
    let geofenceLabelPane3 = map4.getPane('geofenceLabel')
    geofenceLabelPane3.style.zIndex = 235

    let plantquestGeofenceDisplay3 = new PlantquestGeofenceDisplay(options)
    plantquestGeofenceDisplay3.addTo(map4)
    expect(plantquestGeofenceDisplay3._map).toBeDefined()
    plantquestGeofenceDisplay3.remove()
    expect(plantquestGeofenceDisplay3._map).toEqual(null)
  })
})
