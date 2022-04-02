import React from 'react'
import { Stack } from '@mui/material'
import {Link} from 'react-router-dom'

type Props = {
    random: number | null,
    alert: any,
}

const Result: React.FC<Props> = ({
    random,
    alert
}) => {
    return (
        <div className="resultContainer">
            <Link to={"/validation"} className="linkToValidation">Validación</Link>
            <Stack spacing={3}>
                {alert}
                <div>
                    {random !== null ? `Tu aleatorio: ${random}`
                        : 'Llena los parámetros y haz click en "Generar"'
                    }
                </div>
            </Stack>
        </div>
    )
}

export default Result