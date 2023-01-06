import { Model } from "./Model"
import { Attribute } from "./Attribute"
import { Eventing } from "./Eventing"
import { IdType, SyncApi } from "./SyncApi"
import { Collection } from "./Collection"

export interface UserProps {
  id?: IdType
  name?: string
  age?: number
}

export const rootUrl = "/users"

export class User extends Model<UserProps> {
  static buildUser(attributes: UserProps): User {
    return new User(
      new Attribute<UserProps>(attributes),
      new Eventing(),
      new SyncApi<UserProps>(rootUrl)
    )
  }

  static buildCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json) =>
      User.buildUser(json)
    )
  }

  public setRandomAge(): void {
    const age = Math.round(Math.random() * 100)

    this.set({age})
  }
}
