import { Collection } from "./models/Collection"
import { User, IUserProps } from "./models/User"
import { UserList } from "./views/UserList"
import { EventName } from "./models/Eventing"
import { UserEdit } from "./views/UserEdit"

const user = User.buildUser({
  id: 1,
  name: "Doe",
  age: 10,
  email: "sfs.f@dsfs.com",
  password: "23432",
})

const users = new Collection("/users", (json: IUserProps) => {
  return User.buildUser(json)
})

users.on(EventName.change, () => {
  const root = document.getElementById("root")

  if (root) {
    new UserList(root, users).render()
    new UserEdit(root, user).render()
  }
})

async function fetchUsers() {
  await user.save()
  await users.fetch()
  users.trigger(EventName.change)
}

fetchUsers()
