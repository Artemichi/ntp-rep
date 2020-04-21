import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../database/Auth'
import firebase from 'firebase/app'
import app from '../database/firebase'
import ChatsList from './ChatsList'
import ChatView from './ChatView'
import ChatTextBox from './ChatTextBox'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'

const Chats = () => {
  const currentUser = useContext(AuthContext)
  const { uid } = currentUser
  const [selectedChat, setSelectedChat] = useState(null)
  const [newChatVisible, setNewChatVisible] = useState(false)
  const [chats, setChats] = useState([])

  useEffect(() => {
    const getChats = async () => {
      app
        .firestore()
        .collection('chats')
        .where('users', 'array-contains', uid)
        .onSnapshot(async (res) => {
          const update = res.docs.map((doc) => doc.data())
          setChats(update)
        })
    }
    getChats()
  }, [uid])

  const submitMessage = (msg) => {
    const docKey = buildDocKey(
      chats[selectedChat].users.filter((usr) => usr !== uid)[0]
    )
    app
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: uid,
          message: msg,
          timestamp: Date.now(),
        }),
        receiverHasRead: false,
      })
  }

  const buildDocKey = (friendUID) => [uid, friendUID].sort().join(':')

  const openNewChat = () => {
    setNewChatVisible((prev) => !prev)
    setSelectedChat(null)
  }

  return (
    <Container
      maxWidth='lg'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <ChatsList
        openNewChat={openNewChat}
        selectChat={setSelectedChat}
        chats={chats}
        userID={uid}
        selectedChatIdx={selectedChat}
      />
      <Divider orientation='vertical' flexItem />
      {newChatVisible ? null : (
        <div style={{ flex: 2, flexDirection: 'column' }}>
          <ChatView user={uid} chat={chats[selectedChat]} />
          {selectedChat !== null && !newChatVisible ? (
            <ChatTextBox submit={submitMessage} />
          ) : null}
        </div>
      )}
    </Container>
  )
}

export default Chats
