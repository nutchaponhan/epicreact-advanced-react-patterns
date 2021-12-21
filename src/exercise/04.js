// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

function callAll(...fns){
  return (...args) => {
    fns.forEach(fn => {
      fn && fn(...args)
    })
  }
}

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  const getToggleProps = ({ onClick, ...props} = {}) => {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props
    }
  }

  return {on, toggle, getToggleProps}
}

function App() {
  const {on, getToggleProps} = useToggle()
  return (
    <div>
      <Switch {...getToggleProps({ on })} />
      <hr />
      <button  {...getToggleProps({
        'aria-label': "custom-button",
        onClick: () => console.log('btn click')
      })}>
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
