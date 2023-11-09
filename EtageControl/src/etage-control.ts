import L from 'leaflet'
import './etage-control.css'

interface Building {
  id: string
  name: string
  center: [number, number] // Latitude and longitude of the building
  zoom: number
}

interface Level {
  id: string
  name: string
  buildingId: string
  center: [number, number] // We need this right now to use the same methods of the active option in the menu
  zoom: number
}

// Using proper TS types for the options, including the custom ones.
// To be verified.
interface PlantquestEtageControlOptions extends L.ControlOptions {
  buildings?: Building[]
  levels?: Level[]
}

const PlantquestEtageControl = L.Control.extend({
  options: {
    position: 'topright' // Default position, see this after in case of overlapping
  } as PlantquestEtageControlOptions,

  // Initialize the properties of the class, including the custom ones.
  _map: null as L.Map | null,
  _buildings: null as Building[] | null,
  _levels: null as Level[] | null,

  initialize: function (options: PlantquestEtageControlOptions) {
    L.Util.setOptions(this, options)
    this._buildings = options.buildings || []
    this._levels = options.levels || []
  },

  onAdd: function (map: L.Map) {
    this._map = map
    const container = L.DomUtil.create('div', 'etage-control-container')

    // TO BE VERIFIED
    // I think we need to make sure events don't bubble up to the map
    L.DomEvent.disableClickPropagation(container)

    this._initLayout(container)

    return container
  },

  onRemove: function (_map: L.Map) {
    // Nothing to do here
  },

  _initLayout: function (container: HTMLElement) {
    const buildingList = L.DomUtil.create(
      'ul',
      'leaflet-control-toolbar leaflet-toolbar-0 plantquest-tool-building',
      container
    )

    this._buildings?.forEach(building => {
      const buildingItem = L.DomUtil.create(
        'li',
        'plantquest-tool-select-building',
        buildingList
      )
      buildingItem.dataset.plantquestBuilding = building.id

      const buildingLink = L.DomUtil.create(
        'a',
        'leaflet-toolbar-icon',
        buildingItem
      )

      buildingLink.href = '#'
      buildingLink.innerText = building.name

      L.DomEvent.on(buildingItem, 'click', e => {
        L.DomEvent.stop(e)
        this._selectItem(building)
        this._updateLevels(building.id)
        this._setActiveItem(buildingItem, buildingList)
      })
    })

    // Level menu (initially empty)
    const levelList = L.DomUtil.create(
      'ul',
      'leaflet-control-toolbar leaflet-toolbar-0 plantquest-tool-level',
      container
    )
    levelList.style.display = 'none' // Hide the level list initially
    this._levelList = levelList // Storing the reference to update later
  },

  // TODO: This method is too long and complicated, refactor it or split it into smaller methods
  _updateLevels: function (buildingId: string) {
    if (!this._levelList) {
      return
    }
    // Clear existing levels
    while (this._levelList.firstChild) {
      this._levelList.removeChild(this._levelList.firstChild)
    }

    // Add new levels for the selected building
    const levelsForBuilding =
      this._levels?.filter(level => level.buildingId === buildingId) || []
    if (levelsForBuilding.length > 0) {
      this._levelList.style.display = '' // Show the levels list if there are levels for the building
      levelsForBuilding.forEach(level => {
        if (!this._levelList) {
          return
        }
        const levelItem = L.DomUtil.create(
          'li',
          'plantquest-tool-select-building',
          this._levelList
        )
        levelItem.dataset.plantquestLevel = level.id

        const levelLink = L.DomUtil.create(
          'a',
          'leaflet-toolbar-icon',
          levelItem
        )
        levelLink.href = '#'
        levelLink.innerText = level.name

        L.DomEvent.on(levelItem, 'click', e => {
          if (!this._levelList) {
            return
          }
          L.DomEvent.stop(e)
          this._selectItem(level)
          this._setActiveItem(levelItem, this._levelList)
        })
      })
    } else {
      this._levelList.style.display = 'none' // Hide the levels list if there are no levels for the building
    }
  },

  _levelList: null as HTMLElement | null,

  _selectItem: function (item: Building | Level) {
    if (this._map) {
      this._map.setView(item.center, item.zoom)
    }
  },

  _setActiveItem: function (selectedItem: HTMLElement, list: HTMLElement) {
    // Clear the active class from all items
    const items = list.querySelectorAll('li')
    items.forEach(item => {
      item.classList.remove('plantquest-tool-select-building-active')
    })

    // Set the active class to the selected item
    selectedItem.classList.add('plantquest-tool-select-building-active')
  }

})

export { PlantquestEtageControl }
