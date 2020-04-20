import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import NotificationImportant from '@material-ui/icons/NotificationImportant'

const ChatsList = ({
  history,
  openNewChat,
  selectChat,
  chats,
  userEmail,
  selectedChatIdx,
}) => {
  const createNewChat = () => {}

  const selectC = () => {}

  return (
    <div style={{ position: 'absolute', left: 0, width: '30em' }}>
      <Button
        variant='outlined'
        fullWidth
        color='primary'
        onClick={createNewChat}
      >
        Начать новый чат
      </Button>
      <List>
        {chats
          ? chats.map((chat, i) => {
              return (
                <div key={i}>
                  <ListItem
                    onClick={selectC}
                    selected={selectedChatIdx === i}
                    alignItems='flex-start'
                  >
                    <ListItemAvatar>
                      <Avatar alt='chatImg'>IMG</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={chat.users.filter((user) => user !== userEmail)}
                      secondary={
                        <React.Fragment>
                          <Typography component='span' color='textPrimary'>
                            {chat.messages[
                              chat.messages.length - 1
                            ].message.substring(0, 15)}
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
    </div>
  )
}

export default ChatsList
