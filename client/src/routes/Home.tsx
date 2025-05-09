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

  // useEffect(() => {
  //   console.log(auth)
  // }, [auth])

  return (
    <>
      {!auth ? (
        <>
          <h3>Not Authorized</h3>
          <a href={`${config.BACKEND_URL}/api/google/login`}>Google</a>
          <br />
          <a href={`${config.BACKEND_URL}/api/github/login`}>GitHub</a>
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
