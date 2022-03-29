import * as React from 'react';
import {Button, TextField} from '@mui/material'

interface Props {
    onSubmit: ()=>void,
}

const Form: React.FC<Props> = () => {
    return (
        <>
            <TextField label="Semilla" variant="filled">Hello</TextField>
        </>
    )
}

export default Form;