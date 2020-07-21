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

  const convertNewDate = date => {
    const datePart = date.split('-')

    return new Date(
      Number(datePart[0]),
      Number(datePart[1]) - 1,
      Number(datePart[2]),
    )
  }

  const calRelativeValue = (min, max, n) => {
    const numerator = n - min
    const denominator = max - min

    return (numerator / denominator) * 100
  }

  const dateMarksFormat = array => {
    const valueLength = array.length
    const firstDate = new Date(array[0]).getTime()
    const lastDate = new Date(array[valueLength - 1]).getTime()

    let result = []

    if (valueLength === 1) {
      result.push({
        value: 100,
        label: convertNewDate(array[0]).toLocaleDateString(),
      })
    } else {
      result = array.map(date => {
        const dateTime = new Date(date).getTime()

        return {
          value: calRelativeValue(firstDate, lastDate, dateTime),
          label: convertNewDate(date).toLocaleDateString(),
        }
      })
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
        const dateData = date.data

        const dateFormat =
          dateData.length > 0 ? dateMarksFormat(dateData) : dateData

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
