import React from 'react'
import { Stack, List, ListItem, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

type Props = {
    random: number | null,
    alert: any,
    cache: number[],
}

const Result: React.FC<Props> = ({
    random,
    alert,
    cache
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
                {cache.length > 0 ?
                    <>
                        <h3>Últimos 30 números</h3>
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
                            {cache.map((n, i) => (
                                <ListItem>
                                <ListItemText
                                    primary={`${i+1} --- ${n}`}
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