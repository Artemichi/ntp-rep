import React, { useCallback, useContext, useState } from 'react'
import { withRouter, Redirect } from 'react-router'
import app from '../database/firebase'
import { AuthContext } from '../database/Auth'
import logo from '../assets/logo.png'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const Login = ({ history }) => {
  const [err, setErr] = useState('')

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await app.auth().signInWithEmailAndPassword(email.value, password.value)
        history.push('/')
      } catch (error) {
        setErr('Ошибка входа в систему')
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
        <Paper style={{ textAlign: 'center', marginTop: '15em' }}>
          <img src={logo} alt='logo' />
        </Paper>
        <form onSubmit={handleLogin}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
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
            label='Пароль'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Запомнить' />
          <Button type='submit' fullWidth variant='outlined' color='primary'>
            Войти
          </Button>
          <Typography variant='subtitle1' color='secondary'>
            {err}
          </Typography>
        </form>
      </div>
    </Container>
  )
}

export default withRouter(Login)
