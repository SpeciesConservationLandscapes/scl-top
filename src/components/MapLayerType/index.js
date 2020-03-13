import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

import usePrevious from '../../lib/usePrevious'

const MapLayerType = ({ map, layers }) => {
  const layerNames = Object.keys(layers)
  const [radioValue, setRadioValue] = useState('None')
  const prevRadioValue = usePrevious(radioValue)

  const handleChange = event => {
    setRadioValue(event.target.value)
  }

  useEffect(() => {
    if (radioValue === "None") {
      if (prevRadioValue !== '' && prevRadioValue !== undefined) {
        map.current.removeLayer(layers[prevRadioValue])
      }
    } else if (prevRadioValue === "None") {
      map.current.addLayer(layers[radioValue])
    } else {
      map.current.removeLayer(layers[prevRadioValue])
      map.current.addLayer(layers[radioValue])
    }
  }, [radioValue])

  const layerOptions = layerNames.map(name => {
    return <FormControlLabel key={name} value={name} control={<Radio />} label={name}/>
  })

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={radioValue} onChange={handleChange}>
        {layerOptions}
        <FormControlLabel key="None" value="None" control={<Radio />} label="None"/>
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
