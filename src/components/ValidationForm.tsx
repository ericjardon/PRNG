import React, {useState} from 'react'
import TableSwitch from './TableSwitch'
import CalculateIcon from '@mui/icons-material/Calculate';
import FunctionsIcon from '@mui/icons-material/Functions';
import { Button, TextField, Stack, Select, MenuItem, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { Validation } from '../Validation'
import {EXAMPLE_CHI_TABLE} from '../constants'
import { ChiSquaredTable, KolSmiTable, ValidatorResult } from '../types';
import testKolSmi from '../stats/tests/kolmogrovSmirnov';
import chiSquaredTest from '../stats/tests/chiSquared';


type Props = {
	sample: number[]  // mandatory
}

const ValidationForm : React.FC<Props> = ({sample}) => {

    const [alpha, setAlpha] = useState<string>('0.05');
	const [results, setResults] = useState<ValidatorResult | null>();

    const handleAlphaSelect = (event: SelectChangeEvent) => {
        setAlpha(event.target.value);
    }

	const runChiSquared = () => {
		let validationResults : ValidatorResult = chiSquaredTest({
			sample: sample,
			alpha: Number(alpha),
		})

		setResults(validationResults);

	}

	const runKolSmi = () => {
		let validationResults : ValidatorResult = testKolSmi({
			sample: sample,
			alpha: Number(alpha),
		})

		setResults(validationResults);
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
					<MenuItem value={'0.1'}>0.1</MenuItem>
					<MenuItem value={'0.15'}>0.15</MenuItem>
					<MenuItem value={'0.2'}>0.2</MenuItem>
					<MenuItem value={'0.25'}>0.25</MenuItem>
					<MenuItem value={'0.3'}>0.3</MenuItem>
					<MenuItem value={'0.35'}>0.35</MenuItem>
					<MenuItem value={'0.4'}>0.4</MenuItem>
					<MenuItem value={'0.45'}>0.45</MenuItem>
					<MenuItem value={'0.5'}>0.5</MenuItem>
					<MenuItem value={'0.55'}>0.55</MenuItem>
					<MenuItem value={'0.6'}>0.6</MenuItem>
					<MenuItem value={'0.65'}>0.65</MenuItem>
					<MenuItem value={'0.7'}>0.7</MenuItem>
					<MenuItem value={'0.75'}>0.75</MenuItem>
					<MenuItem value={'0.8'}>0.8</MenuItem>
					<MenuItem value={'0.85'}>0.85</MenuItem>
					<MenuItem value={'0.9'}>0.9</MenuItem>
					<MenuItem value={'0.95'}>0.95</MenuItem>
					<MenuItem value={'0.975'}>0.975</MenuItem>
					<MenuItem value={'0.99'}>0.99</MenuItem>
					<MenuItem value={'0.995'}>0.995</MenuItem>
					<MenuItem value={'0.9975'}>0.9975</MenuItem>
					<MenuItem value={'0.999'}>0.0999</MenuItem>

				</Select>
			</div>
			<div className="validation-buttons">
				<Button variant="contained" id='validationButton' startIcon={<FunctionsIcon />} onClick={() => console.log(Validation.ChiSquared)}>Chi Square </Button>
				<Button variant="contained" id='validationButton' startIcon={<CalculateIcon />} onClick={() => console.log(Validation.KolmogorovSmirnov)}>Kolmogorov Smirnov</Button>
			</div>
			<TableSwitch data={{result: false, table: EXAMPLE_CHI_TABLE}} type={1}/>
      </>
  )
}

export default ValidationForm;