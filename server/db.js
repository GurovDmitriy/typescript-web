/* eslint-disable no-console */
// const casual = require("casual")
// const USERS_COUNT = 10

// global state

const stateDataBase = {
  // static
  users: [
    {
      id: 1,
      name: "Dima",
      age: 30,
    },
  ],
  // getters
  // userList: [],
}

// core

const pipe =
  (a, b) =>
  (...args) =>
    b(a(...args))

function pipeRunner(...fns) {
  return fns.reduce(pipe)
}

// helper

function randomInteger(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1)
  return Math.round(rand)
}

// functions

// function createUsers(state) {
//   for (let i = 2; i <= USERS_COUNT; i++) {
//     let image = ""
//
//     if (i % 2) {
//       image = `https://i.pravatar.cc/100?img=${i}`
//     }
//
//     state.users.push({
//       id: i,
//       role: "user",
//       userName: casual.username,
//       firstName: casual.first_name,
//       lastName: casual.last_name,
//       image,
//       email: casual.email,
//       password: casual.password,
//     })
//   }
//
//   return state
// }

// function createUserList(state) {
//   Object.defineProperty(state, "userList", {
//     get() {
//       const data = state.users.map((item) => {
//         const user = { ...item }
//         delete user.password
//
//         return user
//       })
//
//       return data
//     },
//   })
//
//   return state
// }

function setResult(state) {
  return state
}

// run

function generateDataBase() {
  pipeRunner(
    // createUsers,
    setResult
  )(stateDataBase)
}

generateDataBase()

// export data

module.exports = () => {
  return stateDataBase
}

// log successful

console.log(`DB successfully created!`)
