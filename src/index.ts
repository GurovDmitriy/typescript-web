import { User } from "./models/User"

export const rootUrl = "/users"

const user = new User({
  name: "Dima",
  age: 31,
})

console.log(user)
