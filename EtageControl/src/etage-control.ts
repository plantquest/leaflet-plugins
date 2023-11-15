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
  building_id: string
  center: [number, number] // We need this right now to use the same methods of the active option in the menu
  zoom: number
}

// Using proper TS types for the options, including the custom ones.
// To be verified.
interface PlantquestEtageControlOptions extends L.ControlOptions {
  buildings?: Building[]
  levels?: Level[]
  debug?: boolean
}

const PlantquestEtageControl = L.Control.extend({
  options: {
    position: 'topright' // Default position, see this after in case of overlapping
  } as PlantquestEtageControlOptions,

  // Initialize the properties of the class, including the custom ones.
  _map: null as L.Map | null,
  _buildings: [] as Building[],
  _levels: [] as Level[],
  _buildingList: null as HTMLElement | null,
  _levelList: null as HTMLElement | null,
  _container: null as HTMLElement | null,

  initialize: function (options: PlantquestEtageControlOptions) {
    this.options.debug && console.log(`Initializing EtageControl with options: ${JSON.stringify(options)}`);

    L.Util.setOptions(this, options)
    this._buildings = Array.isArray(options.buildings) ? options.buildings : []
    this._levels = Array.isArray(options.levels) ? options.levels : []
  },

  onAdd: function (map: L.Map) {
    const self = this
    self.options.debug && console.log(`Adding EtageControl to map: ${map}`);

    self._map = map
    const container = L.DomUtil.create('div', 'etage-control-container')
    self._container = container
    L.DomEvent.disableClickPropagation(container)

    self._initLayout(container)

    // Automatically select and highlight the first building and its levels
    const firstBuilding = self._buildings[0];
    if (firstBuilding) {
      self._selectBuilding(firstBuilding);
    }

    return container
  },

  show: function() {
    if (this._container) {
      this._container.style.display = '';
    }
  },

  // Method to hide the control
  hide: function() {
    if (this._container) {
      this._container.style.display = 'none';
    }
  },

  onRemove: function (_map: L.Map) {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
  },

  _initLayout: function (container: HTMLElement) {
    const buildingList = L.DomUtil.create(
      'ul',
      'leaflet-control-toolbar leaflet-toolbar-0 plantquest-tool-building',
      container
    )

    this._buildingList = buildingList

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

    // Automatically select and highlight the first building
    if (this._buildings && this._buildings.length > 0) {
      const firstBuilding = this._buildings[0]
      const firstBuildingItem = container.querySelector(
        `li[data-plantquest-building='${firstBuilding.id}']`
      )
      if (firstBuildingItem) {
        this._setActiveItem(firstBuildingItem as HTMLElement, buildingList)
        this._selectItem(firstBuilding) // Center the map on the first building
        this._updateLevels(firstBuilding.id) // Update levels based on the first building
      }
    }

    this._levelList = L.DomUtil.create(
      'ul',
      'leaflet-control-toolbar leaflet-toolbar-0 plantquest-tool-level',
      container
    )
    if (this._buildings && this._buildings.length > 0) {
      this._updateLevels(this._buildings[0].id)
    }
  },

  _selectBuilding: function (building: Building) {
    this.options.debug && console.log(`Selecting building: ${building.id}`);

    if (this._map) {
      this._map.setView(building.center, building.zoom)
    }

    // Set active the corresponding building item
    if (!this._buildingList) return
    const buildingItem = this._buildingList.querySelector(
      `li[data-plantquest-building='${building.id}']`
    )
    if (buildingItem) {
      this._setActiveItem(buildingItem as HTMLElement, this._buildingList)
    }

    // Update levels for the selected building and select the first level
    this._updateLevels(building.id)
  },

  _updateLevels: function (building_id: string) {
    this.options.debug && console.log(`Updating levels for building: ${building_id}`);

    if (!this._levelList) return

    // Clear existing levels
    while (this._levelList.firstChild) {
      this._levelList.removeChild(this._levelList.firstChild)
    }

    // Populate the list with levels for the building
    const levelsForBuilding =
      this._levels?.filter(level => level.building_id === building_id) || []
    if (levelsForBuilding.length > 0) {
      this._levelList.style.display = ''
      levelsForBuilding.forEach(level =>
        this._createAndAttachLevelListItem(level)
      )

      // Select and highlight the first level of the new building
      const firstLevel = levelsForBuilding[0]
      this._selectItem(firstLevel)
      const firstLevelItem = this._levelList.querySelector(
        `li[data-plantquest-level='${firstLevel.id}']`
      )
      if (firstLevelItem) {
        this._setActiveItem(firstLevelItem as HTMLElement, this._levelList)
      }
    } else {
      this._levelList.style.display = 'none'
    }
  },

  _createAndAttachLevelListItem: function (level: Level) {
    if (!this._levelList) return

    const levelItem = L.DomUtil.create(
      'li',
      'plantquest-tool-select-building',
      this._levelList
    )
    levelItem.dataset.plantquestLevel = level.id

    const levelLink = L.DomUtil.create('a', 'leaflet-toolbar-icon', levelItem)
    levelLink.href = '#'
    levelLink.innerText = level.name

    L.DomEvent.on(levelItem, 'click', e => {
      L.DomEvent.stop(e)
      this._selectItem(level)
      if (this._levelList) {
        this._setActiveItem(levelItem, this._levelList)
      }
    })
  },

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
  },
  
})

export { PlantquestEtageControl }
