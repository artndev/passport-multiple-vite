import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from '../axios'

const AuthContext = createContext<IAuthContext>({} as IAuthContext)
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<IUser | undefined>(undefined)

  useEffect(() => {
    axios
      .get('/api/auth/status')
      .then(res => {
        setAuth(res.data.answer)
      })
      .catch(err => {
        console.log(err)
      })
  }, [auth])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthContext
