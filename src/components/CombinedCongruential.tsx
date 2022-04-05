
import React, { ChangeEventHandler, useState } from 'react';
import { TextField } from '@mui/material'
import {Handler} from '../types'


interface Props {
    a?:number,
    c?:number,
    m?:number,
    a2?:number,
    c2?:number,
    m2?:number
    updateHandler: Handler,
}

const CombinedCongruential : React.FC<Props> = ({
    a,
    c,
    m,
    a2,
    c2,
    m2,
    updateHandler
}) => {


    return (
        <>
        
        <TextField name="m" label="Módulo 1" variant="filled" value={m || ''} onChange={updateHandler}/>
        <TextField name="a" label="Multiplicador 1" variant="filled" value={a || ''} onChange={updateHandler}/>
        <TextField name="c" label="Incremento 1" variant="filled" value={c || ''} onChange={updateHandler}/>

        <TextField name="m2" label="Módulo 2" variant="filled" value={m2 || ''} onChange={updateHandler}/>        
        <TextField name="a2" label="Multiplicador 2" variant="filled" value={a2 || ''} onChange={updateHandler}/>
        <TextField name="c2" label="Incremento 2" variant="filled" value={c2 || ''} onChange={updateHandler}/>
        </>
    )
}

export default CombinedCongruential;