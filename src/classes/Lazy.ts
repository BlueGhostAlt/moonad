type LazyValue<T> = { lazy: true; value: () => T } | { lazy: false; value: T }

/**
 * Wrapper for values that handles delaying evaluation and memoising results
 */
export class Lazy<T> {
    private _value: LazyValue<T>

    /**
     * Creates a lazy instance from either an evaluated or an unevaluated value and a boolean value
     *
     * @param value A pre-instantiated lazy value along with the adequate flag for state of evaluation
     */
    constructor(value: LazyValue<T>) {
        this._value = value
    }

    /**
     * Creates a lazy instance from an unevaluated value
     *
     * @param value A function that returns a value
     * @returns A lazy instance of the to-be-evaluated value
     */
    static lazy<T>(value: () => T): Lazy<T> {
        return new this({ value, lazy: true })
    }

    /**
     * Creates a lazy instance from an evaluated value
     *
     * @param value An already evaluated value
     * @returns A lazy instance of the evaluated value
     */
    static pure<T>(value: T): Lazy<T> {
        return new this({ value, lazy: false })
    }

    /**
     * Returns the inner value of the lazy instance
     */
    public get value(): T {
        const { _value } = this

        if (_value.lazy) {
            this._value = { lazy: false, value: _value.value() }

            return _value.value()
        }

        return _value.value
    }

    /**
     * Maps the inner value with a mapper
     *
     * @param mapper A map function to map the wrapped value with
     * @returns A lazy instance of the unevaluated mapped value
     */
    public map<U>(mapper: (value: T) => U): Lazy<U> {
        return Lazy.lazy(() => mapper(this.value))
    }

    /**
     * Binds the inner value with a binder
     *
     * @param binder A bind function to bind the wrapped value with
     * @returns A lazy instance of the binded value
     */
    public bind<U>(binder: (value: T) => Lazy<U>): Lazy<U> {
        return binder(this.value)
    }

    /**
     * Extends the inner value with an extender
     *
     * @param extender An extend function to extend the wrapped value with
     * @returns A lazy instance of the unevaluated extended value
     */
    public extend<U>(extender: (value: Lazy<T>) => U): Lazy<U> {
        return Lazy.lazy(() => extender(this))
    }

    /**
     * Applies the inner value with an applier
     *
     * @param applier An apply function to apply the wrapped value with
     * @returns A lazy instance of the unevaluated applied value
     */
    public apply<U>(applier: Lazy<(value: T) => U>): Lazy<U> {
        return Lazy.lazy(() => applier.value(this.value))
    }

    /**
     * Flattens the lazy instance
     *
     * @returns Returns the inner lazy instance of a nested lazy instance
     */
    public flat(): T extends Lazy<infer R> ? R : never {
        return this.value as T extends Lazy<infer R> ? R : never
    }

    /**
     * Joins a lazy instance
     *
     * @param value A double nested lazy instance
     * @returns The inner lazy instance
     */
    static join<T>(value: Lazy<Lazy<T>>): Lazy<T> {
        return value.value
    }

    public toString(): string {
        return `${this.value}`
    }

    public toJSON(): string {
        return `${JSON.stringify({ lazy: false, value: this.value })}`
    }
}
