import React, {useState} from 'react';
import {Button, TextField, Stack} from '@mui/material'
import FormInputsSwitch from './FormInputsSwitch'

interface Props {
    onSubmit: ()=>void,
}

interface MethodParams {
    alpha?:number,
}

const Form: React.FC<Props> = () => {

    const [method, setMethod] = useState<string>('midSquares'); 
    const [seed, setSeed] = useState<number>(0); 
    const [params, setParams] = useState<any>({}); 

    const handleInputs = (event: React.FormEvent<HTMLInputElement>) : void => {
        setParams({
            ...params,
            [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
          });
    }

    const switchMethod = (name: string) : void => {
        setParams({});
        setMethod(name);
    }

    const getRandom = () : void => {
        // call current method's .generate() method
        // send the value up to the parent component
        // the parent should display it in the right column.
        // update Seed to be this value,
        return;
    }

    return (
        <div className="formContainer">
            <Stack spacing={2}>
            <h3>Método: Métodos Cuadrados</h3>
            <div className="inputsContainer">

            <TextField label="Semilla" variant="filled">Hello</TextField>
            </div>
            <FormInputsSwitch method={method} updateHandler={handleInputs}/>

            </Stack>                
            <div className="buttonContainer">
                <Button variant="contained" size="large" onClick={getRandom}>Generar Aleatorio</Button>
            </div>
        </div>
    )
}

export default Form;