import L from 'leaflet'
import './geofence-display.css'

const PlantquestGeofenceDisplay = L.Control.extend({
  options: {
    position: 'topright',
  },

  initialize: function (this: any, options: any) {
    console.log('PGS init')
    this._state = {
      open: false,
      atype: {},
      roomattr: {},
      menuitems: [],
    }
    L.Util.setOptions(this, options)
  },

  onAdd: function (this: any, _map: any) {
    let self = this

    console.log('PGS onAdd', this.options)
    let div = L.DomUtil.create('div')
    div.classList.add('pqs-map-control-group')

    let activate = L.DomUtil.create('div')
    activate.classList.add('pqs-map-control-group-activate')
    // activate.innerHTML = '<i aria-hidden="true" class="v-icon notranslate vxg-icon mdi mdi-map-search-outline theme--light" style="font-size: 24px; padding: 8px; color: black;"></i>'
    activate.innerHTML = '<div style="color:red;"><b>GS</b></div>'
    activate.addEventListener('click', () => {
      this._state.open = !this._state.open

      if (this._state.open) {
        div.appendChild(this._menu)
      } else {
        div.removeChild(this._menu)
      }
    })

    let menu = (this._menu = L.DomUtil.create('div'))
    menu.classList.add('pqs-map-control-group-menu')

    let ul = L.DomUtil.create('ul')

    let li = L.DomUtil.create('li')
    li.classList.add('pqs-map-control-group-menu-head')
    li.innerText = 'ROOM/AREA ATTRIBUTES'
    ul.appendChild(li)

    for (let attrField in this.options.room.attr) {
      li = L.DomUtil.create('li')
      li.innerText = this.options.room.attr[attrField]
      li.addEventListener(
        'click',
        ((attrField, li) => () => {
          self.options.toggleGroup('roomattr', attrField)
          self._state.roomattr[attrField] = !self._state.roomattr[attrField]
          if (self._state.roomattr[attrField]) {
            li.classList.add('pqs-map-control-group-active')
          } else {
            li.classList.remove('pqs-map-control-group-active')
          }
        })(attrField, li)
      )
      ul.appendChild(li)
      this._state.menuitems.push(li)
    }

    li = L.DomUtil.create('li')
    li.classList.add('pqs-map-control-group-menu-head')
    li.innerText = 'POINTS OF INTEREST'
    ul.appendChild(li)

    for (let atype of this.options.asset.atypes) {
      li = L.DomUtil.create('li')
      li.innerText = atype
      li.addEventListener(
        'click',
        ((atype, li) => () => {
          self.options.toggleGroup('asset', atype)
          self._state.atype[atype] = !self._state.atype[atype]
          if (self._state.atype[atype]) {
            li.classList.add('pqs-map-control-group-active')
          } else {
            li.classList.remove('pqs-map-control-group-active')
          }
        })(atype, li)
      )
      ul.appendChild(li)
      this._state.menuitems.push(li)
    }

    menu.appendChild(ul)
    // menu.innerText = 'MENU'

    div.appendChild(activate)

    return div
  },

  onRemove: function (this: any, _map: any) {
    console.log('PGS onRemove')
  },

  clear: function (this: any) {
    for (let p in this._state.atype) {
      this._state.atype[p] = false
    }

    for (let p in this._state.roomattr) {
      this._state.roomattr[p] = false
    }

    this._state.menuitems.map((li: any) =>
      li.classList.remove('pqs-map-control-group-active')
    )
  },
})

export { PlantquestGeofenceDisplay }
