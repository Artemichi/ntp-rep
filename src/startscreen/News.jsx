import React, { useState, useEffect } from 'react'
import app from '../database/firebase'
import { debounce } from '../debounce'
import Grid from '@material-ui/core/Grid'
import MediaCard from './MediaCard'

const News = () => {
  const [news, setNews] = useState([])
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const debounceResize = debounce(() => {
      setScreenWidth(window.innerWidth)
    }, 500)
    window.addEventListener('resize', debounceResize)
    return (_) => window.removeEventListener('resize', debounceResize)
  })

  useEffect(() => {
    let mounted = true
    const getNews = async (i) => {
      app
        .firestore()
        .collection('news')
        .orderBy('date', 'desc')
        .limit(i)
        .onSnapshot(async ({ docs }) => {
          if (mounted) {
            const upd = docs.map((doc) => doc.data())
            setNews(upd)
          }
        })
    }
    screenWidth < 999 ? (screenWidth < 767 ? getNews(1) : getNews(2)) : getNews(3)
    return (_) => (mounted = false)
  }, [screenWidth])

  return (
    <Grid container direction='row' justify='space-around' alignItems='baseline'>
      {news && news !== null && news !== undefined
        ? news.map((n, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <MediaCard card={n} />
            </Grid>
          ))
        : null}
    </Grid>
  )
}

export default News
