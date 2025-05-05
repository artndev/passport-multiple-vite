import React from 'react'

const AuthForm: React.FC<IAuthFormProps> = ({
  formTitle,
  onSubmit,
  err,
  withEmail,
}) => {
  return (
    <div>
      <h3>{formTitle}</h3>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          width: 250,
        }}
        action="post"
        onSubmit={onSubmit}
      >
        {err && (
          <span style={{ color: 'red' }}>
            This username has already been taken or your credentials are
            incorrect
          </span>
        )}
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
        <button type="submit">Do it</button>
      </form>
    </div>
  )
}

export default AuthForm
