import React from 'react'
import '../styles/css/AuthForm.css'
import config from '../config.json'

const AuthForm: React.FC<IAuthFormProps> = ({
  formTitle,
  onSubmit,
  err,
  withEmail,
  withSocials,
}) => {
  return (
    <form action="post" onSubmit={onSubmit}>
      <h3 id="title">{formTitle}</h3>
      {err && (
        <span style={{ color: 'red' }}>
          This username has already been taken or your credentials are incorrect
        </span>
      )}
      <div className="form__group">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username.."
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password.."
          required
        />
        {withEmail && (
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email.."
            required
          />
        )}
      </div>
      <button type="submit">Do it</button>
      {withSocials && (
        <>
          <span>•</span>
          <h3>Log in with socials</h3>
          <div className="form__group">
            <a href={`${config.BACKEND_URL}/api/google/login`}>
              <button type="button">Google</button>
            </a>
            <a href={`${config.BACKEND_URL}/api/github/login`}>
              <button type="button">Github</button>
            </a>
          </div>
        </>
      )}
    </form>
  )
}

export default AuthForm
