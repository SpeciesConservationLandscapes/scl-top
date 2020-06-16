import React, { useEffect, useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from '@material-ui/core/NativeSelect'
import { useAuth0 } from '../../react-auth0-spa'
import Profile from '../../lib/profile'
import { AppContext } from '../../contexts'

const countryStyle = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  country: {
    float: 'left',
  },
}))

const CountrySelector = () => {
  const classes = countryStyle()
  const context = useContext(AppContext)
  const [countries, setCountries] = useState([])
  const { isAuthenticated } = useAuth0()
  const profile = new Profile()

  const changeCountry = event => {
    const code = event.target.value

    context.setCountryCode(code)
  }

  useEffect(() => {
    profile.getCountries().then(_countries => {
      setCountries(_countries)
      if (_countries && _countries.length > 0) {
        context.setCountryCode(_countries[0].code)
      }
    })
  }, [])

  return (
    <>
      {isAuthenticated && (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="country">Country</InputLabel>
          <NativeSelect
            className={classes.selectEmpty}
            inputProps={{
              name: 'country',
              id: 'country',
            }}
            onChange={changeCountry}
            value={context.countryCode}
          >
            {countries &&
              countries.map(c => {
                return (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                )
              })}
          </NativeSelect>
        </FormControl>
      )}
    </>
  )
}

export default CountrySelector
