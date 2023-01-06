export interface AttributesI<T> {
  set(value: T): void
  get<K extends keyof T>(key: K): T[K]
  getAll(): T
}

export class Attribute<T> implements AttributesI<T> {
  constructor(private _data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this._data[key]
  }

  set = (data: T): void => {
    this._data = Object.assign({}, this._data, data)
  }

  getAll = (): T => {
    return this._data
  }
}
