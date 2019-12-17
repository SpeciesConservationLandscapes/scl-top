import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useAuth0 } from '../../react-auth0-spa'
import Copyright from '../Copyright'
import OrgsPanel from '../OrgsPanel'

const footerStyles = makeStyles(theme => ({
  footer: {
    bottom: 0,
    width: '100%',
    padding: theme.spacing(1),
    position: 'fixed',
    textAlign: 'center',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
  },
  country: {
    float: 'left',
  },
}))

const Footer = () => {
  const classes = footerStyles()
  const { isAuthenticated } = useAuth0()
  const country = 'India'

  return (
    <footer className={classes.footer}>
      <Grid container spacing={1}>
        <Grid
          item
          xs={3}
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          {isAuthenticated && (
            <Typography
              variant="body2"
              color="textSecondary"
              align="left"
              component="span"
              className={classes.country}
            >
              Country: {country}
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Copyright />
        </Grid>
        <Grid
          item
          xs={4}
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <OrgsPanel />
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
