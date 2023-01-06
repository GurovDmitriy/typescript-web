export type Callback = () => void

export enum EventName {
  change = "change",
  save = "save",
  error = "error",
}

export type Events = {
  [key: string]: Callback[]
}

export interface EventingI {
  on(eventName: string, callback: Callback): void
  trigger(eventName: string): void
}

export class Eventing implements EventingI {
  events: Events = {}

  on = (eventName: string, callback: Callback): void => {
    const isExistEvent = this.events[eventName]

    if (!isExistEvent) {
      this.events[eventName] = []
    }

    this.events[eventName].push(callback)
  }

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName]
    const isExistHandlers =
      handlers && Array.isArray(handlers) && handlers.length

    if (!isExistHandlers) return

    handlers.forEach((cb) => cb())
  }
}
