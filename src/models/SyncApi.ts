import { axios } from "../api/Api"
import { AxiosPromise } from "axios"

export type IdType = number | string | undefined

export interface HasIdI {
  id?: IdType
}

export interface SyncApiI<T extends HasIdI> {
  fetch(id: IdType): AxiosPromise | undefined
  save(data: T): AxiosPromise | undefined
}

export class SyncApi<T extends HasIdI> implements SyncApiI<T> {
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
