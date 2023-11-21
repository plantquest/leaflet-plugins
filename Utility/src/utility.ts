import L from 'leaflet'
import { Gubu } from 'gubu'
import './utility.css'

// interface UtilityDef {}

interface PlantquestUtilityOptions extends L.ControlOptions {
  debug: boolean
}

const PlantquestUtility = L.Control.extend({
  initialize: function (this: any, rawOptions: PlantquestUtilityOptions) {
    const PlantquestUtilityOptionsShape = Gubu({})
    let options = PlantquestUtilityOptionsShape(rawOptions)
    options.debug && console.log('Utility init function called.')

    L.Util.setOptions(this, options)
    this._state = {}
  },

  onAdd: function (this: any, _map: any) {
    let self = this
    self.options.debug && console.log('Utility onAdd function called.')
  },

  onRemove: function (this: any, _map: any) {
    let self = this
    self.options.debug && console.log('Utility onRemove function called.')
  },
})

export { PlantquestUtility }
