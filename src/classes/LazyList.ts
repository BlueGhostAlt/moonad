import { Lazy } from "./Lazy"

type LazyListNode<T> = Lazy<{
    head: Lazy<T>
    tail: LazyListNode<T>
} | null>

export class LazyList<T> {
    private _value: LazyListNode<T>

    private static fromElement<T>(value: LazyListNode<T>): LazyList<T> {
        return new this(value)
    }

    constructor(value: LazyListNode<T>) {
        this._value = value
    }

    static fromArray<T>(xs: T[]): LazyList<T> {
        const toElem = (xs: T[]): LazyListNode<T> => {
            const [y, ...ys] = xs

            return Lazy.lazy(() => {
                if (!xs.length) return null

                return {
                    head: Lazy.pure(y),
                    tail: toElem(ys)
                }
            })
        }

        return new this(toElem(xs))
    }

    static fromArrayOfLazy<T>(xs: Lazy<T>[]): LazyList<T> {
        const toElem = (xs: Lazy<T>[]): LazyListNode<T> => {
            const [y, ...ys] = xs

            return Lazy.lazy(() => {
                if (!xs.length) return null

                return {
                    head: y,
                    tail: toElem(ys)
                }
            })
        }

        return new this(toElem(xs))
    }

    public get head(): Lazy<T> | null {
        if (!this._value.value) return null

        return this._value.value.head
    }

    public get tail(): LazyList<T> | null {
        if (!this._value.value) return null

        return LazyList.fromElement(this._value.value.tail)
    }

    [Symbol.iterator]() {
        return {
            head: this.head,
            tail: this.tail,

            next() {
                if (!this.tail) {
                    return { done: true }
                }

                const x = this.head
                this.head = this.tail.head
                this.tail = this.tail.tail

                return { done: false, value: x }
            }
        }
    }
}
