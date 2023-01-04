import { User } from "../models/User"

export class UserForm {
  constructor(public parent: Element | null, public model: User) {
    this.bindModel()
  }

  bindModel() {
    this.model.on("change", () => {
      this.render()
    })
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.btn-set-age": this.handlerSetAge,
    }
  }

  handlerSetAge = (): void => {
    this.model.setRandomAge()
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <p>User name: ${this.model.get("name")}</p>
        <p>User age: ${this.model.get("age")}</p>
        <input type="text">
        <button type="button" class="btn-set-age">Set Random Age</button>
      </div>
    `
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap()

    for (const eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":")

      fragment.querySelectorAll(selector).forEach((elem) => {
        elem.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  render(): void {
    if(this.parent) {
      this.parent.innerHTML = ""
    }
    
    const templateElement = document.createElement("template")
    templateElement.innerHTML = this.template()

    this.bindEvents(templateElement.content)

    if (this.parent) {
      this.parent.append(templateElement.content)
    }
  }
}
