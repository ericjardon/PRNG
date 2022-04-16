
import React, { ChangeEventHandler, useState } from 'react';
import { TextField, Grid, Alert } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {Handler, CongruentialParams} from '../../types'
import {MAX_COMBINED_GENERATORS} from '../../constants'

interface Props {
    params:any,
    updateHandler: Handler,
}

interface SingleInputProps {
    index:number,  // used to update at array[key]
    s:number,
    m:number,
    a:number,
    updateHandler: Handler,
}

    // Composition
    const SingleCongruentialInputs = ({
        index, 
        a,
        m,
        s,
        updateHandler
    } : SingleInputProps) => {
        return (
            <>
                <Grid item xs={4}>
                    <div style={{marginBottom: '8px'}}>
                        <TextField name={`s${index}`} label={`S ${index}`} variant="filled" 
                        value={s} 
                        onChange={updateHandler}/>
                    </div>
                    <div style={{marginBottom: '8px'}}>
                        <TextField name={`m${index}`} label={`M ${index}`} variant="filled" 
                        value={m} 
                        onChange={updateHandler}/>
                    </div>
                    <TextField name={`a${index}`} label={`A ${index}`} variant="filled" 
                    value={a} 
                    onChange={updateHandler}/>
                </Grid>
            </>
        )
    }

const CombinedCongruential : React.FC<Props> = ({
    params,
    updateHandler
}) => {
    // fill combinedParams with as many objects 
    const [numGenerators, setNumGenerators] = useState<string>('');
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

    return (
        <>
            <TextField name="numGenerators" label="Número de generadores" variant="filled" 
                value={numGenerators} 
                onChange={updateNum}
            />
            {alert}
            <Grid container spacing={1}>
                {inputs.map(index => {
                    const s = params[`s${index}`];
                    const m = params[`m${index}`];
                    const a = params[`a${index}`];
                    return <SingleCongruentialInputs key={index} index={index} a={a || ''} m={m ||''} s={s||''} updateHandler={updateHandler}/>
                })}
            </Grid>
        </>
    )
}


export default CombinedCongruential;