import {Model} from "../models/Model";
import {HasIdI} from "../models/SyncApi";

export abstract class View<T extends Model<K>, K extends HasIdI> {
  constructor(public parent: Element | null, public model: T) {
    this.bindModel()
  }

  slots: {[key: string]: Element} = {}

  abstract template(): string

  slotsMap(): {[key: string]: string} {
    return {}
  }

  eventsMap(): {[key: string]: () => void} {
    return {}
  }

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

  renderSlots(fragment: DocumentFragment): void {
    const slotsMap = this.slotsMap()

    for(const key in slotsMap) {
      const selector = slotsMap[key]
      const elem = fragment.querySelector(selector)

      if(elem) {
        this.slots[key] = elem
      }
    }
  }

  onRender(): void {
    //
  }

  render(): void {
    if(this.parent) {
      this.parent.innerHTML = ""
    }

    const templateElement = document.createElement("template")
    templateElement.innerHTML = this.template()

    this.bindEvents(templateElement.content)
    this.renderSlots(templateElement.content)

    this.onRender()

    if (this.parent) {
      this.parent.append(templateElement.content)
    }
  }
}
