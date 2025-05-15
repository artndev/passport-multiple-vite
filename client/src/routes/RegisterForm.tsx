import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import AuthForm from '../components/AuthForm'
import AuthContext from '../contexts/Auth'
import '../styles/css/RegisterForm.css'

const RegisterForm = () => {
  const { setAuth } = useContext(AuthContext)
  const navigator = useNavigate()
  const [err, setErr] = useState<IAxiosErrorResponse>(undefined)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      let data: Record<string, FormDataEntryValue> = {}
      formData.forEach((val, key) => (data[key] = val))

      axios
        .post('/api/local/register', data)
        .then(res => {
          navigator('/')

          return res
        })
        .then(res => {
          console.log(res)

          setTimeout(() => setAuth(res.data.answer), 4)
        })
        .catch(err => {
          console.log(err)

          setErr(err.response)
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="register__form-container">
      <div className="register__form-subcontainer">
        <AuthForm
          formTitle="Register"
          onSubmit={onSubmit}
          err={err}
          withEmail
        />
      </div>
    </div>
  )
}

export default RegisterForm
