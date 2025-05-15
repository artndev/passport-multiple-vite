import React, { useEffect } from 'react'
import axios from '../axios'
import { useAuthContext } from '../contexts/Auth'
import '../styles/css/Home.css'
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

  useEffect(() => {
    console.log(auth)
  }, [auth])

  return (
    <div className="home__container">
      <div className="home__subcontainer">
        {!auth ? (
          <h3>Not Authorized</h3>
        ) : (
          <>
            <h3>Authorized</h3>
            <div className="home__group">
              {auth.googleId === '' ? (
                <a
                  href={`${config.BACKEND_URL}/api/google/login?id=${auth.id}`}
                >
                  Attach Google
                </a>
              ) : (
                <a
                  href={`${config.BACKEND_URL}/api/google/login?id=${auth.id}`}
                >
                  Google is attached as: <strong>{auth.googleId}</strong>
                </a>
              )}
              {auth.githubId === '' ? (
                <a
                  href={`${config.BACKEND_URL}/api/github/login?id=${auth.id}`}
                >
                  Attach Github
                </a>
              ) : (
                <a
                  href={`${config.BACKEND_URL}/api/github/login?id=${auth.id}`}
                >
                  Github is attached as: <strong>{auth.githubId}</strong>
                </a>
              )}
            </div>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
