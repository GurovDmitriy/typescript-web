import { UserForm } from "./views/UserForm"
import { User } from "./models/User"

const rootEle = document.getElementById("root")

if(rootEle) {
  const user = User.buildUser({ name: "marq", age: 18 })
  const userForm = new UserForm(rootEle, user)

  userForm.render()
} else {
  throw new Error("root elem not found")
}
