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

    it("it appends elements to the beginning of a lazy linked list", () => {
        const one = Lazy.pure(1)
        const lazyList = LazyList.fromArray([2, 3, 4, 5])

        expect([...lazyList.cons(one)].map(e => e?.value)).to.deep.equal([
            1,
            2,
            3,
            4,
            5
        ])
    })

    it("it appends elements to the end of a lazy linked list", () => {
        const five = Lazy.pure(5)
        const lazyList = LazyList.fromArray([1, 2, 3, 4])

        expect([...lazyList.snoc(five)].map(e => e?.value)).to.deep.equal([
            1,
            2,
            3,
            4,
            5
        ])
    })
})
