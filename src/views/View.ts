import {HasIdI, Model} from "../models/Model";

export abstract class View<T extends Model<K>, K extends HasIdI> {
  constructor(public parent: Element | null, public model: T) {
    this.bindModel()
  }

  abstract eventsMap(): {[key: string]: () => void}

  abstract template(): string

  bindModel() {
    this.model.on("change", () => {
      this.render()
    })
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
