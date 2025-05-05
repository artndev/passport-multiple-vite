import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../contexts/Auth'

const IsNotLogged = () => {
  const { auth } = useAuthContext()

  return <>{!auth ? <Outlet /> : <Navigate to="/" />}</>
}

export default IsNotLogged
