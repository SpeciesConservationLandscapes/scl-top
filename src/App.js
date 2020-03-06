import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Layout } from './components'
import { AppContextProvider } from './contexts'
import './App.css'

function App() {
  return (
    <CssBaseline>
      <AppContextProvider>
        <Layout />
      </AppContextProvider>
    </CssBaseline>
  )
}

export default App
