import React from 'react';
import logo from './logo.svg';
import './styles/App.css';
import MainView from './components/MainView'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import {BrowserRouter as Router} from 'react-router-dom'

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
  /* Palette
  dark: #20232a
  background: ##282c34
  accent: #61dafb
  */
})

function App() {
  return (
    <Router>
    <ThemeProvider theme={theme}>
      <MainView />
    </ThemeProvider>
    </Router>
    )
}

export default App;
