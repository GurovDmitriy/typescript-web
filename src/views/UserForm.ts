import { User } from "../models/User"

export class UserForm {
  constructor(public parent: Element | null, public model: User) {}

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:button": this.handlerButtonClick,
      "mouseenter:H1": this.handlerHoverHeader,
    }
  }

  handlerButtonClick(): void {
    console.log("hi click")
  }

  handlerHoverHeader(): void {
    console.log("hover header")
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <p>User name: ${this.model.get("name")}</p>
        <p>User age: ${this.model.get("age")}</p>
        <input type="text">
        <button type="button">button</button>
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
    const templateElement = document.createElement("template")
    templateElement.innerHTML = this.template()

    this.bindEvents(templateElement.content)

    if (this.parent) {
      this.parent.append(templateElement.content)
    }
  }
}
