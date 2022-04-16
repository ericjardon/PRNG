import './styles/App.css';
import MainView from './components/MainView'
import ValidationView from './components/ValidationView'
import DataTable from './components/output/DataTable'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TestView from './components/TestView'
import { EXAMPLE_CHI_TABLE } from './constants';
import TestTable from './components/output/TestTable';

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
          <Route path="/PRNG" element={<MainView/>} />
          <Route path="/PRNG/data-table" element={<DataTable data={{result:false, table:EXAMPLE_CHI_TABLE}}/>} />
          <Route path="/PRNG/table" element={<TestTable data={{result:false, table:EXAMPLE_CHI_TABLE}}/>} />
          <Route path="/PRNG/chi" element={<TestView/>} />
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
