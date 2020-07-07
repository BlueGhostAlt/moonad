type LazyValue<T> = { lazy: true; value: () => T } | { lazy: false; value: T }

export class Lazy<T> {
    private _value: LazyValue<T>

    constructor(value: LazyValue<T>) {
        this._value = value
    }

    static lazy<T>(value: () => T): Lazy<T> {
        return new this({ value, lazy: true })
    }

    static pure<T>(value: T): Lazy<T> {
        return new this({ value, lazy: false })
    }

    public get value(): T {
        const { _value } = this

        if (_value.lazy) {
            this._value = { lazy: false, value: _value.value() }

            return _value.value()
        }

        return _value.value
    }

    public map<U>(mapper: (value: T) => U): Lazy<U> {
        return Lazy.lazy(() => mapper(this.value))
    }

    public bind<U>(binder: (value: T) => Lazy<U>): Lazy<U> {
        return binder(this.value)
    }

    public extend<U>(extender: (value: Lazy<T>) => U): Lazy<U> {
        return Lazy.lazy(() => extender(this))
    }

    public apply<U>(applier: Lazy<(value: T) => U>): Lazy<U> {
        return Lazy.lazy(() => applier.value(this.value))
    }

    static join<T>(value: Lazy<Lazy<T>>): Lazy<T> {
        return value.value
    }
}
