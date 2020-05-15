import React, { useState, useEffect, useContext } from 'react'
import app from '../database/firebase'
import s from '../main.module.css'
import { AuthContext } from '../database/Auth'
import { DarkMode } from '../App'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Badge from '@material-ui/core/Badge'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh'
import Brightness5Icon from '@material-ui/icons/Brightness5'

const Profile = ({ user }) => {
  const [status, setStatus] = useState('')
  const [open, setOpen] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const currentUser = useContext(AuthContext)
  const { darkMode, setdarkMode } = useContext(DarkMode)

  useEffect(() => {
    setStatus(user.status)
  }, [user])

  useEffect(() => {
    if (status && status !== '') {
      app.firestore().collection('users').doc(currentUser.uid).update({
        status: status,
      })
    }
  }, [status, currentUser.uid])

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const delay = (ms) => new Promise((r) => setTimeout(() => r(), ms))

  const uploadUserPhoto = async (e) => {
    const file = e.target.files[0]
    const imgRef = app.storage().ref(`usersPhotos/${file.name}`)
    await imgRef.put(file).then(() => {
      setUploadComplete(true)
    })
    await imgRef.getDownloadURL().then((url) => {
      app.firestore().collection('users').doc(currentUser.uid).update({
        photo: url,
      })
    })
    await delay(4000).then(() => setUploadComplete(false))
  }

  const changeTheme = () => {
    localStorage.setItem('darkMode', JSON.stringify(!darkMode))
    setdarkMode((mode) => !mode)
  }

  return (
    <Paper className={s.profilePaper} square>
      <div style={{ alignSelf: 'flex-end', marginBottom: '2em' }}>
        <IconButton aria-label='theme' color='primary' onClick={changeTheme}>
          {darkMode ? <BrightnessHighIcon /> : <Brightness5Icon />}
        </IconButton>
        <IconButton aria-label='logout' color='primary' onClick={() => app.auth().signOut()}>
          <ExitToAppIcon />
        </IconButton>
      </div>

      <div className={s.profileContainer}>
        <Badge
          badgeContent={
            <>
              <input
                accept='image/*'
                id='icon-button-file'
                type='file'
                style={{ display: 'none' }}
                onChange={(e) => uploadUserPhoto(e)}
              />
              <label htmlFor='icon-button-file'>
                <IconButton color='primary' aria-label='upload picture' component='span'>
                  {uploadComplete ? <CheckCircleIcon /> : <CloudUploadIcon />}
                </IconButton>
              </label>
            </>
          }
        >
          <Avatar className={s.avatarImg} src={user.photo} alt='profilePhoto' />
        </Badge>

        <Typography
          variant='h5'
          component='h2'
          className={
            status !== ''
              ? status === 'Онлайн'
                ? s.statusLineOnline
                : status === 'Не в сети'
                ? s.statusLineOffline
                : status === 'Нет на месте'
                ? s.statusLineAway
                : null
              : null
          }
        >
          {user.name} {user.surname}
        </Typography>
      </div>

      <div className={s.statusBar}>
        <FormControl className={s.statusInput}>
          <InputLabel id='controlled-open-select-label'>Текущий статус</InputLabel>
          <Select
            labelId='controlled-open-select-label'
            id='controlled-open-select'
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={status || ''}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value={'Онлайн'}>Онлайн</MenuItem>
            <MenuItem value={'Не в сети'}>Не в сети</MenuItem>
            <MenuItem value={'Нет на месте'}>Нет на месте</MenuItem>
          </Select>
        </FormControl>
        <div className={s.statusBtn}>
          <Button onClick={handleOpen} color='primary' variant='outlined'>
            Изменить статус
          </Button>
        </div>
      </div>
    </Paper>
  )
}

export default Profile
