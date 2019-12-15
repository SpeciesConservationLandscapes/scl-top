import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useAuth0 } from '../../react-auth0-spa'
import Copyright from '../Copyright'

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

  return (
    <footer className={classes.footer}>
      <div>
        {isAuthenticated && (
          <Typography
            variant="body2"
            color="textSecondary"
            align="left"
            component="span"
            className={classes.country}
          >
            Country: Indonesia
          </Typography>
        )}
        <Copyright />
      </div>
    </footer>
  )
}

export default Footer
