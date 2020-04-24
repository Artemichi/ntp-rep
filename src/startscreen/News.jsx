import React, { useState, useEffect } from 'react'
import app from '../database/firebase'
import Grid from '@material-ui/core/Grid'
import MediaCard from './MediaCard'

const News = () => {
  const [news, setNews] = useState([])

  useEffect(() => {
    const getNews = async (i) => {
      const data = []
      await app
        .firestore()
        .collection('news')
        .orderBy('date', 'desc')
        .limit(i)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => data.push(doc.data()))
        })

      setNews(data)
    }

    window.innerWidth < 767 ? getNews(1) : getNews(3)
  }, [])

  return (
    <Grid container direction='row' justify='space-around' alignItems='baseline'>
      {news && news !== null && news !== undefined
        ? news.map((n, i) => (
            <Grid item xs={12} md={4} key={i}>
              <MediaCard card={n} />
            </Grid>
          ))
        : null}
    </Grid>
  )
}

export default News
