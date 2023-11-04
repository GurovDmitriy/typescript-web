import axiosLib from "axios"

class Api {
  private constructor() {
    this.axios = axiosLib.create({
      baseURL: "http://localhost:3000",
    })
  }

  public axios

  private static instance?: Api

  public static get() {
    if (!this.instance) {
      this.instance = new Api()
    }

    return this.instance
  }
}

export const axios = Api.get().axios
