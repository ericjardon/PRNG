
import React, { ChangeEventHandler, useState } from 'react';
import { TextField } from '@mui/material'
import {Handler, CongruentialParams} from '../types'


interface Props {
    params:any,
    updateHandler: Handler,
}

interface SingleInputProps {
    key:number,  // used to update at array[key]
}

const CombinedCongruential : React.FC<Props> = ({
    params,
    updateHandler
}) => {
    // fill combinedParams with as many objects 
    const [numGenerators, setNumGenerators] = useState<string>('1');
    const [num, setNum] = useState<number>(1)  // update on Blur;

    const updateNum = (e: React.FocusEvent) : void => {
        console.log("updating numeric")
        let N = Number(numGenerators);
        if (N) {
            setNum(N);
        } else {
            console.log("could not parse numeric")
        }
    }

    // Composition
    const SingleCongruentialInputs = (props: SingleInputProps) => {
        const {key} = props;
        const a = params[`m${key}`];
        const m = params[`m${key}`]
        return (
            <>
                <TextField name="m" label={`Módulo ${key}`} variant="filled" value={m || ''} onChange={updateHandler}/>
                <TextField name="a" label={`Multiplicador ${key}`} variant="filled" value={a || ''} onChange={updateHandler}/>
            </>
        )
    }

    // Create an array for mapping num inputs
    let inputs = [];
    for (let i=0; i<num; i++) {
        inputs.push(i+1);
    }

    return (
        <>
        <TextField name="numGenerators" label="Número de generadores" variant="filled" 
        value={numGenerators} 
        onChange={(e) => setNumGenerators(e.target.value)}
        onBlur={updateNum}
        >
        </TextField>
        <div>
            {inputs.map(i => {
                <SingleCongruentialInputs key={i}/>
            })}
        </div>
        </>
    )
}

export default CombinedCongruential;