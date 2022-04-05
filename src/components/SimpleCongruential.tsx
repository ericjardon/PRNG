
import React, { ChangeEventHandler, useState } from 'react';
import { Button, TextField } from '@mui/material'
import {Handler} from '../types'

interface Props {
    a?:number,
    c?:number,
    m?:number,
    isMultiplicative: boolean,
    updateHandler: Handler,
}


const Congruential : React.FC<Props> = ({
    a,
    c,
    m,
    isMultiplicative,
    updateHandler
}) => {
    
    
    return (
        <>
        <TextField name="m" label="Módulo" variant="filled" value={m || ''} onChange={updateHandler}/>
        <TextField name="a" label="Multiplicador" variant="filled" value={a || ''} onChange={updateHandler}/>
        {(!isMultiplicative && <TextField name="c" label="Incremento" variant="filled" value={c || ''} onChange={updateHandler}/>)}
        </>
    )
}

export default Congruential;