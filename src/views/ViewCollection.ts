import {Collection} from "../models/Collection";

export abstract class ViewCollection<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(model: T, itemParent: Element): void

  public render(): void {
    this.parent.innerHTML = ""

    const templateElement = document.createElement("template")

    for(const model of this.collection.models) {
      const itemParent = document.createElement("div")
      this.renderItem(model, itemParent)
      templateElement.content.append(itemParent)
    }

    this.parent.append(templateElement.content)
  }
}
