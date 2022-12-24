import { User } from "./models/User"

const user = new User({
  name: "Dima",
  age: 31,
})

user.on("setUser", () => {
  console.log("this set with")
})

user.on("getUser", () => {
  console.log("this get with")
})

user.set({
  name: "Marq",
  age: 28,
})

user.set({
  age: 30,
})

console.log(user.get("name"))
console.log(user.get("age"))
