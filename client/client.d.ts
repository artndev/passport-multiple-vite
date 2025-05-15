import { AxiosResponse } from 'axios'

export {}

declare global {
  export interface IUser {
    Id?: number
    Username: string
    Password: string
    Email: string
    GoogleId: string
    GithubId: string
    Created: string
  }

  export interface IAuthContext {
    auth: IUser | undefined
    setAuth: (auth: IUser | undefined) => void | undefined
  }

  export interface IAuthFormProps {
    formTitle: string
    onSubmit: (...args) => void
    err: IAxiosError
    withEmail?: boolean
    withSocials?: boolean
  }

  export type IAxiosErrorResponse = AxiosResponse | undefined
}
