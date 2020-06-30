type LazyValue<T> = { lazy: true; value: () => T } | { lazy: false; value: T }

export class Lazy<T> {
    private _value: LazyValue<T>

    constructor(value: LazyValue<T>) {
        this._value = value
    }

    static lazy<T>(value: () => T): Lazy<T> {
        return new this({ value, lazy: true })
    }

    public get value(): T {
        const { _value } = this

        if (_value.lazy) {
            this._value = { lazy: false, value: _value.value() }

            return _value.value()
        }

        return _value.value
    }

    static pure<T>(value: T): Lazy<T> {
        return new this({ value, lazy: false })
    }
}
