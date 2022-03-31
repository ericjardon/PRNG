import React, { ChangeEventHandler, useState } from 'react';
import { Button, TextField, Stack, Select, MenuItem, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select';
import FormInputsSwitch from './FormInputsSwitch'
import { METHODS } from '../stats/methods'
import katex from 'katex'
interface Props {
    onSubmit: (random:number) => void,
	setError: (error:string) => void,
}

const Form: React.FC<Props> = ({
	onSubmit,
	setError,
}) => {

    const seedLabel = katex.renderToString("X_0");
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
    }

    const getRandom = (): void => {
        // call current method's .generate() method
        // send the value up to the parent component
        // the parent should display it in the right column.
        // update Seed to be this value,
        if (method==="" || seed==="") return;
        let seedValue = Number.parseFloat(seed);
        if (seedValue === NaN) return;
		console.log("Method selected:", method);
        const nextRandom = METHODS[method](seedValue, params);
		if(nextRandom === -1){
			setError('Parámetros incorrectos para ' + method);
			return;
		}
        console.log("Random");
		console.log("");
        setSeed(nextRandom.toString());
        onSubmit(nextRandom);
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