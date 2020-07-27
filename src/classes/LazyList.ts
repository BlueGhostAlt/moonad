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

    public get head(): Lazy<T> | null {
        if (!this._value.value) return null

        return this._value.value.head
    }

    public get tail(): LazyList<T> | null {
        if (!this._value.value) return null

        return LazyList.fromElement(this._value.value.tail)
    }
}
