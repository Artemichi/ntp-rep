import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../database/Auth'
import app from '../database/firebase'
import Profile from './Profile'
import Container from '@material-ui/core/Container'

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
    <Container maxWidth='lg'>
      <Profile user={userData} />
    </Container>
  )
}

export default User
