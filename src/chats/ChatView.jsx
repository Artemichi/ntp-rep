import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {debounce} from './debounce'
import s from '../main.module.css'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import IconButton from '@material-ui/core/IconButton'

const ChatView = ({ chat, user, selectChat, idx }) => {
  const [chatWidth, setChatWidth] = useState(window.innerWidth)
  const [chatHeight, setChatHeight] = useState(window.innerHeight)

  useEffect(() => {
    const chatViewBox = document.getElementById('chatViewBox')
    if (chatViewBox) {
      chatViewBox.scrollTo(0, chatViewBox.scrollHeight)
    }
  }, [chat])

  useEffect(() => {
    const debounceResizeEvent = debounce(() => {
      setChatWidth(window.innerWidth)
      setChatHeight(window.innerHeight)
    }, 500)
    window.addEventListener('resize', debounceResizeEvent)
    return _ => window.removeEventListener('resize', debounceResizeEvent)
  })

  return (
    <div style={{ height: chatHeight - 112 }}>
      {idx !== null && chatWidth < 767 ? (
        <div onClick={() => selectChat(null)}>
          <IconButton aria-label='back' color='primary' size='small' >
            <ArrowBackIosIcon />
            Назад
          </IconButton>
        </div>
      ) : null}
      {chat ? (
        <div className={s.content} id='chatViewBox' style={{ height: chatHeight - 160 }}>
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
  selectChat: PropTypes.func,
  idx: PropTypes.number,
}
