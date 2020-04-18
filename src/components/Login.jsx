import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from 'react-router'
import app from '../DB/firebase'
import { AuthContext } from '../DB/Auth'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await app.auth().signInWithEmailAndPassword(email.value, password.value)
        history.push('/')
      } catch (error) {
        alert(error)
      }
    },
    [history]
  )

  const currentUser = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to='/' />
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div>
        <Typography component='h1' variant='h5'>
          ВХОД
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Login
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default withRouter(Login)
