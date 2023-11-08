import L from 'leaflet'
import './etage-control.css'

const PlantquestEtageControl = L.Control.extend({
  options: {
    position: 'topright'
  },

  initialize: function (this: any, options: any) {
    console.log('PGS init')
    this._state = {}
    L.Util.setOptions(this, options)
  },

  onAdd: function (this: any, _map: any) {
    let self = this

    let div = L.DomUtil.create('div')
    div.classList.add('leaflet-control')

    let ul = L.DomUtil.create('ul')
    ul.classList.add('leaflet-control-toolbar')
    ul.classList.add('leaflet-toolbar-0')
    ul.classList.add('plantquest-tool-building')

    let selectors: HTMLLIElement[] = []

    const buildings = [
      { id: 'bldg_a', name: 'Building A', center: [51.505, -0.09] },
      { id: 'bldg_b', name: 'Building B', center: [51.51, -0.11] }
      // TESTING! Just mockup data.
    ]

    buildings.forEach((building, index) => {
      let li = L.DomUtil.create('li')
      li.classList.add('plantquest-tool-select-building')
      li.setAttribute('data-plantquest-building', building.id)

      let a = L.DomUtil.create('a')
      a.classList.add('leaflet-toolbar-icon')
      a.setAttribute('href', '#')
      a.innerText = building.name.replace('Building ', '')

      li.appendChild(a)
      ul.appendChild(li)

      selectors.push(li)

      L.DomEvent.on(li, 'click', L.DomEvent.stop).on(li, 'click', function () {
        self._selectBuilding(building, selectors);
      }, self);
    })

    div.appendChild(ul)

    return div
  },

  onRemove: function (this: any, _map: any) {},

  _selectBuilding: function (building: any, selectors: any) {
    this._state.currentBuilding = building;
    let coords = c_asset_coords({
      x: building.center[0],
      y: building.center[1],
    });
    this._map.setView(coords, this.options.mapMinZoom + 1);
    this.addLevelControl();

    selectors.forEach((selector: any) => {
      selector.classList.remove("plantquest-tool-select-building-active");
      if (building.id === selector.getAttribute("data-plantquest-building")) {
        selector.classList.add("plantquest-tool-select-building-active");
      }
    });
  },

  addLevelControl: function () {
    let self = this

    if (self.current.levelControl) {
      self.current.levelControl.remove()
    }

    let levelActions: any[] = []
    let levelsForBuilding = self.data.level.filter(
      level => level.building_id === self.current.building?.id
    )

    levelsForBuilding.forEach((level: any, index: any) => {
      levelActions.push(
        L.Toolbar2.Action.extend({
          options: {
            toolbarIcon: {
              html: level.name
            }
          },

          addHooks: function () {
            self.showMap(index, {
              centerView: false,
              startZoom: false,
              showAllAssets: false,
              showLevelAssets: true,
              whence: 'toolbarlevel'
            })
          }
        })
      )
    })

    let levelToolbar = new L.Toolbar2.Control({
      actions: levelActions,
      position: 'topright',
      className: 'plantquest-tool-level'
    })

    self.map.addLayer(levelToolbar)
    self.current.levelControl = levelToolbar
  },

  c_asset_coords: function (coords: any) {
    return new L.LatLng(coords.x, coords.y);
  },

  showMap: function (levelIndex: any, options: any) {
    let level = this.options.levels[levelIndex];
    if (!level) {
      console.error('Level not found.');
      return;
    }

    let levelCoords = this.c_asset_coords({ x: level.lat, y: level.lng });
    if (options.centerView) {
      this.map.setView(levelCoords, options.startZoom ? this.options.mapMinZoom + 1 : this.map.getZoom());
    }

    // Additional logic to show/hide assets can go here
  },
})

export { PlantquestEtageControl }
