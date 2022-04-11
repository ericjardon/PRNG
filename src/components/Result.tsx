import React from 'react'
import { Stack, List, ListItem, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import NumberList from './NumberList'

type Props = {
    random: number | null,
    alert: any,
    randoms: number[],
    method: string,
}

const Result: React.FC<Props> = ({
    random,
    alert,
    randoms,
    method
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
                {randoms.length > 0 ?
                    <>
                        <h3>{randoms.length} Aleatorios Generados</h3>
                        <NumberList numsList={randoms} method={method}/>
                    </>
                    : <></>
                }

            </Stack>
        </div>
    )
}

export default Result