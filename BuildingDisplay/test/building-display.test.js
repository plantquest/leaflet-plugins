let Leaflet = require('../../verify/leaflet.js')
let { PlantquestBuildingDisplay } = require('../dist/building-display.umd.cjs')

describe('BuildingDisplay', () => {
  const options = {
    debug: true,
    buildings: [
      {
        id: 'buildingA',
        name: 'Building A',
        poly: [
          [52.7, 2086],
          [52.7, 2115.7],
          [47.4, 2115.7],
          [47.4, 2086],
        ],
      },
      {
        id: 'buildingB',
        name: 'Building B',
        poly: [
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
        name: 'Building C',
        poly: [
          [3.4, 2155.6],
          [3.4, 2172.5],
          [-3.4, 2172.5],
          [-3.4, 2155.6],
        ],
      },
    ],
    pqam: {
      loc: {
        poly: null,
        building: null,
        chosen: {
          poly: null,
          building: null,
        },
      },
      config: {
        mapImg: [7800, 5850],
        mapMaxZoom: 2,
        mapBuildingFocusZoom: 5,
        building: {
          click: {
            active: true,
          },
          label: {
            zoom: null,
          },
          color: '#33f',
        },
      },
      data: {
        buildingMap: { buildingA: null, buildingB: null, buildingC: null },
      },
      layer: { building: null },
      map: null,
      buildingPopup: null,
      click: null,
    },
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

    map2.createPane('building')
    let buildingPane1 = map2.getPane('building')
    buildingPane1.style.zIndex = 230

    expect(map2._panes.building).toBeDefined()
  })

  test('building-display-happy', () => {
    expect(PlantquestBuildingDisplay).toBeDefined()
  })

  test('building-display-create', () => {
    let plantquestBuildingDisplay1 = new PlantquestBuildingDisplay(options)
    expect(plantquestBuildingDisplay1._state).toBeDefined()
  })

  test('building-display-add-buildings', () => {
    let map3 = L.map(document.createElement('div'), {
      minZoom: 1.7,
    }).setView([50.154377, 2154.375], 1.7)

    L.tileLayer(
      'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png'
    ).addTo(map3)

    map3.createPane('building')
    let buildingPane2 = map3.getPane('building')
    buildingPane2.style.zIndex = 230

    let plantquestBuildingDisplay2 = new PlantquestBuildingDisplay(options)
    expect(plantquestBuildingDisplay2._map).toBeUndefined()
    plantquestBuildingDisplay2.addTo(map3)
    expect(plantquestBuildingDisplay2._map).toBeDefined()
  })

  test('building-display-remove-buildings', () => {
    let map4 = L.map(document.createElement('div'), {
      minZoom: 1.7,
    }).setView([50.154377, 2154.375], 1.7)

    L.tileLayer(
      'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png'
    ).addTo(map4)

    map4.createPane('building')
    let buildingPane3 = map4.getPane('building')
    buildingPane3.style.zIndex = 230

    let plantquestBuildingDisplay3 = new PlantquestBuildingDisplay(options)
    plantquestBuildingDisplay3.addTo(map4)
    expect(plantquestBuildingDisplay3._map).toBeDefined()
    plantquestBuildingDisplay3.remove()
    expect(plantquestBuildingDisplay3._map).toEqual(null)
  })
})
