import bcrypt from 'bcrypt'
import type { ResultSetHeader } from 'mysql2'
import pool from '../pool.js'

export default {
  Register: async (credentials: ICredentials) => {
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(credentials.password, salt)

    await pool.query<ResultSetHeader>(
      'INSERT INTO Users (Username, Password, Email) VALUES (?, ?, ?);',
      [credentials.username, passwordHash, credentials.email]
    )

    return 'You have successfully authorized'
  },
  Login: async (credentials: Omit<ICredentials, 'email'>) => {
    const [rows] = await pool.query<IUser[]>(
      'SELECT * FROM Users WHERE Username = ?;',
      [credentials.username]
    )

    if (!rows.length)
      throw new Error('Your authorization credentials are invalid')

    const passwordHash = rows[0]!.Password
    const status = await bcrypt.compare(credentials.password, passwordHash)
    if (!status) throw new Error('Your authorization credentials are invalid')

    return 'You have successfully logged in'
  },
}
