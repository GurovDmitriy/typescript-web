import { idType, Model } from "./Model"
import { Attributes } from "./Attributes"
import { Eventing } from "./Eventing"
import { SyncApi } from "./SyncApi"

export interface UserProps {
  id?: idType
  name?: string
  age?: number
}

export const rootUrl = "/users"

export class User extends Model<UserProps> {
  static buildUser(attributes: UserProps): User {
    return new User(
      new Attributes<UserProps>(attributes),
      new Eventing(),
      new SyncApi<UserProps>(rootUrl)
    )
  }
}
