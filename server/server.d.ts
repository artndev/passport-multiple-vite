export {}
import { ResultSetHeader } from 'mysql2'

declare global {
  export interface ICredentials {
    username: string
    password: string
    email: string
  }

  export interface IUser extends ResultSetHeader {
    Id?: number
    Username: string
    Password: string
    Email: string
    GoogleId: string
    GithubId: string
  }

  namespace Express {
    interface User {
      id?: number
      username: string
      password: string
      email: string
      googleId: string
      githubId: string
    }
  }
}
