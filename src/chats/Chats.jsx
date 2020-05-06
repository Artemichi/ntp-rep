import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../database/Auth'
import firebase from 'firebase/app'
import app from '../database/firebase'
import ChatsList from './ChatsList'
import ChatView from './ChatView'
import ChatTextBox from './ChatTextBox'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import diff from 'lodash/difference'
import findIndex from 'lodash/findIndex'

const Chats = ({ showNavBar }) => {
  const currentUser = useContext(AuthContext)
  const { uid } = currentUser
  const [selectedChat, setSelectedChat] = useState(null)
  const [chats, setChats] = useState([])

  useEffect(() => {
    let mounted = true
    let createdChatIdx = null
    const getChats = async () => {
      app
        .firestore()
        .collection('chats')
        .where('users', 'array-contains', uid)
        .onSnapshot(async (res) => {
          if (mounted) {
            const update = res.docs.map((doc) => doc.data())
            setChats((prevState) => {
              if (update.length === prevState.length + 1) {
                const prevChats = prevState.map((e) => e.users.filter((user) => user !== uid).pop())
                const newChats = update.map((e) => e.users.filter((user) => user !== uid).pop())
                const change = diff(newChats, prevChats)[0]
                createdChatIdx = findIndex(update, (o) => o.users.includes(change))
              }
              return update
            })
            if (createdChatIdx && createdChatIdx !== -1) setSelectedChat(createdChatIdx)
          }
        })
    }
    getChats()
    return () => (mounted = false)
  }, [uid])

  useEffect(() => {
    if (window.innerWidth < 767) {
      selectedChat !== null ? showNavBar(false) : showNavBar(true)
    }
    messageRead()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat])

  const submitMessage = (msg) => {
    const docKey = buildDocKey(chats[selectedChat].users.filter((usr) => usr !== uid)[0])
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

  const messageRead = () => {
    if (selectedChat !== null && selectedChat !== undefined && chats[selectedChat] && chats[selectedChat].users) {
      const docKey = buildDocKey(chats[selectedChat].users.filter((_usr) => _usr !== uid)[0])
      if (notSenderClicked(selectedChat)) {
        app.firestore().collection('chats').doc(docKey).update({
          receiverHasRead: true,
        })
      }
    }
  }

  const notSenderClicked = (chatidx) => chats[chatidx].messages[chats[chatidx].messages.length - 1].sender !== uid

  return (
    <Container
      maxWidth='lg'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Divider orientation='vertical' flexItem />
      <ChatsList selectChat={setSelectedChat} chats={chats} userID={uid} selectedChatIdx={selectedChat} />
      <Divider orientation='vertical' flexItem />
      <div style={{ flex: 2, flexDirection: 'column' }}>
        <ChatView user={uid} chat={chats[selectedChat]} selectChat={setSelectedChat} idx={selectedChat} />
        {selectedChat !== null ? <ChatTextBox submit={submitMessage} msgRead={messageRead} /> : null}
      </div>
    </Container>
  )
}

export default Chats
