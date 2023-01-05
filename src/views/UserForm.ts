import {View} from "./View";
import {User, UserProps} from "../models/User";

export class UserForm extends View<User, UserProps> {

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.btn-set-age": this.handlerSetAge,
      "click:.btn-set-name": this.handlerSetName,
    }
  }

  handlerSetAge = (): void => {
    this.model.setRandomAge()
  }

  handlerSetName = (): void => {
    const input = this.parent?.querySelector("input")

    if(this.parent && input) {
      const name = input.value
      this.model.set({name})
    }
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <p>User name: ${this.model.get("name")}</p>
        <p>User age: ${this.model.get("age")}</p>
        <input type="text">
        <button type="button" class="btn-set-name">Change Name</button>
        <button type="button" class="btn-set-age">Set Random Age</button>
      </div>
    `
  }
}
