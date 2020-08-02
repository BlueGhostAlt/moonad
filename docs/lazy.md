<!-- omit in toc -->
# Lazy Evaluation

<!-- omit in toc -->
## Table of contents

- [Using the Lazy class](#using-the-lazy-class)
- [Properties](#properties)
  - [value](#value)
- [Factories](#factories)
  - [lazy](#lazy)
  - [pure](#pure)
- [Methods](#methods)
  - [map](#map)
  - [bind](#bind)
  - [extend](#extend)
  - [apply](#apply)
  - [flat](#flat)
  - [join](#join)

### Using the Lazy class

To use the lazy wrapper for values, simply import the Lazy class exported from the package:

```typescript
import { Lazy } from "@blueghost/moonad"
```

### Properties

#### value

Returns the inner value of the lazy instance

```typescript
const lazyVal = Lazy.lazy(() => 3)

console.log(lazyVal.value) // 3
```

### Factories

#### lazy

Creates a lazy instance from an unevaluated value

```typescript
const lazyVal = Lazy.lazy(() => 3)

console.log(lazyVal) // Lazy { _value: { value: [Function (anonymous)], lazy: true } }
console.log(lazyVal.value) // 3
console.log(lazyVal) // Lazy { _value: { lazy: false, value: 3 } }
```

#### pure

Creates a lazy instance from an evaluated value

```typescript
const greedyVal = Lazy.pure(3)

console.log(lazyVal) // Lazy { _value: { lazy: false, value: 3 } }
console.log(lazyVal.value) // 3
```

### Methods

#### map

Applies a transformation on the inner value then wraps everything in an unevaluated lazy instance

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

Applies a transformation on the inner value then wraps the inner value of the result in an unevaluated lazy instance to ensure maximum delay in evaluation

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

#### extend

Applies a transformation on the lazy value then wraps everything in an unevaluated lazy instance

```typescript
export type extend<T, U> = (extender: (value: Lazy<T>) => U): Lazy<U>
```

```typescript
import { Lazy } from "@blueghost/moonad"

const lazyVal = Lazy.lazy(() => 3)

const extender = <T>(x: Lazy<T>): [T, T, T] => {
    const { value } = x

    return [value, value, value]
}

const extendedVal = lazyVal.extend(extender)

console.log(lazyVal.value) // 3
console.log(extendedVal.value) // [3, 3, 3]
```

#### apply

Applies a transformation on the lazy value then wraps everything in an unevaluated lazy instance

```typescript
export type apply<T, U> = (applier: Lazy<(value: T) => U>): Lazy<U>
```

```typescript
import { Lazy } from "@blueghost/moonad"

const lazyVal = Lazy.lazy(() => 3)

const applier = Lazy.pure(<T>(x: T): [T, T, T] => [x, x, x])

const appliedVal = lazyVal.apply(applier)

console.log(lazyVal.value) // 3
console.log(appliedVal.value) // [3, 3, 3]
```

#### flat

Returns the inner lazy value of a nested lazy value

```typescript
export type flat<T> = (): T extends Lazy<infer _> ? T : never
```

```typescript
import { Lazy } from "@blueghost/moonad"

const lazyVal = Lazy.pure(Lazy.lazy(() => 3))

const flattenedVal = lazyVal.flat()

console.log(flattenedVal.value) // 3
```

#### join

Returns the inner lazy value of a double-nested lazy instance

```typescript
export type join<T> = (value: Lazy<Lazy<T>>): Lazy<T>
```

```typescript
import { Lazy } from "@blueghost/moonad"

const lazyVal = Lazy.lazy(() => Lazy.pure(3))

const joinedVal = Lazy.join(lazyVal)

console.log(joinedVal) // Lazy { _value: { lazy: false, value: 3 } }
console.log(joinedVal.value) // 3
```
