import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

export default function MediaCard({ card }) {
  return (
    <Card style={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label='admin'
            alt='administrator'
            src='https://firebasestorage.googleapis.com/v0/b/ntp-rep-system.appspot.com/o/usersPhotos%2Fadminlogo.png?alt=media&token=0fe2f106-2740-436a-a213-614cb89ab799'
          ></Avatar>
        }
        title={card.type}
        subheader={new Date(card.date.toDate()).toLocaleDateString()}
      />
      <CardMedia style={{ height: 200 }} image={card.photo} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          {card.title}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {card.text}
        </Typography>
      </CardContent>
    </Card>
  )
}
