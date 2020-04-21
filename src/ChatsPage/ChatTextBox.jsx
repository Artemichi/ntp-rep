import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SendSharpIcon from '@material-ui/icons/SendSharp'

const ChatTextBox = ({ submit }) => {
  const [txt, setTxt] = useState('')

  const validateTxt = (text) => text && text.replace(/\s/g, '').length
  const submitMessage = () => {
    if (validateTxt(txt)) {
      submit(txt)
      setTxt('')
    }
  }
  const userClickInput = () => {}

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <TextField
        placeholder='Сообщение...'
        onKeyPress={(e) => {
          if (e.key === 'Enter') submitMessage()
        }}
        onChange={(e) => setTxt(e.target.value)}
        value={txt}
        id='textBox'
        onFocus={userClickInput}
        fullWidth
        variant='outlined'
      />

      <IconButton
        aria-label='Отправить'
        color='primary'
        onClick={submitMessage}
      >
        <SendSharpIcon />
      </IconButton>
    </div>
  )
}

export default ChatTextBox
