import axios from "../api/axios"
import {Eventing} from "./Eventing";

type userId = string | number

export interface UserProps {
  id?: userId
  name?: string
  age?: number
}


export class User {
  constructor(private data: UserProps) {}

  public events: Eventing = new Eventing()

  get(propName: string): string | number {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.data[propName]
  }

  set(data: UserProps): void {
    this.data = Object.assign({}, this.data, data)
  }

  async fetch(): Promise<void> {
    try {
      const id = this.get("id")

      await axios.get(`/users/${id}`)
    } catch (err) {
      console.error(err)
    }
  }

  async save(): Promise<void> {
    try {
      const id = this.get("id")

      if(id) {
        await axios.put(`/users/${id}`, this.data)
      } else {
        await axios.post(`/users/${id}`, this.data)
      }
    } catch (err) {
      console.error(err)
    }
  }
}
