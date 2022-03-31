
import React, { ChangeEventHandler, useState } from 'react';
import { Button, TextField, Stack, Select, MenuItem, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select';
/* a: number, // multiplicador
c: number, // increment
m: number, // module
 */

interface Props {
    a?:number,
    c?:number,
    m?:number,
    updateHandler: Handler,
}

type Handler = (event: React.ChangeEvent<any>) => void;

const MCM : React.FC<Props> = ({
    a,
    c,
    m,
    updateHandler
}) => {


    return (
        <>
        <TextField name="m" label="Módulo" variant="filled" value={m || ''} onChange={updateHandler}/>
        <TextField name="a" label="Multiplicador" variant="filled" value={a || ''} onChange={updateHandler}/>
        <TextField name="c" label="Incremento" variant="filled" value={c || ''} onChange={updateHandler}/>
        </>
    )
}

export default MCM;