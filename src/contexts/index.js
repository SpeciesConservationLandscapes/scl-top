import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const AppContext = React.createContext({ countryCode: '' })

export class AppContextProvider extends Component {
  constructor() {
    super()
    this.state = {
      countryCode: '',
    }
  }

  setCountryCode = countryCode => {
    this.setState({ countryCode })
  }

  render() {
    const { setCountryCode } = this

    return (
      <>
        <AppContext.Provider value={{ ...this.state, setCountryCode }}>
          {this.props.children}
        </AppContext.Provider>
      </>
    )
  }
}

AppContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
