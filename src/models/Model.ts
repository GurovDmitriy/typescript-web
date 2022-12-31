import { AxiosPromise } from "axios"
import { Callback } from "./Eventing"

export type idType = number | string | undefined

export interface hasIdI {
  id?: idType
}

export interface ModelAttributesI<T> {
  set(value: T): void
  get<K extends keyof T>(key: K): T[K]
  getAll(): T
}

export interface SyncI<T> {
  fetch(id: idType): AxiosPromise | undefined
  save(data: T): AxiosPromise | undefined
}

interface EventsI {
  on(eventName: string, callback: Callback): void
  trigger(eventName: string): void
}

export class Model<T extends hasIdI> {
  constructor(
    private attributes: ModelAttributesI<T>,
    private events: EventsI,
    private sync: SyncI<T>
  ) {}

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  get get() {
    return this.attributes.get
  }

  set(data: T): void {
    this.attributes.set(data)
    this.events.trigger("change")
  }

  async fetch(): Promise<void> {
    const id = this.get("id")

    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id")
    }

    const response = await this.sync.fetch(id)

    if (response) {
      this.set(response.data)
    }
  }

  async save(): Promise<void> {
    try {
      await this.sync.save(this.attributes.getAll())
      this.events.trigger("save")
    } catch (err) {
      console.error(err)
      this.trigger("error")
    }
  }
}
