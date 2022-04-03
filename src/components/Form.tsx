import React, { ChangeEventHandler, useState } from 'react'
import { Button, TextField, Stack, Select, MenuItem, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import FormInputsSwitch from './FormInputsSwitch'
import { METHODS } from '../stats/methods'
import katex from 'katex'

interface Props {
    onSubmit: (random:number) => void,
	setError: (error:string) => void,
    clearCache: ()=>void,
}

const toNumbers = (params:any):any => {
	const result : any = {}
	for (const key in params){
		result[key] = Number.parseFloat(params[key]);
        console.log("Param", key, result[key]);
        if (Number.isNaN(result[key])){
            console.log("unparsed parameter", key)
            return null;
        }
	}
	return result;
}

const Form: React.FC<Props> = ({
	onSubmit,
	setError,
    clearCache,
}) => {

    const [method, setMethod] = useState<string>('midSquares');
    const [seed, setSeed] = useState<string>("");

    const [params, setParams] = useState<any>({});

    const updateHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        setParams({
            ...params,
            [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
			
        });
		console.log((event.target as HTMLInputElement).value)
    }

    const handleMethodChange = (event: SelectChangeEvent) => {
        setParams({})
        setMethod(event.target.value);
        console.log("Method selected:", event.target.value);
        clearCache();
    }

    const getRandom = (): void => {

        if (!method || !seed) return;
        let seedValue = Number.parseFloat(seed);
        if (Number.isNaN(seedValue)) return;

		let numParams = toNumbers(params);
        if (numParams === null) {
            console.log("Some param is wrong")
            setError('Parámetros incorrectos para ' + method);
			return;
        }

        console.log("Method to run:", method);
        const {X, Ri} = METHODS[method](seedValue, numParams);

		if(Ri === -1){
            if (method==='MCM') {
                setError('Los parámetros no cumplen con el teorema de Hull-Dobell');
            } else {
                setError('Parámetros incorrectos para ' + method);
            }
			return;
		}
        else if (Ri==-2) {
            console.log("Module is 1")
            setError('El módulo no puede ser 1');
			return;
        } else if (Number.isNaN(Ri)) {
            setError('Parámetros incorrectos para ' + method);
			return;
        }

        setSeed(X? X.toString() : Ri.toString());
        onSubmit(Ri);
        return;
    }

    const handleSeedChange = (event: React.ChangeEvent<any>) => {
        console.log("New seed", event.target.value)

        setSeed(event.target.value);
    }

    return (
        <div className="formContainer">
            <Stack spacing={2} maxWidth={'25vw'}>
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
                    <MenuItem value={'midSquares'}>Medios Cuadrados</MenuItem>
                    <MenuItem value={'dummy'}>Prueba</MenuItem>
                    <MenuItem value={'MC'}>Congruencial Lineal</MenuItem>
                    <MenuItem value={'MCM'}>Congruencial Lineal Mixto</MenuItem>
                </Select>
                <TextField label="Semilla" variant="filled" value={seed} onChange={handleSeedChange}></TextField>

                <FormInputsSwitch method={method} updateHandler={updateHandler} params={params} />
            </Stack>
            <div className="buttonContainer">
                <Button variant="contained" size="large" onClick={getRandom}>Generar Aleatorio</Button>
            </div>
        </div>
    )
}

export default Form;