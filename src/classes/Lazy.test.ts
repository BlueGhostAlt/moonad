import { Lazy } from "./Lazy"
import { expect } from "chai"

describe("Lazy class", () => {
    it("caches values once evaluated", () => {
        const value = Math.random()

        const lazyVal = Lazy.lazy(() => value)

        expect(lazyVal.value).to.deep.equal(value)
        expect(lazyVal.value).to.deep.equal(value)
    })
})
