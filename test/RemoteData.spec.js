// @flow
import tape from 'tape'
import * as R from '../src/RemoteData'


const toUpperCase = (s: string) => s.toUpperCase()


tape('NotAsked#isNotAsked', t => {
  t.ok(R.notAsked().isNotAsked())
  t.end()
})

tape('NotAsked#isFetching', t => {
  t.notOk(R.notAsked().isFetching())
  t.end()
})

tape('NotAsked#isFailure', t => {
  t.notOk(R.fetching().isFailure())
  t.end()
})

tape('NotAsked#isSuccess', t => {
  t.notOk(R.notAsked().isSuccess())
  t.end()
})

tape('NotAsked#map', t => {
  t.is(R.notAsked().map(toUpperCase), R.notAsked())
  t.end()
})

tape('NotAsked#ap', t => {
  t.is(R.notAsked().ap(R.notAsked()), R.notAsked())
  t.is(R.notAsked().ap(R.fetching()), R.notAsked())
  t.is(R.notAsked().ap(R.failure()), R.notAsked())
  t.is(R.notAsked().ap(R.success(toUpperCase)), R.notAsked())
  t.end()
})

tape('NotAsked#chain', t => {
  t.is(R.notAsked().chain(R.notAsked), R.notAsked())
  t.is(R.notAsked().chain(R.fetching), R.notAsked())
  t.is(R.notAsked().chain(R.failure), R.notAsked())
  t.is(R.notAsked().chain(R.success), R.notAsked())
  t.end()
})

tape('NotAsked#fold', t => {
  R.notAsked().fold({
    NotAsked: t.pass,
    Fetching: t.fail,
    Failure: t.fail,
    Success: t.fail
  })
  t.end()
})

tape('NotAsked#get', t => {
  try {
    R.notAsked().get()
    t.fail('should throw an error')
  } catch (e) {
    t.pass('should throw an error')
  }
  t.end()
})

tape('NotAsked#getOrElse', t => {
  t.is(R.notAsked().getOrElse('bar'), 'bar')
  t.end()
})

tape('Fetching#isNotAsked', t => {
  t.notOk(R.fetching().isNotAsked())
  t.end()
})

tape('Fetching#isFetching', t => {
  t.ok(R.fetching().isFetching())
  t.end()
})

tape('Fetching#isFailure', t => {
  t.notOk(R.fetching().isFailure())
  t.end()
})

tape('Fetching#isSuccess', t => {
  t.notOk(R.fetching().isSuccess())
  t.end()
})

tape('Fetching#map', t => {
  t.is(R.fetching().map(toUpperCase), R.fetching())
  t.end()
})

tape('Fetching#ap', t => {
  t.is(R.fetching().ap(R.notAsked()), R.fetching())
  t.is(R.fetching().ap(R.fetching()), R.fetching())
  t.is(R.fetching().ap(R.failure()), R.fetching())
  t.is(R.fetching().ap(R.success(toUpperCase)), R.fetching())
  t.end()
})

tape('Fetching#chain', t => {
  t.is(R.fetching().chain(R.notAsked), R.fetching())
  t.is(R.fetching().chain(R.fetching), R.fetching())
  t.is(R.fetching().chain(R.failure), R.fetching())
  t.is(R.fetching().chain(R.success), R.fetching())
  t.end()
})

tape('Fetching#fold', t => {
  R.fetching().fold({
    NotAsked: t.fail,
    Fetching: t.pass,
    Failure: t.fail,
    Success: t.fail
  })
  t.end()
})

tape('Fetching#get', t => {
  try {
    R.fetching().get()
    t.fail('should throw an error')
  } catch (e) {
    t.pass('should throw an error')
  }
  t.end()
})

tape('Fetching#getOrElse', t => {
  t.is(R.fetching().getOrElse('bar'), 'bar')
  t.end()
})

tape('Failure#isNotAsked', t => {
  t.notOk(R.failure('error').isNotAsked())
  t.end()
})

