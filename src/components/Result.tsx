import React from 'react'
import { Stack, List, ListItem, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

type Props = {
    random: number | null,
    alert: any,
    randoms: number[],
}

const Result: React.FC<Props> = ({
    random,
    alert,
    randoms
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
                        <List dense={true}
                            sx={{
                                width: '100%',
                                maxWidth: 360,
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 300,
                                '& ul': { padding: 0 },
                            }}>
                            {randoms.map((n, i) => (
                                <ListItem>
                                    <ListItemText
                                        primary={`${n}`}
                                    />
                                </ListItem>
                            ))}

                        </List>
                    </>
                    : <></>
                }

            </Stack>
        </div>
    )
}

export default Result