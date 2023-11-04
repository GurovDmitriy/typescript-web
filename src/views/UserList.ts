import { ViewCollection } from "./ViewCollection"
import { User, IUserProps } from "../models/User"
import { UserShow } from "./UserShow"

export class UserList extends ViewCollection<User, IUserProps> {
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render()
  }
}
