import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../database/Auth'
import app from '../database/firebase'
import Profile from './Profile'
import Container from '@material-ui/core/Container'

const User = () => {
  const currentUser = useContext(AuthContext)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      await app
        .firestore()
        .collection('users')
        .doc(currentUser.email)
        .get()
        .then((snapshot) => {
          setUserData(snapshot.data())
        })
    }
    fetchUser()
  }, [currentUser.email])

  return (
    <Container maxWidth='lg'>
      <Profile user={userData} />
    </Container>
  )
}

export default User
