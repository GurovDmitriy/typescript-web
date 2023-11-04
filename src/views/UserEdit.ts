import { View } from "./View"
import { User, IUserProps } from "../models/User"
import { UserShow } from "./UserShow"
import { UserForm } from "./UserForm"

export class UserEdit extends View<User, IUserProps> {
  slotsMap(): { [key: string]: string } {
    return {
      userShow: ".user-show",
      userForm: ".user-form",
    }
  }

  onRender() {
    new UserShow(this.slots.userShow, this.model).render()
    new UserForm(this.slots.userForm, this.model).render()
  }

  template(): string {
    return `
      <div>
        <div class="user-show"></div>
        <div class="user-form"></div>
      </div>
    `
  }
}
