import React from 'react'
import app from '../database/firebase'
import s from '../main.module.css'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'

const Profile = ({ user }) => {
  return (
    <Paper className={s.profilePaper}>
      <div className={s.profileContainer}>
        <Avatar className={s.avatarImg} src={user.photo} alt='profilePhoto' />

        <Badge color='secondary' variant='dot'>
          <Typography variant='h5' component='h2'>
            {user.name} {user.surname}
          </Typography>
        </Badge>
      </div>

      <div>Текущий статус: {user.status}</div>

      <IconButton
        className={s.logout}
        aria-label='delete'
        color='secondary'
        onClick={() => app.auth().signOut()}
      >
        <ExitToAppIcon />
      </IconButton>
    </Paper>
  )
}

export default Profile
