import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { useAuth0 } from '../../react-auth0-spa'

const PrivateRoute = ({ Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if (loading || isAuthenticated) {
      return
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path },
      })
    }

    fn()
  }, [loading, isAuthenticated, loginWithRedirect, path])

  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null

  return <Route path={path} render={render} {...rest} />
}

export default PrivateRoute

PrivateRoute.defaultProps = {
  path: '/home'
}

PrivateRoute.propTypes = {
  Component: PropTypes.node.isRequired,
  path: PropTypes.string
}
