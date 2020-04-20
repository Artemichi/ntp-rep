import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import User from '../AccountPage/User'
import Chats from '../ChatsPage/Chats'

const Home = () => {
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
