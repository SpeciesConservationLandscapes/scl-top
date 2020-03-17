import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const AppContext = React.createContext({ countryCode: '', date: '' })

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

  setDate = date => {
    this.setState({ date })
  }

  render() {
    const { setCountryCode } = this
    const { setDate } = this

    return (
      <>
        <AppContext.Provider value={{ ...this.state, setCountryCode, setDate }}>
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
