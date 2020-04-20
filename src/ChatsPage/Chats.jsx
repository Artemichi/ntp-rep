import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../database/Auth'
import app from '../database/firebase'
import ChatsList from './ChatsList'
import ChatView from './ChatView'

import Container from '@material-ui/core/Container'

const Chats = ({ history }) => {
  const currentUser = useContext(AuthContext)

  const [selectedChat, setSelectedChat] = useState(null)
  const [newChatVisible, setNewChatVisible] = useState(false)
  const [chats, setChats] = useState([])

  useEffect(() => {
    const getChats = async () => {
      await app
        .firestore()
        .collection('chats')
        .where('users', 'array-contains', currentUser.email)
        .onSnapshot(async (res) => {
          const update = res.docs.map((doc) => doc.data())
          await setChats(update)
        })
    }
    getChats()
  }, [currentUser.email])

  const openNewChat = () => {
    setNewChatVisible((prev) => !prev)
    setSelectedChat(null)
  }

  return (
    <Container
      maxWidth='lg'
      style={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <ChatsList
        history={history}
        openNewChat={openNewChat}
        selectChat={setSelectedChat}
        chats={chats}
        userEmail={currentUser.email}
        selectedChatIdx={selectedChat}
      />
      {newChatVisible ? null : (
        <ChatView user={currentUser.email} chat={chats[selectedChat]} />
      )}
    </Container>
  )
}

export default Chats
