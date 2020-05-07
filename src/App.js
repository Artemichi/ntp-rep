import React, { useState, createContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './database/Auth'
import PrivateRoute from './mainRoutes/PrivateRoute'
import Home from './mainRoutes/Home'
import Login from './mainRoutes/Login'
import { ThemeProvider } from '@material-ui/core/styles'
import { darkTheme, lightTheme } from './themes'

export const DarkMode = createContext()

const App = () => {
  const [darkMode, setdarkMode] = useState(false)

  darkMode ? (document.body.style.backgroundColor = '#303030') : (document.body.style.backgroundColor = null)

  return (
    <AuthProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <DarkMode.Provider value={{ darkMode, setdarkMode }}>
          <Router>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
          </Router>
        </DarkMode.Provider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
