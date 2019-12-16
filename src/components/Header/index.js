import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import HeaderLogo from '../HeaderLogo'
import { useAuth0 } from '../../react-auth0-spa'
import { theme as projectTheme } from '../../theme'

const headerStyles = makeStyles(theme => ({
  appBarProperty: {
    position: 'fixed',
    background: projectTheme.header.bgColor,
    height: 49,
    justifyContent: 'center',
  },
  toolBarProperty: {
    padding: 0,
  },
  menuIconProperty: {
    margin: 0,
  },
  hide: {
    display: 'none',
  },
  headerItemStyle: {
    padding: theme.spacing(2),
    fontSize: '12px',
    fontWeight: '800',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
}))

const Header = () => {
  const classes = headerStyles()
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  return (
    <AppBar className={classes.appBarProperty}>
      <Toolbar>
        <HeaderLogo />
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Tiger Conservation Landscapes 3.0
        </Typography>
        {!isAuthenticated && (
          <Button color="inherit" onClick={() => loginWithRedirect({})}>
            Login
          </Button>
        )}
        {isAuthenticated && <Typography>Signed in as {user.name}</Typography>}
        {isAuthenticated && (
          <Button color="inherit" onClick={() => logout()}>
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
