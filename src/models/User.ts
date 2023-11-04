import { Model } from "./Model"
import { Attribute } from "./Attribute"
import { Eventing } from "./Eventing"
import { IdType, SyncApi } from "./SyncApi"
import { Collection } from "./Collection"

export interface IUserProps {
  id?: IdType
  name?: string
  age?: number
  email?: string
  password?: string
}

export const rootUrl = "/users"

export class User extends Model<IUserProps> {
  static buildUser(attributes: IUserProps): User {
    return new User(
      new Attribute<IUserProps>(attributes),
      new Eventing(),
      new SyncApi<IUserProps>(rootUrl),
    )
  }

  static buildCollection(): Collection<User, IUserProps> {
    return new Collection<User, IUserProps>(rootUrl, (json) =>
      User.buildUser(json),
    )
  }

  public setRandomAge(): void {
    const age = Math.round(Math.random() * 100)

    this.set({ age })
  }
}
