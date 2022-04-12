
import React, { ChangeEventHandler, useState } from 'react';
import { TextField, Grid, Alert } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {Handler, CongruentialParams} from '../types'
import {MAX_COMBINED_GENERATORS} from '../constants'

interface Props {
    params:any,
    updateHandler: Handler,
}

interface SingleInputProps {
    index:number,  // used to update at array[key]
}

const CombinedCongruential : React.FC<Props> = ({
    params,
    updateHandler
}) => {
    // fill combinedParams with as many objects 
    const [numGenerators, setNumGenerators] = useState<string>('1');
    const [inputs, setInputs] = useState<number[]>([1])  // update on Blur;
    const [alert, setAlert] = useState<ReactJSXElement | null>(null);

    const updateNum = (e: React.ChangeEvent<any>) : void => {
        setAlert(null);
        setNumGenerators(e.target.value);
        updateHandler(e);
        let N:number = Number(e.target.value);
        
        if (N) {
            if (N > MAX_COMBINED_GENERATORS) {
                // set alert
                setAlert(<Alert severity="warning">Máximo 10 generadores</Alert>);
                setInputs([]);
                return;
            }
            let newArr:number[] = []; 
            for(let i=1; i<=N; i++) {
               newArr.push(i);
            }
            setInputs(newArr);
        } else {
            console.log("could not parse numeric");
        }
    }

    // Composition
    const SingleCongruentialInputs = ({index}:SingleInputProps) => {
        const m = params[`m${index}`];
        const a = params[`a${index}`];

        return (
            <>
                <Grid item xs={4}>
                    <div style={{marginBottom: '8px'}}>
                        <TextField name={`m${index}`} label={`Mod ${index}`} variant="filled" 
                        value={m || ''} 
                        onChange={updateHandler}/>
                    </div>
                    <TextField name={`a${index}`} label={`Mult ${index}`} variant="filled" 
                    value={a || ''} 
                    onChange={updateHandler}/>
                </Grid>
            </>
        )
    }

    return (
        <>
            <TextField name="numGenerators" label="Número de generadores" variant="filled" 
                value={numGenerators} 
                onChange={updateNum}
            />
            {alert}
            <Grid container spacing={1}>
                {inputs.map(index => (
                        <SingleCongruentialInputs key={index} index={index}/>                        
                ))}
            </Grid>
        </>
    )
}

export default CombinedCongruential;