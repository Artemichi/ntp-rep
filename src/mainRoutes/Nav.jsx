import React from 'react'
import s from '../main.module.css'
import { useHistory } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import FolderIcon from '@material-ui/icons/Folder'
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp'
import ChatBubbleSharpIcon from '@material-ui/icons/ChatBubbleSharp'
import AppsIcon from '@material-ui/icons/Apps'

const Nav = () => {
  const [value, setValue] = React.useState('home')
  const history = useHistory()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} className={s.bottomNavBar}>
      <BottomNavigationAction
        label='Аккаунт'
        value='account'
        icon={<AccountCircleSharpIcon />}
        onClick={() => history.push('/user')}
      />

      <BottomNavigationAction
        label='Сообщения'
        value='messages'
        icon={<ChatBubbleSharpIcon />}
        onClick={() => history.push('/chats')}
      />

      <BottomNavigationAction label='Главная' value='home' icon={<AppsIcon />} onClick={() => history.push('/')} />
      <BottomNavigationAction label='Folder' value='folder' icon={<FolderIcon />} />
    </BottomNavigation>
  )
}

export default Nav
