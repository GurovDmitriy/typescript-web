import {ViewCollection} from "./ViewCollection"
import {User, UserProps} from "../models/User";
import {UserShow} from "./UserShow";

export class UserList extends ViewCollection<User, UserProps> {
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render()
  }
}
