export type Callback = () => void

export type Events = {
  [key: string]: Callback[]
}

export class Eventing {
  events: Events = {}

  on(eventName: string, callback: Callback) {
    const isExistEvent = this.events[eventName]

    if (!isExistEvent) {
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
