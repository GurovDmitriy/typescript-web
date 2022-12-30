import {Callback, Eventing} from "./Eventing";
import {Sync} from "./Sync";
import {Attributes} from "./Attributes";

export type userId = string | number

export interface UserProps {
  id?: userId
  name?: string
  age?: number
}

export const rootUrl = "/users"


export class User {
  constructor(attributes: UserProps) {
    this.attributes = new Attributes<UserProps>(attributes)
  }

  public events: Eventing = new Eventing()
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl)
  public attributes: Attributes<UserProps>

  get on() {
    return this.events.on.bind(this)
  }

  get trigger() {
    return this.events.trigger.bind(this)
  }

  get get() {
    return this.attributes.get.bind(this)
  }
}
