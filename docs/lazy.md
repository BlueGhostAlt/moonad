# Lazy Evaluation

## Using the Lazy class

To use the lazy wrapper for values, simply import the Lazy class exported from the package:

```typescript
import { Lazy } from "@blueghost/moonad"
```

### Factories

#### lazy

```typescript
const lazyVal = Lazy.lazy(() => 3)

console.log(lazyVal) // Lazy { _value: { value: [Function (anonymous)], lazy: true } }
console.log(lazyVal.value) // 3
console.log(lazyVal) // Lazy { _value: { lazy: false, value: 3 } }
```

#### pure

```typescript
const greedyVal = Lazy.pure(3)

console.log(lazyVal) // Lazy { _value: { lazy: false, value: 3 } }
console.log(lazyVal.value) // 3
```

### Methods

#### map

```typescript
export type map<T, U> = (mapper: (value: T) => U): Lazy<U>
```

```typescript
import { Lazy } from "@blueghost/moonad"

const lazyVal = Lazy.lazy(() => 3)

const mapper = <T>(x: T): [T, T, T] => [x, x, x]

const mappedVal = lazyVal.map(mapper)

console.log(lazyVal.value) // 3
console.log(mappedVal.value) // [3, 3, 3]
```

#### bind

```typescript
export type bind<T, U> = (binder: (value: T) => Lazy<U>): Lazy<U>
```

```typescript
import { Lazy } from "@blueghost/moonad"

const lazyVal = Lazy.lazy(() => 3)

const binder = <T>(x: T): Lazy<[T, T, T]> => Lazy.lazy(() => [x, x, x])

const bindedVal = lazyVal.bind(binder)

console.log(lazyVal.value) // 3
console.log(bindedVal.value) // [3, 3, 3]
```
