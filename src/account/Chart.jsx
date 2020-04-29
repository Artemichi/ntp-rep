import React from 'react'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'

const data = [
  { time: 'Начало недели', amount: 0 },
  { time: '11.05', amount: 1 },
  { time: '12.05', amount: 1 },
  { time: '13.05', amount: 4 },
  { time: '14.05', amount: 1 },
  { time: '15.05', amount: 2 },
]

export default function Chart() {
  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          bottom: 10,
          left: 20,
        }}
      >
        <XAxis dataKey='time' stroke='#000' />
        <YAxis stroke='#000'>
          <Label angle={270} position='left' style={{ textAnchor: 'middle', fill: '#000' }}>
            Продуктивность
          </Label>
        </YAxis>
        <Line type='monotone' dataKey='amount' stroke='#115293' dot />
      </LineChart>
    </ResponsiveContainer>
  )
}
