let { PlantquestUtility } = require('../dist/utility.umd.cjs')

describe('Utility', () => {
  const options = {
    debug: true,
  }

  test('utility-happy', () => {
    expect(PlantquestUtility).toBeDefined()
  })

  test('utility-constructor', () => {
    let pqu1 = new PlantquestUtility(options)
  })

  test('utility-buildContainer', () => {
    let pqu2 = new PlantquestUtility(options)
    let buildContainer = pqu2.buildContainer()
    // no params
    // return string
  })

  test('utility-fixid', () => {
    let pqu3 = new PlantquestUtility(options)
    let idstr = 'utility fixid string'
    let fixid = pqu3.fixid(idstr)
    // param: string
    // return string with affectations
  })

  test('utility-clear', () => {
    let pqu4 = new PlantquestUtility(options)
    let clear = pqu4.clear()
    // does nothing right now
  })

  test('utility-clone', () => {
    let pqu5 = new PlantquestUtility(options)
    let obj = { a: 1, b: 2, c: { cc: 3 } }
    let clone = pqu5.clone(obj)
    // params: object to clone
    // return either object or parsed stringified object
  })

  // test('utility-pointInPolygon', () => {
  //   // Test whether sent to pipFlat or pipNested
  //   let pqu6 = new PlantquestUtility(options)
  //   let pointInPolygon = pqu6.pointInPolygon(null, null)
  //   // params:
  //   // - point (array with x and y coords)
  //   // - vs (array of ?)
  //   // - start (starting index, given 0 if undefined)
  //   // - end (ending index, given length of vs if undefined)
  //   // return boolean
  // })

  test('utility-pointInPolygonFlat', () => {
    let pqu7 = new PlantquestUtility(options)
    let point = [1, 1]
    let vs = [2, 2, 2, -2, -2, -2, -2, 2]
    let pointInPolygonFlat = pqu7.pointInPolygonFlat(point, vs)
    // params:
    // - point (array with x and y coords)
    // - vs (array of ?)
    // - start (starting index, given 0 if undefined)
    // - end (ending index, given length of vs if undefined)
    // return boolean
  })

  test('utility-pointInPolygonNested', () => {
    let pqu8 = new PlantquestUtility(options)
    let point = [1, 1]
    let vs = [
      [2, 2],
      [2, -2],
      [-2, -2],
      [-2, 2],
    ]
    let pointInPolygonNested = pqu8.pointInPolygonNested(point, vs)
    // params:
    // - point (array with x and y coords)
    // - vs (array of ?)
    // - start (starting index, given 0 if undefined)
    // - end (ending index, given length of vs if undefined)
    // return boolean
  })

  test('utility-convertPoly', () => {
    let pqu9 = new PlantquestUtility(options)
    let poly = [
      [2, 2],
      [2, -2],
      [-2, -2],
      [-2, 2],
    ]
    let convertPoly = pqu9.convertPoly(poly)
    // params: array of coordinate pairs for unprojecting
    // return array of arrays (array of coordinate pairs)
  })

  test('utility-convertRoomPoly', () => {
    let pqu10 = new PlantquestUtility(options)
    let img = [2, 5]
    let poly = [
      [2, 2],
      [2, -2],
      [-2, -2],
      [-2, 2],
    ]
    let convertRoomPoly = pqu10.convertRoomPoly(img, poly)
    // params:
    // img - array of single x and single y of img (edit to each y coord)
    // poly - array of coordinate pairs for unprojecting
    // return array of arrays (array of coordinate pairs)
  })

  test('utility-convert_latlng', () => {
    let pqu11 = new PlantquestUtility(options)
    let latlng = [2, 3]
    let convert_latlng = pqu11.convert_latlng(latlng)
    // param: latlng array of x and y for projecting
    // return object with xco and yco (floored lat and lng)
  })

  test('utility-convert_poly_y', () => {
    let pqu12 = new PlantquestUtility(options)
    let img = [2, 3]
    let y = 4
    let convert_poly_y = pqu12.convert_poly_y(img, y)
    // params: img (x and y coords) and single y coord
    // return img[1] - y
  })

  test('utility-c_asset_coords', () => {
    let pqu13 = new PlantquestUtility(options)
    let x = 1
    let y = 2
    let c_asset_coords = pqu13.c_asset_coords(x, y)
    // params: single x and single y for unproject
    // return unproject return value (array?)
  })

  test('utility-make_parent_key', () => {
    let pqu14 = new PlantquestUtility(options)
    let relate = { p: 'map~building~level' }
    let asset = { map: 'mapname', building: 'buildingname', level: 'levelname' }
    let make_parent_key = pqu14.make_parent_key(relate, asset)
    // params: relate ("map~building~level"), asset (object)
    // return "mapname~buildingname~levelname"
  })

  test('utility-make_parent_val', () => {
    let pqu15 = new PlantquestUtility(options)
    let relate = { p: 'map~building~level' }
    let asset = { map: 'mapname', building: 'buildingname', level: 'levelname' }
    let make_parent_val = pqu15.make_parent_val(relate, asset)
    // params: relate ("map~building~level"), asset (object)
    // return asset object (created as new, map: mapname, building: buildingname, etc)
  })

  test('utility-make_child_id', () => {
    let pqu16 = new PlantquestUtility(options)
    let relate = { c: 'building' }
    let asset = { map: 'mapname', building: 'buildingname', level: 'levelname' }
    let make_child_id = pqu16.make_child_id(relate, asset)
    // params: relate (object with value specification), asset (object with target values among others)
    // return asset[relate.c]
  })

  test('utility-insert_child', () => {
    let pqu17 = new PlantquestUtility(options)
    let arr = [2, 4, 6, 8]
    let child = 7
    let insert_child = pqu17.insert_child(arr, child)
    // params: arr: sorted array (Array or Set), child to be inserted
    // return still sorted array with child inserted (order conserved)
  })

  test('utility-injectStyle', () => {
    let pqu18 = new PlantquestUtility(options)
    let injectStyle = pqu18.injectStyle()
    // no params
    // return head where head = $('head') (= document.querySelector('head'))
  })
})
