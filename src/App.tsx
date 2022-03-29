import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainView from './components/MainView'
import {ThemeProvider, createTheme} from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App-header">
      <MainView />
      </div>
    </ThemeProvider>
    )
}

export default App;
