import React from 'react'
import axios from '../axios'
import { useAuthContext } from '../contexts/Auth'

const Home = () => {
  const { auth } = useAuthContext()

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault()

      axios
        .post('/api/auth/logout')
        .then(() => window.location.reload())
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
      <h3>{auth ? 'Authorized' : 'Not Authorized'}</h3>
      {auth && (
        <button type="button" onClick={logout}>
          Logout
        </button>
      )}
    </>
  )
}

export default Home
