import React from 'react'

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
    padding: '2em 3em',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    boxShadow: '0px 10px 10px 10px rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('md')]: {
      margin: '0 10px',
    },
  },
}))


function App() {
  const classes = useStyles()
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      style={{ minHeight: '100vh' }}
    >
      {/*----- Quote -----*/}
      <Grid item className={classes.quoteContainer}>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
        >
          {/*-- Quote --*/}
          <Grid item>
            <FontAwesomeIcon icon={faQuoteLeft} style={{ fontSize: '4rem' }} />
            <Typography variant='h1' style={{ fontSize: matchesMD ? '2.5rem' : '2.75rem', fontWeight: 700 }}>
              What you are is what you have been. What you'll be is what you do now
            </Typography>
          </Grid>

          {/*-- Author --*/}
          <Grid item style={{ marginTop: 15 }}>
            <Typography variant='h2' style={{ fontSize: '2rem', fontWeight: 400, fontStyle: 'italic' }}>
              Buddha
            </Typography>
          </Grid>

          {/*-- Buttons --*/}
          <Grid item>
            <IconButton>
              <FontAwesomeIcon icon={faTwitter} aria-label='Tweet this' />
            </IconButton>
            <Button>
              New Quote
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App
