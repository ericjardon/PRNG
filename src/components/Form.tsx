import React, { useState } from 'react';
import { Button, TextField, Stack, Select, MenuItem, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select';
import FormInputsSwitch from './FormInputsSwitch'
// import SUPPORTED_METHODS from '../methods';

interface Props {
    onSubmit: () => void,
}

interface MethodParams {
    alpha?: number,
}

const Form: React.FC<Props> = () => {

    const [method, setMethod] = useState<string>('midSquares');
    const [seed, setSeed] = useState<number>(0);
    const [params, setParams] = useState<any>({});

    const handleInputs = (event: React.FormEvent<HTMLInputElement>): void => {
        setParams({
            ...params,
            [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
        });
    }

    const handleMethodChange = (event: SelectChangeEvent) => {
        setParams({})
        setMethod(event.target.value);
        return;
    }

    const getRandom = (): void => {
        // call current method's .generate() method
        // send the value up to the parent component
        // the parent should display it in the right column.
        // update Seed to be this value,
        return;
    }

    return (
        <div className="formContainer">
            <Stack spacing={2}>
                <h4>Parámetros</h4>
                <div className="inputsContainer">

                    <TextField label="Semilla" variant="filled">Hello</TextField>
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
                </div>
                <FormInputsSwitch method={method} updateHandler={handleInputs} />
            </Stack>
            <div className="buttonContainer">
                <Button variant="contained" size="large" onClick={getRandom}>Generar Aleatorio</Button>
            </div>
        </div>
    )
}

export default Form;