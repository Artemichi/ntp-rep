import React from 'react'
import Container from '@material-ui/core/Container'
import News from './News'
import CurrentTask from './CurrentTask'

const Dashboard = () => {
  return (
    <Container maxWidth='lg' style={{ marginBottom: 56 }}>
      <CurrentTask />
      <News />
    </Container>
  )
}

export default Dashboard
