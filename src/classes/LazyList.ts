import { Lazy } from "./Lazy"

type LazyListNode<T> = Lazy<{
    head: Lazy<T>
    tail: LazyListNode<T>
} | null>

/**
 * Lazily evaluated linked lists that handles operating on lazy values and allows infinite data structures
 */
export class LazyList<T> {
    private _value: LazyListNode<T>

    /**
     * Creates a lazy instance from either an evaluated or an unevaluated value and a boolean value
     *
     * @example
     * const lazyList: LazyList<number> = new LazyList(
     *     Lazy.pure({ head: Lazy.pure(3), tail: Lazy.pure(null) })
     * )
     *
     * @param value A pre-instantiated lazy linked list with all elelements wrapped in a lazy instance
     */
    constructor(value: LazyListNode<T>) {
        this._value = value
    }

    private static fromElement<T>(value: LazyListNode<T>): LazyList<T> {
        return new this(value)
    }

    /**
     * Creates a lazy linked list instance from an array of values not-yet wrapped in a lazy instance
     *
     * @example
     * const lazyList: LazyList<number> = LazyList.fromArray([3, 3, 3])
     *
     * console.log([...lazyList].map(e => e.val)) // [3, 3, 3]
     *
     * @param xs A regular array of values of the same type
     * @returns A lazy linked list variant of the provided array
     */
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

    /**
     * Creates a lazy linked list instance from an array of values wrapped in a lazy instance
     *
     * @example
     * const three = Lazy.pure(3)
     * const lazyList: LazyList<number> = LazyList.fromArray([three, three, three])
     *
     * console.log([...lazyList].map(e => e.val)) // [3, 3, 3]
     *
     * @param xs A regular array of lazy values of the same type
     * @returns A lazy linked list variant of the provided array
     */
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

    /**
     * Returns the first value of the lazy linked list
     *
     * @example
     * const lazyList: LazyList<number> = new LinkedList(
     *     Lazy.pure({ head: Lazy.pure(3), tail: Lazy.pure(null) })
     * )
     *
     * console.log(lazyList.head) // Lazy { _value: { lazy: false, value: 3 } }
     * console.log(lazyList.head.value) // 3
     */
    public get head(): Lazy<T> | null {
        if (!this._value.value) return null

        return this._value.value.head
    }

    /**
     * Returns the lazy linked list without its head, also known as its tail
     *
     * @example
     * const lazyList: LazyList<number> = new LazyList(
     *     Lazy.pure({
     *         head: Lazy.pure(3),
     *         tail: Lazy.pure({ head: Lazy.pure(4), tail: Lazy.pure(null) })
     *     })
     * )
     *
     * console.log(lazyList.tail) // LazyList { _value: Lazy { _value: { value: [Object], lazy: false } } }
     * console.log(lazyList.tail.head) // Lazy { _value: { value: 4, lazy: false } }
     * console.log(lazyList.tail.head.value) // 4
     */
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

    /**
     * Appends a lazy element to the beginning of a lazy linked list
     *
     * @example
     * const one = Lazy.pure(1)
     * const lazyList: LazyList<number> = LazyList.fromArray([2, 3])
     *
     * console.log([...lazyList.cons(one)].map(e => e.value)) // [1, 2, 3]
     *
     * @param x Lazy element to be appended to the beginning of the lazy linked list
     * @returns A lazy linked list with x as the first element and the original list as the tail
     */
    public cons(x: Lazy<T>): LazyList<T> {
        return LazyList.fromElement(Lazy.pure({ head: x, tail: this._value }))
    }

    /**
     * Appends a lazy element to the end of a lazy linked list
     *
     * @example
     * const three = Lazy.pure(3)
     * const lazyList: LazyList<number> = LazyList.fromArray([1, 2])
     *
     * console.log([...lazyList.snoc(three)].map(e => e.value)) // [1, 2, 3]
     *
     * @param x Lazy element to be appended to the emd of the lazy linked list
     * @returns A lazy linked list with x as the last element and the original list as the initial part
     */
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
