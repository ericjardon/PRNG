import React from 'react'
import { Stack } from '@mui/material'

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
            <a className="linkToValidation">Validación</a>
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