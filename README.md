# Moonad

## Typed Functinal Utility Library for Library

### `moonad` brings to the table well-known patterns and features from strongly typed functional languages to TypeScript

#### Features

So far it only supports Lazy evaluation but more features will come down the road:

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
