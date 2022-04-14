import React, { ChangeEventHandler, useState, useEffect } from 'react'
import { Button, TextField, Stack, Select, MenuItem, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import FormInputsSwitch from './FormInputsSwitch'
import { METHODS } from '../stats/methods'
import { validateNumeric, paramsToIntegers, completeParams } from '../utils'
import { RNG } from '../RNGs'
import { Validation } from '../Validation'
import CalculateIcon from '@mui/icons-material/Calculate';
import FunctionsIcon from '@mui/icons-material/Functions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


interface Props {
	updateRandoms: (randoms: number[]) => void,
	setError: (error: string) => void,
	clearRandoms: () => void,
	updateGlobalState: (name: string, value: any) => void,
}

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
  const rows = [
	createData(0, 0, 0.0, 2, 0, 0,0),
	createData(1, 0, 0.0, 2, 0, 0,0),
	createData(2, 0, 0.0, 2, 0, 0,0),
	createData(3, 0, 0.0, 2, 0, 0,0),
	createData(4, 0, 0.0, 0, 0, 0,0)
  ];

const Form: React.FC<Props> = ({
	updateRandoms,
	setError,
	clearRandoms,
	updateGlobalState,
}) => {

	const [method, setMethod] = useState<string>(RNG.LinearCongruential);
	const [seed, setSeed] = useState<string>("");
	const [numberRandoms, setNumberRandoms] = useState<string>("");
	const [params, setParams] = useState<any>({});
	const [completeForm, setCompleteForm] = useState<boolean>(false);
	const [seedLabel, setSeedLabel] = useState<string>("Semilla");
	const [alpha, setAlpha] = useState<string>("");

	useEffect(() => {
		updateGlobalState('method', method);
	}, [])

	useEffect(() => {          // completeForm updater
		if (method !== "" && validateNumeric(seed) && validateNumeric(numberRandoms) && completeParams(params, method)) {
			setCompleteForm(true);
		} else {
			setCompleteForm(false);
		}
	}, [seed, numberRandoms, method, params])

	useEffect(() => {
		if (method === RNG.MidSquares) {
			setSeedLabel("Semilla (3+ dígitos)");
		} else {
			setSeedLabel("Semilla");
		}
	}, [method])

	const updateHandler = (event: React.FormEvent<HTMLInputElement>): void => {
		const target = event.target as HTMLInputElement;
		//console.log(params);
		setParams({
			...params,
			[target.name]: target.value,
		});
	}

	const handleSeedChange = (event: React.ChangeEvent<any>) => {
		setSeed(event.target.value);
	}

	const handleNumberRandomsChange = (event: React.ChangeEvent<any>) => {
		setNumberRandoms(event.target.value);
	}

	const handleMethodChange = (event: SelectChangeEvent) => {
		setParams({})
		setMethod(event.target.value);
		console.log("Method selected:", event.target.value);
		clearRandoms();
		setSeed("1");

		updateGlobalState('alpha', alpha);
		setAlpha(event.target.value);
		console.log("Alpha seleccionado:", event.target.value);
		updateGlobalState('alpha', alpha);
	}

	const getSeedAsNum = (): number | null => {
		let seedNum: number = Number.parseFloat(seed);

		if (Number.isNaN(seedNum)) {
			setError("Introduce una semilla válida");
			return null;
		};

		if (seedNum <= 0) {
			setError('La semilla debe ser mayor a 0');
			return null;
		}

		return seedNum;
	}

	const getRandom = (): void => {
		const n = Number.parseInt(numberRandoms);
		console.log("How many nums?", n);
		console.log("Form Params", params);

		if (!method || !seed) return;

		let seedNum;
		if (method===RNG.CombinedCongruential) {
			seedNum = 1; // dummy value
		}
		else {
			seedNum = getSeedAsNum();
			if (!seedNum) return;
		}

		console.log("Method selected:", method);

		// Prepare Params
		const { seedVal, cleanParams } = prepareParams(method, seedNum, params, n);

		if (cleanParams === null) {
			setError('Parámetros incorrectos');
			return;
		}

		if (!(method in METHODS)) {
			setError("Método no implementado.");
			return;
		}
		else {
			console.log("Calling method", method, 'with how many?', n);
			console.log("Sending Params:", params);

			const randoms: number[] = METHODS[method](seedVal, cleanParams, n);
			updateRandoms(randoms);
		}
	}

	const runValidation = (name: Validation): void => {
		console.log("Validating with:", name);
	}

	return (
		<div className="formContainer">
			<Stack spacing={2} className="formStack">
				<h4>Parámetros</h4>
				<Select
					labelId="method-selector-label"
					id="method-selector"
					value={method}
					onChange={handleMethodChange}
				>
					<MenuItem value="">
						<em>Sin selección</em>
					</MenuItem>
					<MenuItem value={RNG.MidSquares}>Mid Squares</MenuItem>
					<MenuItem value={RNG.LinearCongruential}>Linear Congruential</MenuItem>
					<MenuItem value={RNG.MultiplicativeCongruential}>Multiplicative Congruential</MenuItem>
					<MenuItem value={RNG.MixedCongruential}>Mixed Congruential</MenuItem>
					<MenuItem value={RNG.CombinedCongruential}>Combined Congruential</MenuItem>
					<MenuItem value={RNG.MathRandom}>Math.Random</MenuItem>
				</Select>
				<TextField label="Número de Aleatorios" variant="filled" value={numberRandoms} onChange={handleNumberRandomsChange}></TextField>
				{method !== RNG.CombinedCongruential &&
					<TextField label={seedLabel} variant="filled" value={seed} onChange={handleSeedChange}></TextField>
				}
				<FormInputsSwitch method={method} updateHandler={updateHandler} params={params} />
			</Stack>
			<div className="buttonContainer">
				<Button disabled={!completeForm} variant="contained" size="large" onClick={getRandom}>Generar {numberRandoms} Randoms</Button>
			</div>
			 <div className='Validacion'>
				<h4>Validación de función con números random</h4>
				<InputLabel id="select-label">Seleccione un valor de Alpha</InputLabel>
				<Select
					labelId="method-selector-label"
					id="chi-square"
					value={alpha}
					label="Valor de Alpha"
					onChange={handleMethodChange}
				>
					<MenuItem value="">
						<em>Valor de alpha</em>
					</MenuItem>
					<MenuItem value={0.001}>0.001</MenuItem>
					<MenuItem value={0.0025}>0.0025</MenuItem>
					<MenuItem value={0.005}>0.005</MenuItem>
					<MenuItem value={0.01}>0.01</MenuItem>
					<MenuItem value={0.025}>0.025</MenuItem>
					<MenuItem value={0.05}>0.05</MenuItem>
				</Select>
			</div>
			<div className="validation-buttons">
				<Button variant="contained" id='validationButton' startIcon={<FunctionsIcon />} onClick={() => console.log(Validation.ChiSquared)}>Chi Square {numberRandoms}</Button>
				<Button variant="contained" id='validationButton' startIcon={<CalculateIcon />}  onClick={() => console.log(Validation.KolmogorovSmirnov)}>Kolmogorov Smirnov {numberRandoms}</Button>
			</div> 
			<TableContainer component={Paper} className='validationTable'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>K</TableCell>
            <TableCell align="right">Start</TableCell>
            <TableCell align="right">End</TableCell>
            <TableCell align="right">F(x)</TableCell>
            <TableCell align="right">F0</TableCell>
			<TableCell align="right">FE</TableCell>
			<TableCell align="right">(O-E)^2/FE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.K}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.K}
              </TableCell>
              <TableCell align="right">{row.start}</TableCell>
              <TableCell align="right">{row.end}</TableCell>
              <TableCell align="right">{row.frecuency}</TableCell>
              <TableCell align="right">{row.f0}</TableCell>
			  <TableCell align="right">{row.fe}</TableCell>
			  <TableCell align="right">{row.final}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
		</div>
	)
}

// used for preprocessing of certain methods
export const prepareParams = (method: string, seedVal: number, params: any, n: number) => {
	if (method === RNG.CombinedCongruential) {

		let a: number[] = [];
		let m: number[] = [];
		let s: number[] = [];
		let k = Number(params.numGenerators);

		for (let i = 1; i <= k; i++) {
			a.push(Number(params[`a${i}`]))
			m.push(Number(params[`m${i}`]))
			s.push(Number(params[`s${i}`]))
		}

		console.log("a", a);
		console.log("m", m);
		console.log("s", s);

		params = {
			a,
			m,
			xi: s, // seeds for mclm
		}  // arrays of length k 

	} else {
		params = paramsToIntegers(params);
	}

	return { seedVal, cleanParams: params };
}

export default Form;