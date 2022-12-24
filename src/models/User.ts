interface UserProps {
  name?: string
  age?: number
}

type Callback = () => void

export class User {
  events: {
    [key: string]: Callback[]
  } = {}

  constructor(private _data: UserProps) {}

  get(propName: string): string | number {
    return this._data[propName]
  }

  set(update: UserProps): void {
    this._data = Object.assign({}, this._data, update)
  }

  on(eventName: string, callback: Callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }

    this.events[eventName].push(callback)
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName]
    const isExistHandlers =
      handlers && Array.isArray(handlers) && handlers.length

    if (!isExistHandlers) return

    handlers.forEach((cb) => cb())
  }
}
