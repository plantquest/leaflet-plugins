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
    // return string
  })

  // test('utility-fixid', () => {
  //   let pqu3 = new PlantquestUtility(options)
  //   let fixid = pqu3.fixid(null)
  //   // return string with conditions
  // })

  test('utility-clear', () => {
    let pqu4 = new PlantquestUtility(options)
    let clear = pqu4.clear()
    // return nothing right now
  })

  test('utility-clone', () => {
    let pqu5 = new PlantquestUtility(options)
    let clone = pqu5.clone(null)
    // return either object or parsed stringified object
  })

  // test('utility-pointInPolygon', () => {
  //   let pqu6 = new PlantquestUtility(options)
  //   let pointInPolygon = pqu6.pointInPolygon(null, null, null, null)
  //   // return self.pipnested or self.pipflat
  // })

  // test('utility-pointInPolygonFlat', () => {
  //   let pqu7 = new PlantquestUtility(options)
  //   let pointInPolygonFlat = pqu7.pointInPolygonFlat(null, null, null, null)
  //   // return boolean
  // })

  // test('utility-pointInPolygonNested', () => {
  //   let pqu8 = new PlantquestUtility(options)
  //   let pointInPolygonNested = pqu8.pointInPolygonNested(null, null, null, null)
  //   // return boolean
  // })

  // test('utility-convertPoly', () => {
  //   let pqu9 = new PlantquestUtility(options)
  //   let convertPoly = pqu9.convertPoly(null)
  //   // return array
  // })

  // test('utility-convertRoomPoly', () => {
  //   let pqu10 = new PlantquestUtility(options)
  //   let convertRoomPoly = pqu10.convertRoomPoly(null, null)
  //   // return array
  // })

  // test('utility-convert_latlng', () => {
  //   let pqu11 = new PlantquestUtility(options)
  //   let convert_latlng = pqu11.convert_latlng(null)
  //   // return object with xco and yco (floored lat and lng)
  // })

  // test('utility-convert_poly_y', () => {
  //   let pqu12 = new PlantquestUtility(options)
  //   let convert_poly_y = pqu12.convert_poly_y(null, null)
  //   // return img[1] - y
  // })

  // test('utility-c_asset_coords', () => {
  //   let pqu13 = new PlantquestUtility(options)
  //   let c_asset_coords = pqu13.c_asset_coords(null, null)
  //   // return unproject return value (array?)
  // })

  // test('utility-make_parent_key', () => {
  //   let pqu14 = new PlantquestUtility(options)
  //   let make_parent_key = pqu14.make_parent_key(null, null)
  //   // return p of relate, split map and rejoin
  // })

  // test('utility-make_parent_val', () => {
  //   let pqu15 = new PlantquestUtility(options)
  //   let make_parent_val = pqu15.make_parent_val(null, null)
  //   // return p of relate, split and reduce
  // })

  // test('utility-make_child_id', () => {
  //   let pqu16 = new PlantquestUtility(options)
  //   let make_child_id = pqu16.make_child_id(null, null)
  //   // return asset[relate.c]
  // })

  test('utility-insert_child', () => {
    let pqu17 = new PlantquestUtility(options)
    let insert_child = pqu17.insert_child(null, null)
    // return array?
  })

  test('utility-injectStyle', () => {
    let pqu18 = new PlantquestUtility(options)
    let injectStyle = pqu18.injectStyle()
    // return head?
  })
})