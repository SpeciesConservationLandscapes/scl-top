import React, { useState, useEffect, useContext } from 'react'

import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import styled from 'styled-components/macro'
import withStyles from '@material-ui/core/styles/withStyles'
import AvailabelDate from '../../lib/availabledate'
import { AppContext } from '../../contexts'

const DateSliderBox = styled(Box)`
  padding: ${props =>
    props.datelength > 0 ? '20px 40px 0 40px' : '20px 40px 13px 40px'};
  background: linear-gradient(rgba(0, 0, 0, 0.1), #eeeeee);
`

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'

const IOSSlider = withStyles({
  root: {
    color: 'black',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -7,
    marginLeft: -7,
    '&:focus,&:hover,&$active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider)

const DateSlider = () => {
  const countryContext = useContext(AppContext).countryCode
  const context = useContext(AppContext)

  const species = { id: 1, name: 'Panthera tigris' }
  const availableDate = new AvailabelDate()
  const [dateValue, setDateValue] = useState([])
  const [sliderValue, setSliderValue] = useState(100)

  const calRelativeValue = (min, max, n) => {
    const numerator = n - min
    const denominator = max - min

    return (numerator / denominator) * 100
  }

  const dateMarksFormat = dateArray => {
    let result = []

    if (dateArray && Array.isArray(dateArray)) {
      const dateLength = dateArray.length
      const firstDate = new Date(dateArray[0]).getTime()
      const lastDate = new Date(dateArray[dateLength - 1]).getTime()

      if (dateLength === 1) {
        result.push({
          value: 100,
          label: dateArray[0],
        })
      } else {
        result = dateArray.map(date => {
          const dateMark = new Date(date).getTime()

          return {
            value: calRelativeValue(firstDate, lastDate, dateMark),
            label: date,
          }
        })
      }
    }

    return result
  }

  const handleSliderChange = (event, newVal) => {
    setSliderValue(newVal)
    dateValue.forEach(e => {
      if (newVal === e.value) {
        context.setDate(e.label)
      }
    })
  }

  useEffect(() => {
    if (!(countryContext === null || countryContext === '')) {
      availableDate.getDate(countryContext, species).then(date => {
        const dateFormat = dateMarksFormat(date.data)

        const dateLabel =
          dateFormat.length > 0 ? dateFormat[dateFormat.length - 1].label : ''

        setDateValue(dateFormat)
        setSliderValue(100)
        context.setDate(dateLabel)
      })
    }
  }, [countryContext])

  return (
    <DateSliderBox datelength={dateValue.length}>
      <IOSSlider
        value={sliderValue}
        onChange={handleSliderChange}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        marks={dateValue}
      />
    </DateSliderBox>
  )
}

export default DateSlider
