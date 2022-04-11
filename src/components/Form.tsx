import React, { ChangeEventHandler, useState, useEffect } from 'react'
import { Button, TextField, Stack, Select, MenuItem, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import FormInputsSwitch from './FormInputsSwitch'
import { METHODS } from '../stats/methods'
import {validateNumeric, toNumbers, completeParams} from '../utils'
import {RNG} from '../RNGs'
interface Props {
    onSubmit: (randoms:number[]) => void,
	setError: (error:string) => void,
    clearRandoms: ()=>void,
    updateGlobalState: (name:string, value:any) => void,
}

const Form: React.FC<Props> = ({
	onSubmit,
	setError,
    clearRandoms,
    updateGlobalState,
}) => {

    const [method, setMethod] = useState<string>("dummy");
    const [seed, setSeed] = useState<string>("");
    const [numberRandoms, setNumberRandoms] = useState<string>("");
    const [params, setParams] = useState<any>({});
    const [completeForm, setCompleteForm] = useState<boolean>(false);
    const [seedLabel, setSeedLabel] = useState<string>("Semilla");

    useEffect(() => {
        updateGlobalState('method', method);
    }, [])

    useEffect(() => {          // completeForm updater
        if (method !== "" && validateNumeric(seed) && validateNumeric(numberRandoms) && completeParams(params, method)) {
            setCompleteForm(true);
        } else {
            setCompleteForm(false);
        }
    }, [seed, method, params])

    useEffect(() => {
        if (method === RNG.MidSquares) {
            setSeedLabel("Semilla (4 dígitos)");
        } else {
            setSeedLabel("Semilla");
        }
    }, [method])

    const updateHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        setParams({
            ...params,
            [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
        });
    }

    const handleMethodChange = (event: SelectChangeEvent) => {
        setParams({})
        setMethod(event.target.value);
        console.log("Method selected:", event.target.value);
        clearRandoms();
        updateGlobalState('method', method);
    }

    const getRandom = (): void => {

        if (!method || !seed) return;
        let seedValue : number = Number.parseFloat(seed);
        if (Number.isNaN(seedValue)) return;
        if (seedValue <= 0) {
            setError('La semilla debe ser mayor a 0');
            return;
        }

		let numParams : any = toNumbers(params);
        if (numParams === null) {
            setError('Parámetros incorrectos');
			return;
        }

        console.log("Method to run:", method);
        
        if (method !== RNG.MathRandom) {
            console.log("Unsupported for now");
            return;
            // const {X, Ri} = METHODS[method](seedValue, numParams);
            // if(Ri === -1){
            //     if (method===RNG.MixedCongruential) {
            //         setError('Los parámetros no cumplen con el teorema de Hull-Dobell');
            //     } else {
            //         setError('Parámetros incorrectos para ' + method);
            //     }
            //     return;
            // }
            // else if (Ri==-2) {
            //     console.log("Module is 1")
            //     setError('El módulo no puede ser 1');
            //     return;
            // } else if (Number.isNaN(Ri)) {
            //     setError('Parámetros incorrectos para ' + method);
            //     return;
            // }
    
            // setSeed(X? X.toString() : Ri.toString());
            // onSubmit(Ri);
            // return;
        } else {
            const n = Number.parseInt(numberRandoms);
            const randoms: number[] = (METHODS[method](seedValue, numParams, n) as number[]);
            onSubmit(randoms);
        }
		
    }

    const handleSeedChange = (event: React.ChangeEvent<any>) => {
        console.log("New seed", event.target.value)

        setSeed(event.target.value);
    }

    const handleNumberRandomsChange = (event: React.ChangeEvent<any>) => {
        setNumberRandoms(event.target.value);
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
                    <MenuItem value={RNG.MixedCongruential}>Mixed Congruential</MenuItem>
                    <MenuItem value={RNG.CombinedCongruential}>Combined Congruential</MenuItem>
                    <MenuItem value={RNG.MultiplicativeCongruential}>Multiplicative Congruential</MenuItem>
                    <MenuItem value={RNG.MathRandom}>Math.Random</MenuItem>
                </Select>
                <TextField label="Número de Aleatorios" variant="filled" value={numberRandoms} onChange={handleNumberRandomsChange}></TextField>
                <TextField label={seedLabel} variant="filled" value={seed} onChange={handleSeedChange}></TextField>
                <FormInputsSwitch method={method} updateHandler={updateHandler} params={params} />
            </Stack>
            <div className="buttonContainer">
                <Button disabled={!completeForm} variant="contained" size="large" onClick={getRandom}>Generar {numberRandoms} Randoms</Button>
            </div>
        </div>
    )
}

export default Form;