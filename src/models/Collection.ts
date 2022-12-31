import { User, UserProps } from "./User"
import { Eventing, EventName } from "./Eventing"
import { axios } from "../api/Api"
import { AxiosResponse } from "axios"

export class Collection<T, K> {
  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  models: T[] = []
  events: Eventing = new Eventing()

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  async fetch(): Promise<void> {
    try {
      const response: AxiosResponse | undefined = await axios.get(this.rootUrl)
      if (response) {
        response.data.forEach((item: K) => {
          this.models.push(this.deserialize(item))
        })

        this.events.trigger(EventName.change)
      }
    } catch (err) {
      console.error(err)
    }
  }
}
