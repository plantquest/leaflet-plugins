import * as L from 'leaflet'

/**
 * leaflet plugin for plain image map projection
 * @copyright 2016- commenthol
 * @license MIT
 */
/* globals define */
/* eslint no-var:off */

interface RasterCoordsOptions {
  map: any
  imgsize: any
  tilesize?: any
  setmaxbounds?: any
}

class RasterCoords {
  map: any
  width: any
  height: any
  tilesize: any
  zoom: any

  constructor({
    map,
    imgsize,
    tilesize = 256,
    setmaxbounds = true,
  }: RasterCoordsOptions) {
    this.map = map
    this.width = imgsize[0]
    this.height = imgsize[1]
    this.tilesize = tilesize
    this.zoom = this.zoomLevel()

    if (setmaxbounds && this.width && this.height) {
      this.setMaxBounds()
    }
  }

  /**
   * calculate accurate zoom level for the given image size
   */
  private zoomLevel(): any {
    return Math.ceil(
      Math.log(Math.max(this.width, this.height) / this.tilesize) / Math.log(2)
    )
  }

  /**
   * unproject `coords` to the raster coordinates used by the raster image projection
   * @param {Array} coords - [ x, y ]
   * @return {L.LatLng} - internal coordinates
   */
  unproject(coords: any): L.LatLng {
    return this.map.unproject(coords, this.zoom)
  }

  /**
   * project `coords` back to image coordinates
   * @param {Array} coords - [ x, y ]
   * @return {L.LatLng} - image coordinates
   */
  project(coords: any): L.LatLng {
    return this.map.project(coords, this.zoom)
  }

  /**
   * get the max bounds of the image
   */
  getMaxBounds(): L.LatLngBounds {
    const southWest = this.unproject([0, this.height])
    const northEast = this.unproject([this.width, 0])
    return new L.LatLngBounds(southWest, northEast)
  }

  /**
   * sets the max bounds on map
   */
  setMaxBounds(): void {
    const bounds = this.getMaxBounds()
    this.map.setMaxBounds(bounds)
  }
}

export { RasterCoords }
