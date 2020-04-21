import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import app from '../database/firebase'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded'
import Menu from '@material-ui/core/Menu'
import TextField from '@material-ui/core/TextField'

const ChatsList = ({ selectChat, chats, userID, selectedChatIdx }) => {
  const [users] = useState(new Map())
  const [loading, setLoading] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const getUsers = async () => {
      await app
        .firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach(async (doc) => {
            users.set(doc.id, doc.data())
          })
        })
      setLoading(false)
    }
    getUsers()
  }, [users])

  const onMenuClose = () => {
    setAnchorEl(null)
  }

  const chatExists = async (key) => {
    const docKey = [userID, key].sort().join(':')
    const chat = await app.firestore().collection('chats').doc(docKey).get()
    return chat.exists
  }

  const pickNewChat = async (key) => {
    setAnchorEl(null)
    const docKey = [userID, key].sort().join(':')
    const chatAlreadyExists = await chatExists(key)
    chatAlreadyExists ? goToChatRoom(docKey) : createChat(key)
  }

  const createChat = async (receiver) => {
    const docKey = [userID, receiver].sort().join(':')
    await app
      .firestore()
      .collection('chats')
      .doc(docKey)
      .set({
        receiverHasRead: false,
        users: [userID, receiver],
        messages: [
          {
            message: 'Чат создан',
            sender: userID,
            timestamp: Date.now(),
          },
        ],
      })
    await selectChat(chats.length - 1)
  }

  const goToChatRoom = async (doc) => {
    const usersInChat = doc.split(':')
    const findChat = chats.find((chat) => usersInChat.every((user) => chat.users.includes(user)))
    await selectChat(chats.indexOf(findChat))
  }

  const onMenuOpen = (e) => {
    setAnchorEl(e.currentTarget)
    selectChat(null)
  }

  const getFriendName = (_key) => {
    const { name, surname } = users.get(_key)
    return `${name} ${surname}`
  }
  const getFriendPhoto = (_key) => {
    const { photo } = users.get(_key)
    return photo
  }

  const getFriendStatus = (_key) => {
    const { status } = users.get(_key)
    return status
  }

  const userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === userID

  return (
    <div style={{ flex: 1 }}>
      <Button
        variant='text'
        fullWidth
        color='primary'
        onClick={(e) => onMenuOpen(e)}
        aria-controls='menu'
        aria-haspopup='true'
      >
        Пользователи
      </Button>
      <Menu
        id='menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        disableAutoFocusItem
      >
        <ListItem>
          <TextField
            label='Поиск'
            fullWidth
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            autoFocus
          />
        </ListItem>
        {[...users.keys()].map((key, idx) =>
          key !== userID && !!getFriendName(key).match(new RegExp(searchInput, 'gi')) ? (
            <ListItem onClick={() => pickNewChat(key)} key={idx}>
              <ListItemAvatar>
                <Avatar alt='userAvatar' src={getFriendPhoto(key)} />
              </ListItemAvatar>
              <ListItemText primary={getFriendName(key)} secondary={getFriendStatus(key)}></ListItemText>
            </ListItem>
          ) : null
        )}
      </Menu>
      {loading ? (
        <LinearProgress />
      ) : (
        <List>
          {chats
            ? chats.map((chat, i) => {
                let friendUID = chat.users.filter((user) => user !== userID)[0]
                return (
                  <div key={i} style={{ cursor: 'pointer' }}>
                    <ListItem onClick={() => selectChat(i)} selected={selectedChatIdx === i} alignItems='flex-start'>
                      <ListItemAvatar>
                        <Avatar alt='chatImg' src={getFriendPhoto(friendUID)} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={getFriendName(friendUID)}
                        secondary={
                          <React.Fragment>
                            <Typography component='span' color='textSecondary' variant='caption'>
                              {chat.messages[chat.messages.length - 1].sender === userID
                                ? `Вы: ${chat.messages[chat.messages.length - 1].message.substring(0, 20)}`
                                : chat.messages[chat.messages.length - 1].message.substring(0, 20)}
                            </Typography>
                          </React.Fragment>
                        }
                      ></ListItemText>
                      {chat.receiverHasRead === false && !userIsSender(chat) ? (
                        <ListItemIcon>
                          <MailOutlineRoundedIcon color='primary' />
                        </ListItemIcon>
                      ) : null}
                    </ListItem>
                    <Divider />
                  </div>
                )
              })
            : null}
        </List>
      )}
    </div>
  )
}

export default ChatsList

ChatsList.propTypes = {
  selectChat: PropTypes.func,
  chats: PropTypes.array,
  userID: PropTypes.string,
  selectedChatIdx: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
}
