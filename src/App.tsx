import './styles/App.css';
import MainView from './components/MainView'
import ValidationView from './components/ValidationView'
import NumberList from './components/NumberList'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <nav className="Nav">
          <h3>Métodos Cuantitativos y Simulación</h3>
        </nav>
        <Routes>
          <Route path="/" element={<MainView/>} />
          <Route path="/validation" element={<ValidationView />} />
          <Route path="/test" element={<NumberList method={'Cuadrados'} numsList={[1,2,3,4,5,6,7,8,9,1,2,3,5,5,7,8,2,3,5,6,7,6]}/>} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

/* Palette
dark: #20232a
background: ##282c34
accent: #61dafb
*/

export default App;
