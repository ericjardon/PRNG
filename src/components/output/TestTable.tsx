import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ValidatorResult } from '../../types'
import { CSVLink } from 'react-csv';
import { formatNum } from '../../utils';

type Props = {
    data: ValidatorResult,
}

function createData(
    K: number,
    start: number,
    end: number,
    frecuency: number,
    f0: number,
    fe: number,
    final: number,
) {
    return { K, start, end, frecuency, f0, fe, final };
}

// maps key to display label
const chiSquaredLabels : Record<string,string> = {
    k: 'Clases',
    X02: 'X0²',
    Xv2: 'X²ν,α'
}

const kolSmiLabels : Record<string,string> = {
    DplusMax: 'D+',
    DminusMax: 'D-',
    Dsample: 'D',
    Dalpha: 'Dα,N'
}

// holds column keys for table
const colNames : Record<string, string[]> = {
    chi: [
        'classStart',
        'classEnd',
        'classLength',
        'observedFrequencies',
        'expectedFrequencies',
        'differential'
    ],
    kol: []
}

const colLabels : Record<string, string[]> = {
    chi: [
        'Inicio',
        'Fin',
        'Longitud',
        'FOᵢ',
        'FEᵢ',
        'Desvío'
    ],
    kol: []
}

const summaryStats : Record<string, Record<string,string>> = {
    'chi': chiSquaredLabels,
    'kol': kolSmiLabels,
}


const TestTable : React.FC<Props> = ({data}) => {

    const {result, table} = data;

    if (table === null) return <></>;

    const testName : string = 'classStart' in table ? 'chi' : 'kol';
    console.log(summaryStats[testName]);
    console.log(Object.entries(summaryStats[testName]));

    return (
        <>
            <h5>{testName === 'chi' ? 'Test de Ji-Cuadrada' : 'Test de Kolmogorov-Smirnov'}</h5>
            <div className="flexDivX summaryStats">
                {Object.entries(summaryStats[testName]).map(([stat, label]) => (
                    <TextField
                        key={stat}
                        label={label}
                        variant='outlined'
                        value={(table as any)[stat]}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                ))}
                <TextField
                    key={'result'}
                    label={'H₀: es Uniforme'}
                    variant='outlined'
                    value={result ? 'Se acepta' : 'Se rechaza'}
                    InputProps={{
                        readOnly: true,
                    }}
                    color={
                        result ?
                            'success'
                            : 'error'
                    }
                    focused
                />
            </div>
            {
                testName === 'chi' &&
                <>
                <TableContainer component={Paper} className='validationTable'>
                <Table sx={{ minWidth: 300 }} aria-label="simple table" className='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {testName === 'chi' ? 'K' : 'i'}
                            </TableCell>
                            {colLabels[testName].map((key:string, i:number) => (
                                <TableCell key={i} align="left">
                                    {key}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(table as any)[colNames[testName][0]].map((row:string, row_i:number) => (
                            <TableRow
                                key={row_i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row_i+1}
                                </TableCell>
                                {colNames[testName].map((key, col_i) => (
                                    <TableCell key={`${row_i},${col_i}`} align="left">
                                        {formatNum((table as any)[key][row_i], 4)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </>
    }
        </>

    )
}

export default TestTable;