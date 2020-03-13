import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}))

const MapLayerType = ({ map, layers }) => {
  const classes = useStyles()
  const [value, setValue] = useState('')

  const prevValueRef = useRef()

  useEffect(() => {
    prevValueRef.current = value
  })
  const prevValue = prevValueRef.current

  const handleChange = event => {
    const selectedLayer = event.target.value

    if (prevValue !== '') {
      map.current.removeLayer(layers[prevValue])
    }
    map.current.addLayer(layers[selectedLayer])
    setValue(selectedLayer)
  }

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="Protected Area" control={<Radio />} label="Protected Area" />
        <FormControlLabel value="Biome" control={<Radio />} label="Biome" />
        <FormControlLabel value="Human Influence Index" control={<Radio />} label="Human Influence Index" />
      </RadioGroup>
    </FormControl>
  )
}

MapLayerType.propTypes = {
  map: PropTypes.shape({
    current: PropTypes.object
  }).isRequired,
  layers: PropTypes.instanceOf(Object).isRequired
}

export default MapLayerType
