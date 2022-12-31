export class Attribute<T> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key]
  }

  set = (data: T): void => {
    this.data = Object.assign({}, this.data, data)
  }

  getAll = (): T => {
    return this.data
  }
}
