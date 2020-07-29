import { expect } from "chai"

import { Lazy } from "./Lazy"
import { LazyList } from "./LazyList"

describe("Lazy linked list class", () => {
    it("it constructs instances from arrays", () => {
        const array = [1, 2, 3]

        const lazyList = LazyList.fromArray(array)

        expect([...lazyList].map(e => e?.value)).to.deep.equal(array)
    })

    it("it constructs instances from arrays of lazy elements", () => {
        const array = [
            Lazy.lazy(() => 1),
            Lazy.lazy(() => 2),
            Lazy.lazy(() => 3)
        ]

        const lazyList = LazyList.fromArrayOfLazy(array)

        expect([...lazyList].map(e => e?.value)).to.deep.equal(
            array.map(e => e?.value)
        )
    })
})
