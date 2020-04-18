import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './DB/PrivateRoute'
import { AuthProvider } from './DB/Auth'
import Home from './components/Home'
import Login from './components/Login'

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
