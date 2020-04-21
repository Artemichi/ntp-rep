import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import s from '../main.module.css'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const ChatView = ({ chat, user }) => {
  useEffect(() => {
    const chatViewBox = document.getElementById('chatViewBox')
    if (chatViewBox) {
      chatViewBox.scrollTo(0, chatViewBox.scrollHeight)
    }
  }, [chat])

  return (
    <div style={{ marginBottom: '1em' }}>
      {chat ? (
        <div className={s.content} id='chatViewBox'>
          {chat.messages.map((msg, i) => {
            return (
              <Paper key={i} className={`${s.message} ${msg.sender === user ? s.userSent : s.friendSent}`} square>
                {msg.message}
                <Typography component='div' color='textSecondary' variant='caption'>
                  {new Date(msg.timestamp).toLocaleDateString()}
                </Typography>
              </Paper>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default ChatView

ChatView.propTypes = {
  chat: PropTypes.object,
  user: PropTypes.string,
}
