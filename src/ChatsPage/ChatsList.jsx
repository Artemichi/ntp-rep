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
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import NotificationImportant from '@material-ui/icons/NotificationImportant'

const ChatsList = ({
  openNewChat,
  selectChat,
  chats,
  userID,
  selectedChatIdx,
}) => {
  const [users] = useState(new Map())
  const [loading, setLoading] = useState(true)

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

  const createNewChat = () => {}

  const getFriendName = (_key, _full) => {
    const { name, surname } = users.get(_key)
    return _full ? `${name} ${surname}` : name
  }
  const getFriendPhoto = (_key) => {
    const { photo } = users.get(_key)
    return photo
  }

  return (
    <div style={{ flex: 1 }}>
      <Button variant='text' fullWidth color='primary' onClick={createNewChat}>
        Начать новый чат
      </Button>
      {loading ? (
        <LinearProgress />
      ) : (
        <List>
          {chats
            ? chats.map((chat, i) => {
                let friendUID = chat.users.filter((user) => user !== userID)[0]
                return (
                  <div key={i} style={{ cursor: 'pointer' }}>
                    <ListItem
                      onClick={() => selectChat(i)}
                      selected={selectedChatIdx === i}
                      alignItems='flex-start'
                    >
                      <ListItemAvatar>
                        <Avatar alt='chatImg' src={getFriendPhoto(friendUID)} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={getFriendName(friendUID, true)}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component='span'
                              color='textSecondary'
                              variant='caption'
                            >
                              {chat.messages[chat.messages.length - 1]
                                .sender === userID
                                ? `Вы: ${chat.messages[
                                    chat.messages.length - 1
                                  ].message.substring(0, 20)}`
                                : chat.messages[
                                    chat.messages.length - 1
                                  ].message.substring(0, 20)}
                            </Typography>
                          </React.Fragment>
                        }
                      ></ListItemText>
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
  openNewChat: PropTypes.func,
  selectChat: PropTypes.func,
  chats: PropTypes.array,
  userID: PropTypes.string,
  selectedChatIdx: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([null]),
  ]),
}
