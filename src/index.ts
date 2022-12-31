import { Collection } from "./models/Collection"
import { EventName } from "./models/Eventing"
import { User, UserProps } from "./models/User"

const collection = new Collection<User, UserProps>("/users", (json) =>
  User.buildUser(json)
)

collection.on(EventName.change, () => {
  console.log("changed")
})

collection.fetch().then(() => {
  console.log(collection)
})
