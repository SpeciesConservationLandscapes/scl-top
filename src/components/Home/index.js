import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import About from '../About'

const homeStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '100px',
    paddingBottom: '35px',
    overflow: 'hidden',
  },
  about: {
    padding: theme.spacing(2),
    textAlign: 'center',
  }
}))

const Home = () => {
  const classes = homeStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <About className="classes.about"/>
        </Grid>
        <Grid item xs={4} />
      </Grid>
    </div>
  )
}

export default Home
