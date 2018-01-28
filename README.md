# Remote Data

Data model that represents the four states of an HTTP request :
* we haven’t asked yet
* we’ve asked, but we haven’t got a response yet
* we got a response, but it was an error
* we got a response, and it was the data we wanted

## Example

Given a [_Redux_](https://redux.js.org/) application with the following actions :

```js
// @flow
export type Action =
  | { type: 'data/FETCH_REQUEST' }
  | { type: 'data/FETCH_FAILURE', error: Error }
  | { type: 'data/FETCH_SUCCESS', data: string[] }
```

Here's a simple reducer :

```js
// @flow
import type { RemoteData } from 'remote-data'
import type { Action } from './actions'

import { notAsked, failure, fetching, success } from 'remote-data'


export type State = RemoteData<Error, string[]>


const initialState = notAsked()

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    'data/FETCH_REQUEST':
      return fetching()
    'data/FETCH_FAILURE':
      return failure(action.error)
    'data/FETCH_SUCCESS':
      return success(action.data)
    default:
      return state
  }
}
```

And a [_React_](https://reactjs.org/) component :

```js
//@flow
import type { RemoteData } from 'remote-data'
import type { State } from './reducer'

import * as React from 'react'
import { connect } from 'react-redux'


type Props = {
  data: RemoteData<Error, string[]>
}


const MyComponent = (props: Props) => {
  return props.data.fold({
    NotAsked: () => <span>No data</span>,
    Fetching: () => <span>Loading...</span>,
    Failure: error => <span>Error : {error.toString()}</span>,
    Success: data => <span>Data : {data.join(', ')}</span>
  })
}


const mapStateToProps = (state: State) => ({
  data: state
})

export default connect(mapStateToProps)(MyComponent)
```

## API

`notAsked :: () -> RemoteData e a`

`fetching :: () -> RemoteData e a`

`failure :: e -> RemoteData e a`

`success :: a -> RemoteData e a`

`all :: [RemoteData e a] -> RemoteData e [a]`

`RemoteData#isNothing :: RemoteData e a ~> () -> Boolean`

`RemoteData#isFetching :: RemoteData e a ~> () -> Boolean`

`RemoteData#isFailure :: RemoteData e a ~> () -> Boolean`

`RemoteData#isSuccess :: RemoteData e a ~> () -> Boolean`

`RemoteData#map :: RemoteData e a ~> (a -> b) -> RemoteData e b`

`RemoteData#ap :: RemoteData e a ~> Maybe (a -> b) -> RemoteData e b`

`RemoteData#chain :: RemoteData e a ~> (a -> RemoteData e b) -> RemoteData e b`

`RemoteData#getOrElse :: RemoteData e a ~> a -> a`

`RemoteData#fold :: RemoteData e a ~> { Nothing: () -> b, Just: a -> b } -> b`

:warning: `RemoteData#get :: RemoteData e a ~> () -> a`

## Inspirations

* [How Elm Slays a UI Antipattern ?](http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html)
* [Slaying a UI Antipattern in Fantasyland](https://medium.com/javascript-inside/slaying-a-ui-antipattern-in-fantasyland-907cbc322d2a)
* [Slaying a UI Antipattern with Flow](https://medium.com/@gcanti/slaying-a-ui-antipattern-with-flow-5eed0cfb627b)
