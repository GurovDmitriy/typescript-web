import {View} from "./View";
import {User, IUserProps} from "../models/User";

export class UserForm extends View<User, IUserProps> {

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.btn-set-age": () => this.handlerSetAge(),
      "click:.btn-set-name": () => this.handlerSetName(),
      "click:.btn-save": () => this.handlerSave(),
    }
  }

  handlerSetAge(): void {
    this.model.setRandomAge()
  }

  handlerSetName(): void {
    const input = this.parent?.querySelector("input")

    if(this.parent && input) {
      const name = input.value
      this.model.set({name})
    }
  }

  handlerSave(): Promise<void> {
    return this.model.save()
  }

  template(): string {
    return `
      <div>
        <input type="text" placeholder="${this.model.get('name')}">
        <button type="button" class="btn-set-name">Change Name</button>
        <button type="button" class="btn-set-age">Set Random Age</button>
        <div>
            <button type="button" class="btn-save">Save</button>
        </div>
      </div>
    `
  }
}
