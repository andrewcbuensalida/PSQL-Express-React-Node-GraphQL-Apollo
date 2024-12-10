import React, { useState } from 'react'
import { TextField, Button } from '@mui/material/'

const LoginForm = ({ onSubmit, token, setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ email, password })
    setEmail('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        sx={{ m: 1 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        sx={{ m: 1 }}
      />

      {token ? (
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={() => {
            sessionStorage.removeItem('token')
            setToken(null)
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      )}
    </form>
  )
}

export default LoginForm
