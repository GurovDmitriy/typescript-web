import { User } from "./models/User"

const user = new User({ name: "new", age: 0 })

async function run() {
  await user.save()
  console.log(user)
}

run()
