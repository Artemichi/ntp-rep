import React from 'react'
import s from '../main.module.css'
import { useHistory } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp'
import ChatBubbleSharpIcon from '@material-ui/icons/ChatBubbleSharp'
import CropFreeIcon from '@material-ui/icons/CropFree'
import DashboardIcon from '@material-ui/icons/Dashboard'
import AssignmentIcon from '@material-ui/icons/Assignment'

const Nav = ({ show }) => {
  const [value, setValue] = React.useState('home')
  const history = useHistory()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={s.bottomNavBar}
      style={show ? {} : { display: 'none' }}
    >
      <BottomNavigationAction
        label='Аккаунт'
        value='account'
        icon={<AccountCircleSharpIcon />}
        onClick={() => history.push('/user')}
      />

      <BottomNavigationAction label='Главная' value='home' icon={<DashboardIcon />} onClick={() => history.push('/')} />
      <BottomNavigationAction
        label='Сообщения'
        value='messages'
        icon={<ChatBubbleSharpIcon />}
        onClick={() => history.push('/chats')}
      />
      {window.innerWidth > 1024 ? (
        <BottomNavigationAction
          label='Задачи'
          value='kanban'
          icon={<AssignmentIcon />}
          onClick={() => history.push('/kanban')}
        />
      ) : null}

      {window.innerWidth < 767 ? (
        <BottomNavigationAction
          label='QR-код'
          value='code'
          icon={<CropFreeIcon />}
          onClick={() => history.push('/code')}
        />
      ) : null}
    </BottomNavigation>
  )
}

export default Nav
