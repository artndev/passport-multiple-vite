import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import AuthForm from '../components/AuthForm'
import { useAuthContext } from '../contexts/Auth'

const LoginForm = () => {
  const { setAuth } = useAuthContext()
  const navigator = useNavigate()
  const [err, setErr] = useState<IAxiosErrorResponse>(undefined)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      let data: Record<string, FormDataEntryValue> = {}
      formData.forEach((val, key) => (data[key] = val))

      axios
        .post('/api/login', data)
        .then(res => {
          navigator('/')

          setAuth(res.data.answer)
        })
        .catch(err => {
          console.log(err)

          setErr(err.response)
        })
    } catch (err) {
      console.log(err)
    }
  }

  return <AuthForm formTitle="Login" onSubmit={onSubmit} err={err} />
}

export default LoginForm
