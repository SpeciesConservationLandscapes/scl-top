import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Copyright from '../Copyright'

const footerStyles = makeStyles(theme => ({
  footer: {
    bottom: 0,
    width: '100%',
    padding: theme.spacing(1),
    position: 'fixed',
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  },
}))

const Footer = () => {
  const classes = footerStyles()

  return (
    <footer className={classes.footer}>
      <Copyright />
    </footer>
  )
}

export default Footer
