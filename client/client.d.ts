import { AxiosResponse } from 'axios'

export {}

declare global {
  export interface IUser {
    id: number
    username: string
    password: string
    email: string
  }

  export interface IAuthContext {
    auth: IUser | undefined
    setAuth: (auth: IUser) => void | undefined
  }

  export interface IAuthFormProps {
    formTitle: string
    onSubmit: (...args) => void
    err: IAxiosError
    withEmail?: boolean
  }

  export type IAxiosErrorResponse = AxiosResponse | undefined
}
