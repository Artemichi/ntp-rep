import React, { useState, useEffect, useContext } from 'react'
import QRCode from 'qrcode.react'
import { AuthContext } from '../database/Auth'
import { useSpring, animated as a } from 'react-spring'
import app from '../database/firebase'
import logo from '../assets/logo.png'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const UserCard = () => {
  const currentUser = useContext(AuthContext)
  const [cardBody, setCardBody] = useState({})
  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  const cardStyles = {
    position: 'absolute',
    willChange: 'transform, opacity',
  }

  useEffect(() => {
    app
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .get()
      .then((res) => {
        setCardBody(res.data())
      })
  }, [currentUser.uid])

  return (
    <div
      onClick={() => set((state) => !state)}
      style={{
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <a.div style={{ opacity: opacity.interpolate((o) => 1 - o), transform, ...cardStyles }}>
        <Paper
          elevation={10}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1em',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <img src={logo} alt='logo' style={{ width: 87, height: 50 }} />
            <div style={{ fontWeight: 'bold', fontSize: 10, marginLeft: 30 }}>
              Научно-техническое предприятие
              <br />
              "Рациональное электропотребление"
            </div>
          </div>
          <Typography variant='h4'>{cardBody.surname}</Typography>
          <Typography variant='h5'>
            {cardBody.name} {cardBody.addname}
          </Typography>
          <Typography variant='subtitle1'>{cardBody.post}</Typography>
          <Divider style={{ width: '90%', marginTop: 10 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, width: '100%', marginTop: 10 }}>
            <span>Сот: {cardBody.phone}</span>
            <span>E-mail: {currentUser.email}</span>
          </div>
        </Paper>
      </a.div>
      <a.div style={{ opacity, transform: transform.interpolate((t) => `${t} rotateX(180deg)`), ...cardStyles }}>
        <Paper elevation={10} style={{ padding: '1em' }}>
          <QRCode value={currentUser.email} renderAs='svg' size={256} />
        </Paper>
      </a.div>
    </div>
  )
}

export default UserCard
