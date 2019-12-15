import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'

const aboutStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  contentWrap: {
    maxHeight: 400,
    overflowY: 'auto',
  },
  aboutFooter: {
    textAlign: 'center',
  },
  callToAction: {
    // margin: theme.spacing(),
  },
}))

const About = () => {
  const classes = aboutStyles()

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" component="h3" align="center">
        About Tiger Landscapes v3.0
      </Typography>
      <div className={classes.contentWrap}>
        <Typography component="p" paragraph variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
          vulputate velit, sit amet gravida augue. Fusce neque libero, placerat at
          tortor sit amet, commodo eleifend justo. Vestibulum interdum ullamcorper
          sem et pellentesque. Quisque iaculis felis sed pretium hendrerit. Nulla
          facilisi. Praesent ut vehicula ipsum, viverra posuere nibh. Nunc varius
          sodales nibh, nec tincidunt ante lacinia porttitor. Nam facilisis metus
          et arcu pharetra lacinia. Curabitur tincidunt ante eu porttitor
          vehicula. Donec faucibus elementum orci vitae rhoncus. Vestibulum et
          bibendum eros.
        </Typography>
        <Typography component="p" paragraph variant="body2">
          Aenean ac convallis velit. Curabitur luctus eu lectus id aliquam. Mauris
          convallis nunc leo, vitae lacinia diam euismod quis. Nam aliquam, turpis
          ut feugiat dignissim, elit ligula sollicitudin risus, et finibus arcu
          dolor at felis. Curabitur auctor porta eros in semper. Mauris consequat
          purus in mollis posuere. Praesent volutpat massa ut turpis tincidunt
          efficitur. Nulla vitae mi efficitur, luctus lorem et, porta nisl. Donec
          lorem ante, ornare sollicitudin diam sit amet, lobortis accumsan ante.
          Nullam egestas ex vel dui convallis, nec eleifend dui hendrerit. In sit
          amet nunc ac dolor pretium ullamcorper non eu mauris.
        </Typography>
      </div>
      <div className={classes.aboutFooter}>
        <Button className={classes.callToAction} variant="contained" size="large" color="primary" href="/map">Go to Map</Button>
      </div>
    </Paper>
  )
}

export default About
