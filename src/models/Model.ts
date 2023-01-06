import {EventingI, EventName} from "./Eventing"
import {HasIdI, SyncApiI} from "./SyncApi";
import {AttributesI} from "./Attribute";

export class Model<T extends HasIdI> {
  constructor(
    private attributes: AttributesI<T>,
    private events: EventingI,
    private sync: SyncApiI<T>
  ) {}

  on = this.events.on
  trigger = this.events.trigger
  get = this.attributes.get

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
