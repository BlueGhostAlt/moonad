import { Lazy } from "./Lazy"

type LazyListNode<T> = Lazy<{
    head: Lazy<T>
    tail: LazyListNode<T>
} | null>

export class LazyList<T> {
    private _value: LazyListNode<T>

    constructor(value: LazyListNode<T>) {
        this._value = value
    }

    private static fromElement<T>(value: LazyListNode<T>): LazyList<T> {
        return new this(value)
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

            next(): { done: true } | { done: false; value: Lazy<T> | null } {
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

    public cons(x: Lazy<T>): LazyList<T> {
        return LazyList.fromElement(Lazy.pure({ head: x, tail: this._value }))
    }

    public snoc(x: Lazy<T>): LazyList<T> {
        if (this.tail) {
            return this.tail.snoc(x).cons(this.head!)
        } else {
            return LazyList.fromElement(
                Lazy.pure({ head: x, tail: Lazy.pure(null) })
            )
        }
    }
}
