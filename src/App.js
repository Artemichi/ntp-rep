import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './database/Auth'
import PrivateRoute from './mainRoutes/PrivateRoute'
import Home from './mainRoutes/Home'
import Login from './mainRoutes/Login'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
      </Router>
    </AuthProvider>
  )
}

export default App
