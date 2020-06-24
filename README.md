# Moonad

## Typed Functinal Utility Library for Library

### `moonad` brings to the table well-known patterns and features from strongly typed functional languages to TypeScript

#### Features

So far it only supports Lazy evaluation but more features will come down the road:

```typescript
const lazyVal = Lazy.lazy(() => 3)

console.log(lazyVal) // Lazy { _value: { value: [Function (anonymous)], lazy: true } }
console.log(lazyVal.value) // 3
console.log(lazyVal) // Lazy { _value: { lazy: false, value: 3 } }
```
