import React, { useContext } from 'react'
import QRCode from 'qrcode.react'
import { AuthContext } from '../database/Auth'

const UserQRcode = () => {
  const currentUser = useContext(AuthContext)
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <QRCode value={currentUser.email} renderAs='svg' size={256} />
    </div>
  )
}

export default UserQRcode
