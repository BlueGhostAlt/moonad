# Moonad

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/BlueGhostGH/moonad/Test/develop?logo=github-actions&logoColor=ffffff&style=for-the-badge) ![Code Climate coverage](https://img.shields.io/codeclimate/coverage/BlueGhostGH/moonad?logo=code-climate&style=for-the-badge) ![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/BlueGhostGH/moonad?logo=code-climate&style=for-the-badge) ![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/BlueGhostGH/moonad?logo=code-climate&style=for-the-badge)

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@blueghost/moonad?logo=npm&style=for-the-badge) ![npm](https://img.shields.io/npm/dw/@blueghost/moonad?color=blue&logo=npm&style=for-the-badge) ![npm](https://img.shields.io/npm/v/@blueghost/moonad?color=black&label=npm%20version&logo=npm&style=for-the-badge) ![npm type definitions](https://img.shields.io/npm/types/@blueghost/moonad?logo=typescript&style=for-the-badge)

## Typed Functional Utility Library for TypeScript

### `moonad` brings to the table well-known patterns and features from strongly typed functional languages to TypeScript

#### Features

So far it only supports Lazy evaluation but more features will come down the road:

```typescript
// Creating a lazy instance from an unevaluated value
import { Lazy } from "@blueghost/moonad"

const lazyVal = Lazy.lazy(() => 3)

console.log(lazyVal) // Lazy { _value: { value: [Function (anonymous)], lazy: true } }
console.log(lazyVal.value) // 3
console.log(lazyVal) // Lazy { _value: { lazy: false, value: 3 } }

// Creating a lazy instance from an evaluated value
import { Lazy } from "@blueghost/moonad"

const greedyVal = Lazy.pure(3)

console.log(lazyVal) // Lazy { _value: { lazy: false, value: 3 } }
console.log(lazyVal.value) // 3

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
