import { Lazy } from "./Lazy"
import { expect } from "chai"

describe("Lazy class", () => {
    it("it caches values once evaluated", () => {
        const value = Math.random()

        const lazyVal = Lazy.lazy(() => value)

        expect(lazyVal.value).to.deep.equal(value)
        expect(lazyVal.value).to.deep.equal(value)
    })

    it("it wraps evaluated values in a lazy instanfce", () => {
        const value = Math.random()

        const greedyVal = Lazy.pure(value)

        expect(greedyVal.value).to.deep.equal(value)
    })

    it("it maps a lazy value", () => {
        const value = Math.random()

        const greedyVal = Lazy.pure(value)
        const lazyVal = Lazy.lazy(() => value)

        const mapper = (x: number) => x * 2

        expect(greedyVal.map(mapper).value).to.deep.equal(mapper(value))
        expect(lazyVal.map(mapper).value).to.deep.equal(mapper(value))
    })

    it("it binds a lazy value", () => {
        const value = Math.random()

        const greedyVal = Lazy.pure(value)
        const lazyVal = Lazy.lazy(() => value)

        const binder = (x: number) => Lazy.lazy(() => x * 2)

        expect(greedyVal.bind(binder).value).to.deep.equal(binder(value).value)
        expect(lazyVal.bind(binder).value).to.deep.equal(binder(value).value)
    })

    it("it applies a lazy value", () => {
        const value = Math.random()

        const greedyVal = Lazy.pure(value)
        const lazyVal = Lazy.lazy(() => value)

        const lazyApplier = Lazy.lazy(() => (x: number) => x * 2)
        const greedyApplier = Lazy.pure((x: number) => x * 2)

        expect(greedyVal.apply(lazyApplier).value).to.deep.equal(
            lazyApplier.value(value)
        )
        expect(lazyVal.apply(lazyApplier).value).to.deep.equal(
            lazyApplier.value(value)
        )
        expect(greedyVal.apply(greedyApplier).value).to.deep.equal(
            greedyApplier.value(value)
        )
        expect(lazyVal.apply(greedyApplier).value).to.deep.equal(
            greedyApplier.value(value)
        )
    })
})
