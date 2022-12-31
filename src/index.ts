import { EventName } from "./models/Eventing"
import { User } from "./models/User"

const collection = User.buildCollection()

collection.on(EventName.change, () => {
  console.log("changed")
})

collection.fetch().then(() => {
  console.log(collection)
})
