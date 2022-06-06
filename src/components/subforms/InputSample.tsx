
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Handler} from '../../types'


interface Props {
    params?:any,
    updateHandler: Handler,
}

const MidSquares : React.FC<Props> = ({params, updateHandler}) => {

    const sample = params.sample;

    return (
        <>
        <TextField
        id="standard-multiline-static"
        label="Muestra"
        multiline
        rows={5}
        variant="standard"
        name="sample"
        value={sample || ''}
        onChange={updateHandler}
      /></>
    )
}

export default MidSquares;