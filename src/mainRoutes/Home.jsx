import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import app from '../database/firebase'
import { AuthContext } from '../database/Auth'
import Nav from './Nav'
import User from '../account/User'
import Chats from '../chats/Chats'
import UserQRcode from '../qrcode/QRcode'
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

  return (
    <React.Fragment>
      <Router>
        <Nav show={showNav} />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/user' component={User} />
          <Route exact path='/chats' render={(props) => <Chats showNavBar={setshowNav} {...props} />} />
          <Route exact path='/kanban' component={Board} />
          <Route exact path='/code' component={UserQRcode} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default Home
