import React from 'react'
import axios from '../axios'
import { useAuthContext } from '../contexts/Auth'
import config from '../config.json'

const Home = () => {
  const { auth, setAuth } = useAuthContext()

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault()

      axios
        .post('/api/auth/logout')
        .then(() => setAuth(undefined))
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }

  const google = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault()

      window.open(`${config.BACKEND_URL}/api/google/login`, '_self')
    } catch (err) {
      console.log(err)
    }
  }

  // useEffect(() => {
  //   console.log(auth)
  // }, [auth])

  return (
    <>
      {!auth ? (
        <>
          <h3>Not Authorized</h3>
          <button type="button" onClick={google}>
            Google
          </button>
        </>
      ) : (
        <h3>Authorized</h3>
      )}

      {auth && (
        <button type="button" onClick={logout}>
          Logout
        </button>
      )}
    </>
  )
}

export default Home
