import React, { useCallback, useContext, useState } from 'react'
import { withRouter, Redirect } from 'react-router'
import app from '../database/firebase'
import { AuthContext } from '../database/Auth'
import s from '../main.module.css'
import logo from '../assets/logo.png'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'

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
        setErr('Ошибка авторизации. Неверный Email или Пароль')
      }
    },
    [history]
  )

  const currentUser = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to='/' />
  }

  return (
    <Grid container component='main' style={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        style={{
          backgroundImage:
            'url(https://firebasestorage.googleapis.com/v0/b/ntp-rep-system.appspot.com/o/loginScreenImages%2Fserver_cluster.svg?alt=media&token=37aced91-d268-4ab9-b5ee-5835b55898e3)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={s.formContainer}>
          <Paper elevation={0}>
            <img src={logo} alt='logo' />
          </Paper>
          <form onSubmit={handleLogin} className={s.formControl}>
            <TextField
              variant='standard'
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
              variant='standard'
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
            <Button type='submit' variant='outlined' color='primary' fullWidth>
              Войти
            </Button>
            {err !== '' ? (
              <Alert severity='error' style={{ marginTop: '1em' }}>
                {err}
              </Alert>
            ) : null}
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default withRouter(Login)
