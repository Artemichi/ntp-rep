import React from 'react'
import s from '../main.module.css'
import Paper from '@material-ui/core/Paper'

const ChatView = ({ chat, user }) => {
  return (
    <div>
      {chat ? (
        <div className={s.content}>
          {chat.messages.map((msg, i) => {
            return (
              <Paper
                key={i}
                className={msg.sender === user ? s.friendSent : s.userSent}
              >
                {msg.message}
              </Paper>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default ChatView
