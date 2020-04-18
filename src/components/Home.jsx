import React from 'react'
import app from '../DB/firebase'

const Home = () => {
  return (
    <div>
      <h1>HOME</h1>
      <button onClick={() => app.auth().signOut()}>LOGOUT</button>
    </div>
  )
}

export default Home
