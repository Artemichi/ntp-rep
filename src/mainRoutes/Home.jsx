import React, { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import app from '../database/firebase'
import { AuthContext } from '../database/Auth'
import Nav from './Nav'
import User from '../accountPage/User'
import Chats from '../chatsPage/Chats'

const Home = () => {
  const currentUser = useContext(AuthContext)

  useEffect(() => {
    app.firestore().collection('users').doc(currentUser.uid).update({
      status: 'online',
    })
  }, [currentUser.uid])

  return (
    <React.Fragment>
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/user' component={User} />
          <Route exact path='/chats' component={Chats} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default Home
