import './styles/App.css';
import MainView from './components/MainView'
import ValidationView from './components/ValidationView'
import DataTable from './components/output/DataTable'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TestView from './components/TestView'
import { EXAMPLE_CHI_TABLE } from './constants';

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
          <Route path="/test" element={<DataTable data={EXAMPLE_CHI_TABLE}/>} />
          <Route path="/chi" element={<TestView/>} />
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
