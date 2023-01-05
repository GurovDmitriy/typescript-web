import {Collection} from "./models/Collection";
import {User, UserProps} from "./models/User";
import {UserList} from "./views/UserList";

const users = new Collection("/users", (json: UserProps) => {
  return User.buildUser(json)
})

users.on("change", () => {
  const root = document.getElementById("root")

  if(root) {
    new UserList(root, users).render()
  }
})

users.fetch()
