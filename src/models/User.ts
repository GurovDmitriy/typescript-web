import axios from "../api/axios"

interface UserProps {
  id?: number | string
  name?: string
  age?: number
}

type Callback = () => void

export class User {
  events: {
    [eventName: string]: Callback[]
  } = {}

  constructor(private _data: UserProps) {}

  get(propName: string): string | number {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

  async fetch(): Promise<void> {
    try {
      const response = await axios.get(`/users/${this.get("id")}`)
      this.set(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  async save(): Promise<void> {
    const id = this.get("id")

    try {
      if (id) {
        await axios.put(`/users/${id}`, this._data)
      } else {
        await axios.post("/users", this._data)
      }
    } catch (err) {
      console.error(err)
    }
  }
}