tape('Failure#isFetching', t => {
  t.notOk(R.failure('error').isFetching())
  t.end()
})

tape('Failure#isFailure', t => {
  t.ok(R.failure('error').isFailure())
  t.end()
})

tape('Failure#isSuccess', t => {
  t.notOk(R.failure('error').isSuccess())
  t.end()
})

tape('Failure#map', t => {
  const failure = R.failure('error')
  t.is(failure.map(toUpperCase), failure)
  t.end()
})

tape('Failure#ap', t => {
  const failure = R.failure('error')
  t.is(failure.ap(R.notAsked()), failure)
  t.is(failure.ap(R.fetching()), failure)
  t.is(failure.ap(R.failure()), failure)
  t.is(failure.ap(R.success(toUpperCase)), failure)
  t.end()
})

tape('Failure#chain', t => {
  const failure = R.failure('error')
  t.is(failure.chain(R.notAsked), failure)
  t.is(failure.chain(R.fetching), failure)
  t.is(failure.chain(R.failure), failure)
  t.is(failure.chain(R.success), failure)
  t.end()
})

tape('Failure#fold', t => {
  R.failure('error').fold({
    NotAsked: t.fail,
    Fetching: t.fail,
    Failure: e => t.is(e, 'error'),
    Success: t.fail
  })
  t.end()
})

tape('Failure#get', t => {
  try {
    R.failure('error').get()
    t.fail('should throw an error')
  } catch (e) {
    t.pass('should throw an error')
  }
  t.end()
})

tape('Failure#getOrElse', t => {
  t.is(R.failure('error').getOrElse('bar'), 'bar')
  t.end()
})

tape('Success#isNotAsked', t => {
  t.notOk(R.success('foo').isNotAsked())
  t.end()
})

tape('Success#isFetching', t => {
  t.notOk(R.success('foo').isFetching())
  t.end()
})

tape('Success#isFailure', t => {
  t.notOk(R.success('foo').isFailure())
  t.end()
})

tape('Success#isSuccess', t => {
  t.ok(R.success('foo').isSuccess())
  t.end()
})

tape('Success#map', t => {
  t.same(R.success('foo').map(toUpperCase), R.success('FOO'))
  t.end()
})

tape('Success#ap', t => {
  const failure = R.failure('error')
  t.is(R.success('foo').ap(R.notAsked()), R.notAsked())
  t.is(R.success('foo').ap(R.fetching()), R.fetching())
  t.is(R.success('foo').ap(failure), failure)
  t.same(R.success('foo').ap(R.success(toUpperCase)), R.success('FOO'))
  t.end()
})

tape('Success#chain', t => {
  t.is(R.success('foo').chain(R.notAsked), R.notAsked())
  t.is(R.success('foo').chain(R.fetching), R.fetching())
  t.same(R.success('foo').chain(R.failure), R.failure('foo'))
  t.same(R.success('foo').chain(R.success), R.success('foo'))
  t.end()
})

tape('Success#fold', t => {
  R.success('foo').fold({
    NotAsked: t.fail,
    Fetching: t.fail,
    Failure: t.fail,
    Success: v => t.is(v, 'foo')
  })
  t.end()
})

tape('Success#get', t => {
  t.is(R.success('foo').get(), 'foo')
  t.end()
})

tape('Success#getOrElse', t => {
  t.is(R.success('foo').getOrElse('bar'), 'foo')
  t.end()
})

tape('RemoteData#all', t => {
  t.is(R.all([R.notAsked(), R.fetching()]), R.fetching())
  t.is(R.all([R.fetching(), R.notAsked()]), R.notAsked())
  t.is(R.all([R.success('foo'), R.fetching()]), R.fetching())
  t.is(R.all([R.fetching(), R.success('foo')]), R.fetching())
  t.same(R.all([R.success('foo'), R.success('bar')]), R.success(['foo', 'bar']))
  t.end()
})
