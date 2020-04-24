import React, { useState, useEffect, useContext } from 'react'
import app from '../database/firebase'
import { AuthContext } from '../database/Auth'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded'

const CurrentTask = () => {
  const currentUser = useContext(AuthContext)
  const [task, setTask] = useState(null)
  const [taskId, setTaskId] = useState(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const getTask = async () => {
      await app
        .firestore()
        .collection('tasks')
        .where('uid', '==', currentUser.uid)
        .where('completed', '==', false)
        .limit(1)
        .get()
        .then((snapshot) => {
          if (snapshot.docs[0]) {
            setTask(snapshot.docs[0].data())
            setTaskId(snapshot.docs[0].id)
          }
        })
    }
    getTask()
  }, [currentUser.uid])

  const submitTask = async () => {
    await app.firestore().collection('tasks').doc(taskId).update({
      completed: true,
    })
    setTask(null)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Paper
      style={
        task ? { marginBottom: '1em', marginTop: '1em' } : { padding: '2em', marginBottom: '1em', marginTop: '1em' }
      }
      elevation={5}
    >
      {task && task !== undefined && task !== null ? (
        <>
          <Card>
            <CardHeader
              action={
                <IconButton aria-label='done' color='primary' size='medium' onClick={() => submitTask()}>
                  <DoneAllRoundedIcon />
                </IconButton>
              }
              title={task.title}
              subheader={new Date(task.date.toDate()).toLocaleDateString()}
            />
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                {task.description}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                color='primary'
                style={expanded ? { transform: 'rotate(180deg)' } : null}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label='show more'
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>{/* // */}</CardContent>
            </Collapse>
          </Card>
        </>
      ) : (
        <>
          <Typography variant='button' display='block'>
            Нет текущей задачи
          </Typography>
        </>
      )}
    </Paper>
  )
}

export default CurrentTask
