// import L from 'leaflet'
import { Gubu } from 'gubu'
import './utility.css'
// import { RasterCoords } from './rastercoords'

// interface UtilityDef {}

interface PlantquestUtilityOptions {
  debug: boolean
}

class PlantquestUtility {
  ent: any = null
  ctx: any = null

  constructor(rawOptions: PlantquestUtilityOptions) {
    let self = this
    const PlantquestUtilityOptionsShape = Gubu({})
    self.ctx = PlantquestUtilityOptionsShape(rawOptions)
    self.ctx.debug && console.log('Utility constructor called.')
  }
}

export { PlantquestUtility }
