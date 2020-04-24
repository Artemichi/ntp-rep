import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import User from '../account/User'
import Chats from '../chats/Chats'
import UserQRcode from '../qrcode/QRcode'
import Dashboard from '../startscreen/Dashboard'

const Home = () => {
  return (
    <React.Fragment>
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/user' component={User} />
          <Route exact path='/chats' component={Chats} />
          <Route exact path='/code' component={UserQRcode} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default Home
