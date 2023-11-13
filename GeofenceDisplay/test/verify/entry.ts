interface JesterState {
  describe: any
  unit: any
  fail: any
}

interface JesterWindow extends Window {
  Jester: {
    exclude: any
    state: JesterState
  }
  describe: (name: any, tests: () => void) => void
  test: (name: any, unit: () => void) => void
  expect: (sval: any) => {
    toEqual: (cval: any) => void
    toBeTruthy: (cval: any) => void
    toBeFalsy: (cval: any) => void
    toBeDefined: (cval: any) => void
    toBeUndefined: (cval: any) => void
    toMatch: (cval: any) => void
    toThrow: (cval: any) => void
    toMatchObject: (cval: any) => void
  }
}

interface Window {
  describe: (name: any, tests: () => void) => void
  test: (name: any, unit: () => void) => void
  expect: (sval: any) => {
    toEqual: (cval: any) => void
    toBeTruthy: (cval: any) => void
    toBeFalsy: (cval: any) => void
    toBeDefined: (cval: any) => void
    toBeUndefined: (cval: any) => void
    toMatch: (cval: any) => void
    toThrow: (cval: any) => void
    toMatchObject: (cval: any) => void
  }
}

const Jester: JesterWindow['Jester'] = {
  exclude: [],
  state: {
    describe: {},
    unit: {},
    fail: {},
  },
}

function stringify(o: any): string {
  if (null === o) return 'null'
  if ('symbol' === typeof o) return String(o)
  if ('object' !== typeof o) return '' + o
  return JSON.stringify(
    Object.keys(o)
      .sort()
      .reduce((a, k) => ((a[k] = o[k]), a), {}),
    stringify
  )
}

function print(s: string): void {
  const test = document.getElementById('test')
  if (test) {
    test.innerHTML = test.innerHTML + s + '<br>'
  }
}

window.describe = function (name: string, tests: () => void): void {
  Jester.state.describe = { name }
  tests()
}

window.test = function (name: string, unit: () => void): void {
  if (Jester.exclude.includes(name)) return

  try {
    Jester.state.unit = { name }
    unit()
    print('PASS: ' + name)
  } catch (e) {
    console.log(e)
    print('FAIL: ' + name)
    print(e.message + '<br><pre>' + e.stack + '</pre>')
  }
}

window.expect = function (sval: any): any {
  function pass(cval: any, ok: boolean): void {
    if (!ok) {
      const state = Jester.state
      state.fail.found = sval
      state.fail.expected = cval
      const err = new Error(
        'FAIL: ' + state.describe.name + ' ' + state.unit.name
      )
      throw err
    }
  }

  function passEqualJSON(cval: any): void {
    const sjson = stringify(sval)
    const cjson = stringify(cval)

    const ok = sjson === cjson
    pass(cval, ok)
  }

  return {
    toEqual: (cval: any): void => {
      passEqualJSON(cval)
    },
    toBeTruthy: (cval: any): void => pass(cval, !!cval),
    toBeFalsy: (cval: any): void => pass(cval, !cval),
    toBeDefined: (cval: any): void => pass(cval, undefined !== sval),
    toBeUndefined: (cval: any): void => pass(cval, undefined === sval),
    toMatch: (cval: any): void => pass(cval, sval.match(cval)),
    toThrow: (cval: any): void => {
      try {
        sval()
        pass(cval, false)
      } catch (e) {
        pass(cval, true)
      }
    },
    toMatchObject: (cval: any): void => {
      passEqualJSON(cval)
    },
  }
}

import '../geofence-display.test.ts'
