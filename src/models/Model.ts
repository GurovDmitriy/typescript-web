import {IEventing, EventName, Callback} from "./Eventing"
import {IHasId, ISyncApi} from "./SyncApi";
import {IAttributes} from "./Attribute";

export class Model<T extends IHasId> {
  constructor(
    private attributes: IAttributes<T>,
    private events: IEventing,
    private sync: ISyncApi<T>
  ) {}

  on(eventName: string, callback: Callback): void {
    this.events.on(eventName, callback)
  }

  trigger(eventName: string): void {
    this.events.trigger(eventName)
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.attributes.get(key)
  }

  set(data: T): void {
    this.attributes.set(data)
    this.events.trigger(EventName.change)
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
      this.events.trigger(EventName.save)
    } catch (err) {
      console.error(err)
      this.trigger(EventName.error)
    }
  }
}
