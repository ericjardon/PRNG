import React, {useState} from 'react'
import TableSwitch from './TableSwitch'
import CalculateIcon from '@mui/icons-material/Calculate';
import FunctionsIcon from '@mui/icons-material/Functions';
import { Button, TextField, Stack, Select, MenuItem, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { Validation } from '../Validation'
import {EXAMPLE_CHI_TABLE} from '../constants'

function createData(
    K: number,
    start: number,
    end: number,
    frecuency: number,
    f0: number,
    fe: number,
    final: number,
) {
    return { K, start, end, frecuency, f0, fe, final };
}

type Props = {}

const ValidationForm : React.FC<Props> = () => {

    const [alpha, setAlpha] = useState<string>('0.05');

    const rows = [
        createData(0, 0, 0.0, 2, 0, 0, 0),
        createData(1, 0, 0.0, 2, 0, 0, 0),
        createData(2, 0, 0.0, 2, 0, 0, 0),
        createData(3, 0, 0.0, 2, 0, 0, 0),
        createData(4, 0, 0.0, 0, 0, 0, 0)
    ];

    const handleAlphaSelect = (event: SelectChangeEvent) => {
        setAlpha(event.target.value);
    }

	const runValidation = (name: Validation): void => {
		console.log("Validating with:", name);
	}

  return (
      <>
			<div className='Validacion'>
				<h3 id="validation">Validar Aleatorios</h3>
                <h5>Pruebas de Bondad de Ajuste a Distribución Uniforme</h5>
				<InputLabel id="select-label">Seleccione un valor de Alpha</InputLabel>
				<Select
					labelId="method-selector-label"
					id="chi-square"
					value={alpha}
					label="Valor de Alpha"
					onChange={handleAlphaSelect}
				>
					<MenuItem value="">
						<em>Valor de alpha</em>
					</MenuItem>
					<MenuItem value={'0.001'}>0.001</MenuItem>
					<MenuItem value={'0.0025'}>0.0025</MenuItem>
					<MenuItem value={'0.005'}>0.005</MenuItem>
					<MenuItem value={'0.01'}>0.01</MenuItem>
					<MenuItem value={'0.025'}>0.025</MenuItem>
					<MenuItem value={'0.05'}>0.05</MenuItem>
				</Select>
			</div>
			<div className="validation-buttons">
				<Button variant="contained" id='validationButton' startIcon={<FunctionsIcon />} onClick={() => console.log(Validation.ChiSquared)}>Chi Square </Button>
				<Button variant="contained" id='validationButton' startIcon={<CalculateIcon />} onClick={() => console.log(Validation.KolmogorovSmirnov)}>Kolmogorov Smirnov</Button>
			</div>
			<TableSwitch data={EXAMPLE_CHI_TABLE} type={1}/>
      </>
  )
}

export default ValidationForm;