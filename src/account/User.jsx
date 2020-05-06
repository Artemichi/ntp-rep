import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../database/Auth'
import app from '../database/firebase'
import Profile from './Profile'
import Container from '@material-ui/core/Container'
import Chart from './Chart'
import Paper from '@material-ui/core/Paper'

const User = () => {
  const currentUser = useContext(AuthContext)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    let mounted = true
    const fetchUser = async () => {
      app
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .onSnapshot(async (snapshot) => {
          if (mounted) {
            setUserData(snapshot.data())
          }
        })
    }
    fetchUser()
    return () => (mounted = false)
  }, [currentUser.uid])

  return (
    <Container maxWidth='lg' style={{ marginBottom: 56 }}>
      <Profile user={userData} />
      <Paper style={{ height: 340, marginTop: '1em' }} square>
        <Chart />
      </Paper>
    </Container>
  )
}

export default User
