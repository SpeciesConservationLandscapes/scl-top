import React from 'react'
import PropTypes from 'prop-types'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const MapLayerItem = ({ layerChecked, handleLayerChange, label }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={layerChecked}
          onChange={handleLayerChange}
          color="primary"
        />
      }
      label={label}
    />
  )
}

MapLayerItem.propTypes = {
  layerChecked: PropTypes.bool.isRequired,
  handleLayerChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default MapLayerItem
