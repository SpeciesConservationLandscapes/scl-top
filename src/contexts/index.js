import React from 'react'
import PropTypes from 'prop-types'

export const context = {
  countryCode: '',
}

export const AppContext = React.createContext()

export class AppContextProvider extends React.Component {
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
