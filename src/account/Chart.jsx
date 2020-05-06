import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'
import { useTheme } from '@material-ui/core/styles'

export default function Chart() {
  const [state] = useState([
    { time: 'Начало недели', amount: 0 },
    { time: '11.05', amount: 1 },
    { time: '12.05', amount: 1 },
    { time: '13.05', amount: 4 },
    { time: '14.05', amount: 1 },
    { time: '15.05', amount: 2 },
  ])
  const theme = useTheme()

  return (
    <ResponsiveContainer>
      <LineChart
        data={state}
        margin={{
          top: 10,
          right: 30,
          bottom: 10,
          left: 20,
        }}
      >
        <XAxis dataKey='time' stroke={theme.palette.text.primary} />
        <YAxis stroke={theme.palette.text.primary}>
          <Label angle={270} position='left' style={{ textAnchor: 'middle', fill: theme.palette.primary.main }}>
            Продуктивность
          </Label>
        </YAxis>
        <Line type='monotone' dataKey='amount' stroke={theme.palette.primary.main} dot />
      </LineChart>
    </ResponsiveContainer>
  )
}
