import axios from "../api/axios"
import { AxiosPromise } from "axios"

export interface hasId {
  id?: string | number
}

export class SyncApi<T extends hasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise | undefined {
    try {
      return axios.get(`${this.rootUrl}/${id}`)
    } catch (err) {
      console.error(err)
    }
  }

  save(data: T): AxiosPromise | undefined {
    try {
      const id = data?.id

      if (id) {
        return axios.put(`${this.rootUrl}/${id}`, data)
      } else {
        return axios.post(`${this.rootUrl}`, data)
      }
    } catch (err) {
      console.error(err)
    }
  }
}
