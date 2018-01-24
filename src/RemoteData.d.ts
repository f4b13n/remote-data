export type RemoteData<E, A> =
  | NotAsked<E, A>
  | Fetching<E, A>
  | Failure<E, A>
  | Success<E, A>

interface CaseOf<E, A, B> {
  NotAsked: () => B;
  Fetching: () => B;
  Failure: (e: E) => B;
  Success: (a: A) => B;
}

interface NotAsked<E, A> {
  readonly tag: 'NotAsked';
  isNotAsked(): boolean;
  isFetching(): boolean;
  isFailure(): boolean;
  isSuccess(): boolean;
  map<B>(f: (a: A) => B): RemoteData<E, B>;
  ap<B>(fab: RemoteData<E, (a: A) => B>): RemoteData<E, B>;
  chain<B>(f: (a: A) => RemoteData<E, B>): RemoteData<E, B>;
  fold<R>(cases: CaseOf<E, A, R>): R;
  getOrElse(a: A): A;
  get(): A;
}

interface Fetching<E, A> {
  readonly tag: 'Fetching';
  isNotAsked(): boolean;
  isFetching(): boolean;
  isFailure(): boolean;
  isSuccess(): boolean;
  map<B>(f: (a: A) => B): RemoteData<E, B>;
  ap<B>(fab: RemoteData<E, (a: A) => B>): RemoteData<E, B>;
  chain<B>(f: (a: A) => RemoteData<E, B>): RemoteData<E, B>;
  fold<R>(cases: CaseOf<E, A, R>): R;
  getOrElse(a: A): A;
  get(): A;
}

interface Failure<E, A> {
  readonly tag: 'Failure';
  readonly error: E;
  isNotAsked(): boolean;
  isFetching(): boolean;
  isFailure(): boolean;
  isSuccess(): boolean;
  map<B>(f: (a: A) => B): RemoteData<E, B>;
  ap<B>(fab: RemoteData<E, (a: A) => B>): RemoteData<E, B>;
  chain<B>(f: (a: A) => RemoteData<E, B>): RemoteData<E, B>;
  fold<R>(cases: CaseOf<E, A, R>): R;
  getOrElse(a: A): A;
  get(): A;
}

interface Success<E, A> {
  readonly tag: 'Success';
  readonly value: A;
  isNotAsked(): boolean;
  isFetching(): boolean;
  isFailure(): boolean;
  isSuccess(): boolean;
  map<B>(f: (a: A) => B): RemoteData<E, B>;
  ap<B>(fab: RemoteData<E, (a: A) => B>): RemoteData<E, B>;
  chain<B>(f: (a: A) => RemoteData<E, B>): RemoteData<E, B>;
  fold<R>(cases: CaseOf<E, A, R>): R;
  getOrElse(a: A): A;
  get(): A;
}

declare var notAsked: <E, A>() => RemoteData<E, A>

declare var fetching: <E, A>() => RemoteData<E, A>

declare var failure: <E, A>(e: E) => RemoteData<E, A>

declare var success: <E, A>(a: A) => RemoteData<E, A>

declare var isNotAsked: <E, A>(fa: RemoteData<E, A>) => boolean

declare var isFetching: <E, A>(fa: RemoteData<E, A>) => boolean

declare var isFailure: <E, A>(fa: RemoteData<E, A>) => boolean

declare var isSuccess: <E, A>(fa: RemoteData<E, A>) => boolean

declare var map:
  & (<E, A, B>(f: (a: A) => B, fa: RemoteData<E, A>) => RemoteData<E, B>)
  & (<E, A, B>(f: (a: A) => B) => (fa: RemoteData<E, A>) => RemoteData<E, B>)

declare var ap:
  & (<E, A, B>(fab: RemoteData<E, (a: A) => B>, fa: RemoteData<E, A>) => RemoteData<E, B>)
  & (<E, A, B>(fab: RemoteData<E, (a: A) => B>) => (fa: RemoteData<E, A>) => RemoteData<E, B>)

declare var chain:
  & (<E, A, B>(f: (a: A) => RemoteData<E, B>, fa: RemoteData<E, A>) => RemoteData<E, B>)
  & (<E, A, B>(f: (a: A) => RemoteData<E, B>) => (fa: RemoteData<E, A>) => RemoteData<E, B>)

declare var fold:
  & (<E, A, T>(cases: CaseOf<E, A, T>, fa: RemoteData<E, A>) => T)
  & (<E, A, T>(cases: CaseOf<E, A, T>) => (fa: RemoteData<E, A>) => T)

declare var getOrElse:
  & (<E, A>(a: A, fa: RemoteData<E, A>) => A)
  & (<E, A>(a: A) => (fa: RemoteData<E, A>) => A)

declare var get: <E, A>(fa: RemoteData<E, A>) => A

declare var all: <E, A>(arr: RemoteData<E, A>[]) => RemoteData<E, A[]>
