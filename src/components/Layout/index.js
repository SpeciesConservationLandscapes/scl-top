import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Router, Route, Switch } from 'react-router-dom'
import { useAuth0 } from '../../react-auth0-spa'
import history from '../../lib/history'
import Header from '../Header'
import Footer from '../Footer'
import Home from '../Home'
import Map from '../Map'
import PrivateRoute from "../PrivateRoute"

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    background: 'url(images/bg.jpg) no-repeat center center fixed',
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    backgroundSize: 'cover',

    paddingBottom: '36px',
    height: '100%',
    flex: 1,
  },
}))

const Layout = () => {
  const classes = useStyles()
  const { loading } = useAuth0()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router history={history}>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.main}>
          <Switch>
            <Route path="/" component={Home} exact />
            <PrivateRoute path="/map" component={Map} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default Layout
