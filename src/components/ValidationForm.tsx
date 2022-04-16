import React, { useState } from 'react'
import TableSwitch from './TableSwitch'
import CalculateIcon from '@mui/icons-material/Calculate';
import FunctionsIcon from '@mui/icons-material/Functions';
import { Button,  Select, MenuItem, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { EXAMPLE_CHI_TABLE } from '../constants'
import { ValidatorResult } from '../types';
import testKolSmi from '../stats/tests/kolmogrovSmirnov';
import chiSquaredTest from '../stats/tests/chiSquared';
import {kolSmiValues, chiSquaredValues } from '../criticalValues';

type Props = {
	sample: number[]  // mandatory
}

const ValidationForm: React.FC<Props> = ({ sample }) => {

	const [alpha, setAlpha] = useState<string>('0.05');
	const [results, setResults] = useState<ValidatorResult | null>(null);
	const [chiEnabled, setChiEnabled] = useState<boolean>(true);
	const [kolEnabled, setKolEnabled] = useState<boolean>(true);

	const handleAlphaSelect = (event: SelectChangeEvent) => {
		let a = event.target.value;
		setAlpha(a);
		setChiEnabled(a in chiSquaredValues[1]);  // requires alpha level and v
		setKolEnabled(a in kolSmiValues);  // requires alpha level and N
	}

	const hasResults = () => results !== null;

	const runChiSquared = () => {
		let validationResults: ValidatorResult = chiSquaredTest({
			sample: sample,
			alpha: Number(alpha),
		})

		setResults(validationResults);

	}

	const runKolSmi = () => {
		let validationResults: ValidatorResult = testKolSmi({
			sample: sample,
			alpha: Number(alpha),
		})

		setResults(validationResults);
	}

	// let exampleData = { result: false, table: EXAMPLE_CHI_TABLE }

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
					<MenuItem value={'0.002'}>0.002</MenuItem>
					<MenuItem value={'0.005'}>0.005</MenuItem>
					<MenuItem value={'0.01'}>0.01</MenuItem>
					<MenuItem value={'0.02'}>0.02</MenuItem>
					<MenuItem value={'0.025'}>0.025</MenuItem>
					<MenuItem value={'0.05'}>0.05</MenuItem>
					<MenuItem value={'0.1'}>0.10</MenuItem>
					<MenuItem value={'0.2'}>0.20</MenuItem>
					<MenuItem value={'0.5'}>0.50</MenuItem>
					<MenuItem value={'0.9'}>0.90</MenuItem>
					<MenuItem value={'0.95'}>0.95</MenuItem>
					<MenuItem value={'0.975'}>0.975</MenuItem>
					<MenuItem value={'0.99'}>0.99</MenuItem>
					<MenuItem value={'0.995'}>0.995</MenuItem>

				</Select>
			</div>
			<div className="validation-buttons">
				<Button variant="contained" id='validationButton' startIcon={<FunctionsIcon />}
					onClick={runChiSquared}
					disabled={!chiEnabled}
					>Chi Square </Button>
				<Button variant="contained" id='validationButton' startIcon={<CalculateIcon />}
					onClick={runKolSmi}
					disabled={!kolEnabled}
					>Kolmogorov Smirnov</Button>
			</div>
			{
				hasResults() &&
				<TableSwitch data={results!} type={1} />
			}
		</>
	)
}

export default ValidationForm;