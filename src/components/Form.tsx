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

    return (
        <div className="formContainer">
            <Stack>
            <h3>Método: Métodos Cuadrados</h3>
            <div className="inputsContainer">

            <TextField label="Semilla" variant="filled">Hello</TextField>
            </div>
            <FormInputsSwitch method={method} updateHandler={handleInputs}/>
            <div className="buttonContainer">
                <Button>Click ME</Button>
            </div>
            </Stack>                
        </div>
    )
}

export default Form;