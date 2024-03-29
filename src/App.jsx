import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import {
  Button,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@material-ui/core'

import {
  makeStyles,
  useTheme,
} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  quoteContainer: {
    maxWidth: 900,
    padding: '2rem 3rem',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    boxShadow: '0px 10px 10px 10px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(0.1rem)',
    [theme.breakpoints.down('md')]: {
      margin: '0 10px',
    },
  },
  button: {
    backgroundColor: '#333',
    color: 'white',
    fontSize: '1.2rem',
    height: '2.5rem',
    borderRadius: 10,
    padding: '0.5rem 1.8rem',
    boxShadow: '0 0.3rem rgba(121, 121, 121, 0.65)',
    transitionDuration: '0s',
    '&:hover': {
      backgroundColor: '#333',
      filter: 'brightness(110%)',
    },
    '&:active': {
      transform: 'translate(0, 0.3rem)',
      boxShadow: 'none',
    },
  },
  twitterButton: {
    fontSize: '1.5rem',
    '&:hover': {
      color: '#38a1f3',
    },
  },
  spinner: {
    border: '16px solid #f3f3f3', /* Light grey */
    borderTop: '16px solid #000',
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    animation: '$spin 2s linear infinite',
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}))


function App() {
  const classes = useStyles()
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))

  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(false)

  const isLongQuote = quote.length > 120

  // eslint-disable-next-line
  const getQuote = () => {
    const proxyUrl = 'https://cors-anywhere-oscar.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'

    setLoading(true)
    fetch(proxyUrl + apiUrl)
      .then(resp => resp.json())
      .then(data => {
        setQuote(data.quoteText)
        setAuthor(data.quoteAuthor)
        setLoading(false)
      })
      .catch(() => {
        setTimeout(() => {
          getQuote()
        }, 1000)
      })
  }

  useEffect(() => {
    getQuote()
    // eslint-disable-next-line
  }, [])

  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
  }

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      style={{ minHeight: '100vh' }}
    >
      {
        loading
          ?
          <Grid item>
            <div className={classes.spinner} />
          </Grid>
          :
          <Grid item className={classes.quoteContainer}>
            {/*----- Quote -----*/}
            <Grid
              container
              direction='column'
              justifyContent='center'
              alignItems='center'
            >
              {/*-- Quote --*/}
              <Grid item>
                <FontAwesomeIcon icon={faQuoteLeft} style={{ fontSize: '4rem' }} />
                <Typography
                  variant='h1'
                  style={{
                    fontSize: isLongQuote ? '2.0rem' : matchesMD ? '2.5rem' : '2.75rem',
                    fontWeight: 700,
                  }}
                >
                  {quote}
                </Typography>
              </Grid>

              {/*-- Author --*/}
              <Grid item style={{ marginTop: 15 }}>
                <Typography variant='h2' style={{ fontSize: '2rem', fontWeight: 400, fontStyle: 'italic' }}>
                  {author}
                </Typography>
              </Grid>

              {/*-- Buttons --*/}
              <Grid item container direction='row' justifyContent='space-between'>
                <Grid item>
                  <IconButton className={clsx(classes.button, classes.twitterButton)} onClick={tweetQuote}
                              disableRipple>
                    <FontAwesomeIcon icon={faTwitter} aria-label='Tweet this' />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Button className={classes.button} onClick={getQuote} disableRipple>
                    New Quote
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      }
    </Grid>
  )
}

export default App
