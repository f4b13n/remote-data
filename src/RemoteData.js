import curry from 'ramda/src/curry'
import prepend from 'ramda/src/prepend'


class NotAsked {

  constructor() {
    this.tag = 'NotAsked'
  }

  isNotAsked() {
    return true
  }

  isFetching() {
    return false
  }

  isFailure() {
    return false
  }

  isSuccess() {
    return false
  }

  map(f) {
    return this
  }

  ap(fab) {
    return this
  }

  chain(f) {
    return this
  }

  fold(cases) {
    return cases.NotAsked()
  }

  getOrElse(a) {
    return a
  }

  get() {
    throw new TypeError('Can\'t extract the value of a NotAsked')
  }
}

class Fetching {

  constructor() {
    this.tag = 'Fetching'
  }

  isNotAsked() {
    return false
  }

  isFetching() {
    return true
  }

  isFailure() {
    return false
  }

  isSuccess() {
    return false
  }

  map(f) {
    return this
  }

  ap(fab) {
    return this
  }

  chain(f) {
    return this
  }
  fold(cases) {
    return cases.Fetching()
  }

  getOrElse(a) {
    return a
  }

  get() {
    throw new TypeError('Can\'t extract the value of a Fetching')
  }
}

class Failure {

  constructor(error) {
    this.tag = 'Failure'
    this.error = error
  }

  isNotAsked() {
    return false
  }

  isFetching() {
    return false
  }

  isFailure() {
    return true
  }

  isSuccess() {
    return false
  }

  map(f) {
    return this
  }

  ap(fab) {
    return this
  }

  chain(f) {
    return this
  }

  fold(cases) {
    return cases.Failure(this.error)
  }

  getOrElse(a) {
    return a
  }

  get() {
    throw new TypeError('Can\'t extract the value of a Failure')
  }
}

class Success {

  constructor(value) {
    this.tag = 'Success'
    this.value = value
  }

  isNotAsked() {
    return false
  }

  isFetching() {
    return false
  }

  isFailure() {
    return false
  }

  isSuccess() {
    return true
  }

  map(f) {
    return new Success(f(this.value))
  }

  ap(mf) {
    return mf.map(f => f(this.value))
  }

  chain(f) {
    return f(this.value)
  }

  fold(cases) {
    return cases.Success(this.value)
  }

  getOrElse(a) {
    return this.value
  }

  get() {
    return this.value
  }
}


const NOT_ASKED = new NotAsked()

const FETCHING = new Fetching()


export function notAsked() {
  return NOT_ASKED
}

export function fetching() {
  return FETCHING
}

export function failure(e) {
  return new Failure(e)
}

export function success(a) {
  return new Success(a)
}

export function isNotAsked(fa) {
  return fa.isNotAsked()
}

export function isFetching(fa) {
  return fa.isFetching()
}

export function isFailure(fa) {
  return fa.isFailure()
}

export function isSuccess(fa) {
  return fa.isSuccess()
}

export const map = curry(function _map(f, fa) {
  return fa.map(f)
})

export const ap = curry(function _ap(fab, fa) {
  return fa.ap(fab)
})

export const chain = curry(function _chain(f, fa) {
  return fa.chain(f)
})

export const fold = curry(function _fold(cases, fa) {
  return fa.fold(cases)
})

export const getOrElse = curry(function _getOrElse(a, fa) {
 return fa.getOrElse(a)
})

export function get(fa) {
  return fa.get()
}

export function all(arr) {
  return arr.reduceRight((acc, it) => ap(map(prepend, it), acc), new Success([]))
}
