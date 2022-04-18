import React, { ChangeEventHandler, useState, useEffect } from 'react'
import { Button, TextField, Stack, Select, MenuItem } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import FormInputsSwitch from './FormInputsSwitch'
import { METHODS } from '../stats/methods'
import { validateNumeric, paramsToIntegers, completeParams, isInteger } from '../utils'
import { RNG } from '../RNGs'
import { CongruentialParams } from '../types'

interface Props {
	updateRandoms: (randoms: number[]) => void,
	setError: (error: string) => void,
	clearRandoms: () => void,
	updateGlobalState: (name: string, value: any) => void,
}


const Form: React.FC<Props> = ({
	updateRandoms,
	setError,
	clearRandoms,
	updateGlobalState,
}) => {

	const [method, setMethod] = useState<string>(RNG.MidSquares);
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
		updateGlobalState('method', event.target.value);
		clearRandoms();
		setSeed("1");
	}


	const getSeedAsNum = (): number | null => {
		let seedNum: number = Number.parseFloat(seed);

		if (Number.isNaN(seedNum) || !isInteger(seedNum)) {
			setError("Semilla debe de ser un entero");
			console.log("Invalid seed");
			return null;
		};

		if (seedNum <= 0) {
			setError('La semilla debe ser mayor a 0');
			return null;
		}

		return seedNum;
	}

	const getRandom = (): void => {

		const n = Number(numberRandoms);
		if (!isInteger(n) || n<=0) {
			setError('Número de Aleatorios inválido')
			console.log("numRandoms not an int")
			return;
		}

		console.log("How many nums?", n);
		console.log("Form Params", params);

		if (!method || !seed) {
			setError("Llena todos los campos");
			console.log("Method or seed are empty");
			return;
		};

		let seedNum;
		if (method === RNG.CombinedCongruential) {
			seedNum = 1; // dummy value
		}
		else {
			seedNum = getSeedAsNum();
			if (!seedNum) {
				console.log("No valid seed num");
				return;
			};
		}

		console.log("Method selected:", method);

		// Prepare Params
		const { seedVal, cleanParams } = prepareParams(method, seedNum, params, n);
		if (cleanParams === null) {
			setError('Parámetros incorrectos');
			return;
		}

		// If congruentials, check 
		if (method !== RNG.MathRandom && method !== RNG.MidSquares) {
			let ok = true;

			if (method === RNG.CombinedCongruential) {
				for (let i=0; i<cleanParams.m.length; i++) {
					if (!(cleanParams.m[i] > cleanParams.a[i] && cleanParams.m[i] > cleanParams.xi[i])) {
						ok = false;
						break;
					} else {
						console.log(`${cleanParams.m[i]} > ${cleanParams.a[i]} && ${cleanParams.m[i]} > ${cleanParams.xi[i]}`)
					}
				}
			}
			else {
				ok = checkSingleCongruentialParams(seedVal, cleanParams);
			}

			if (!ok) {
				setError('El módulo debe de ser mayor a la semilla y al multiplicador.');
				return;
			}
		}

		if (!(method in METHODS)) {
			setError("Método no implementado.");
			return;
		}
		else {
			console.log("Form params:", cleanParams);

			const returnedRandoms: number[] = METHODS[method](seedVal, cleanParams, n);
			console.log("returned randoms", returnedRandoms);

			if (method === RNG.MixedCongruential && returnedRandoms.length == 0) {
				setError('Parámetros no cumplen con Hull Dobell');
				return;
			}
			console.log("updating randoms")
			updateRandoms(returnedRandoms);
		}
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

// for checking congruential generators: a < m && seed < m
const checkSingleCongruentialParams = (seedVal:number, cleanParams: CongruentialParams) : boolean => {
	const {m, a} = cleanParams;
	return (m > a && m > seedVal);
}


export default Form;