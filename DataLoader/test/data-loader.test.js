let Leaflet = require('../../verify/leaflet.js')
let { PlantquestDataLoader } = require('../dist/etage-control.umd.cjs')

describe('DataLoader', () => {
  const options = {
    debug: true,
    position: 'topright',
    buildings: [
      {
        id: 'buildingA',
        name: 'Building A',
        center: [51.505, -0.09],
        zoom: 20
      },
      {
        id: 'buildingB',
        name: 'Building B',
        center: [51.5051, -0.088],
        zoom: 20
      },
      {
        id: 'buildingC',
        name: 'Building C',
        center: [51.5054, -0.092],
        zoom: 20
      }
    ],
    levels: [
      {
        id: 'floor1',
        name: 'Floor 1',
        building_id: 'buildingA',
        center: [51.505, -0.09],
        zoom: 20
      },
      {
        id: 'floor2',
        name: 'Floor 2',
        building_id: 'buildingA',
        center: [51.505, -0.09],
        zoom: 20
      },
      {
        id: 'floor1',
        name: 'Floor 1',
        building_id: 'buildingB',
        center: [51.5051, -0.088],
        zoom: 20
      },
      {
        id: 'floor2',
        name: 'Floor 2',
        building_id: 'buildingB',
        center: [51.5051, -0.088],
        zoom: 20
      },
      {
        id: 'floor3',
        name: 'Floor 3',
        building_id: 'buildingB',
        center: [51.5051, -0.088],
        zoom: 20
      },
      {
        id: 'basement',
        name: 'Basement',
        building_id: 'buildingB',
        center: [51.5051, -0.088],
        zoom: 20
      },
      {
        id: 'floor1',
        name: 'Floor 1',
        building_id: 'buildingC',
        center: [51.5054, -0.092],
        zoom: 20
      },
      {
        id: 'floor2',
        name: 'Roof',
        building_id: 'buildingC',
        center: [51.5054, -0.092],
        zoom: 20
      }
    ]
  }

  test('leaflet-happy', () => {
    expect(Leaflet).toBeDefined()
  })

  test('leaflet-map', () => {
    let map = L.map(document.createElement('div'))
    expect(map).toBeDefined()
  })

  test('etage-control-happy', () => {
    expect(PlantquestDataLoader).toBeDefined()
  })

  test('etage-control-create', () => {
    let plantquestDataLoader = new PlantquestDataLoader(options)
    expect(plantquestDataLoader).toBeDefined()
  })
})
