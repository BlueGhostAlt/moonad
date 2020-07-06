# Lazy Evaluation

## Using the Lazy class

To use the lazy wrapper for values, simply import the Lazy class exported from the package:

```typescript
import { Lazy } from "@blueghost/moonad"
```

## Examples

### Wrapping a value in a lazy instance

There are two ways of achieving this:

```typescript
// Creating a lazy instance from an unevaluated value
const lazyVal = Lazy.lazy(() => 3)

console.log(lazyVal) // Lazy { _value: { value: [Function (anonymous)], lazy: true } }
console.log(lazyVal.value) // 3
console.log(lazyVal) // Lazy { _value: { lazy: false, value: 3 } }

// Creating a lazy instance from an evaluated value
const greedyVal = Lazy.pure(3)

console.log(lazyVal) // Lazy { _value: { lazy: false, value: 3 } }
console.log(lazyVal.value) // 3
```

### Operations on lazy values

```typescript
// Mapping a lazy instance
import { Lazy } from "@blueghost/moonad"

const lazyVal = Lazy.lazy(() => 3)

const mapper = <T>(x: T): [T, T, T] => [x, x, x]

const mappedVal = lazyVal.map(mapper)

console.log(lazyVal.value) // 3
console.log(mappedVal.value) // [3, 3, 3]

// Binding a lazy instance
import { Lazy } from "@blueghost/moonad"

const lazyVal = Lazy.lazy(() => 3)

const binder = <T>(x: T): Lazy<[T, T, T]> => Lazy.lazy(() => [x, x, x])

const bindedVal = lazyVal.bind(binder)

console.log(lazyVal.value) // 3
console.log(bindedVal.value) // [3, 3, 3]
```
