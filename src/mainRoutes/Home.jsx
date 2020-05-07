import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import app from '../database/firebase'
import { AuthContext } from '../database/Auth'
import Nav from './Nav'
import User from '../account/User'
import Chats from '../chats/Chats'
import UserCard from '../qrcode/BusinessCard'
import Dashboard from '../startscreen/Dashboard'
import Board from '../kanban/Board'

const Home = () => {
  const currentUser = useContext(AuthContext)
  const [showNav, setshowNav] = useState(true)

  useEffect(() => {
    app.firestore().collection('users').doc(currentUser.uid).update({
      status: 'Онлайн',
    })
  }, [currentUser])

  useEffect(() => {
    window.addEventListener('beforeunload', (e) => {
      app.firestore().collection('users').doc(currentUser.uid).update({
        status: 'Не в сети',
      })
      const msg = 'Закрыть?'
      e ? (e.returnValue = msg) : (window.event.returnValue = msg)
      return msg
    })
  }, [currentUser])

  return (
    <React.Fragment>
      <Router>
        <Nav show={showNav} />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/user' component={User} />
          <Route exact path='/chats' render={(props) => <Chats showNavBar={setshowNav} {...props} />} />
          <Route exact path='/kanban' component={Board} />
          <Route exact path='/card' component={UserCard} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default Home
