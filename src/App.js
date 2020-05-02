import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './database/Auth'
import PrivateRoute from './mainRoutes/PrivateRoute'
import Home from './mainRoutes/Home'
import Login from './mainRoutes/Login'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme()

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
