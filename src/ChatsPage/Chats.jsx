import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../database/Auth'
import app from '../database/firebase'
import ChatsList from './ChatsList'

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
  }, [])

  const openNewChat = () => {
    setNewChatVisible((prev) => !prev)
    setSelectedChat(null)
  }

  const selectChat = (idx) => {
    console.log(idx)
  }

  return (
    <div>
      <ChatsList
        history={history}
        openNewChat={openNewChat}
        selectChat={selectChat}
        chats={chats}
        userEmail={currentUser.email}
        selectedChatIdx={selectedChat}
      />
    </div>
  )
}

export default Chats
