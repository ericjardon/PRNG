import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ChiSquaredTable, KolSmiTable } from '../../types'


type Props = {
    data?: ChiSquaredTable | KolSmiTable,
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


export default function TestTable({ data }: Props) {

    const rows = [
        createData(0, 0, 0.0, 2, 0, 0,0),
        createData(1, 0, 0.0, 2, 0, 0,0),
        createData(2, 0, 0.0, 2, 0, 0,0),
        createData(3, 0, 0.0, 2, 0, 0,0),
        createData(4, 0, 0.0, 0, 0, 0,0)
      ];

    return (
        <TableContainer component={Paper} className='validationTable'>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className='table'>
                <TableHead>
                    <TableRow>
                        <TableCell>K</TableCell>
                        <TableCell align="right">Start</TableCell>
                        <TableCell align="right">End</TableCell>
                        <TableCell align="right">F(x)</TableCell>
                        <TableCell align="right">F0</TableCell>
                        <TableCell align="right">FE</TableCell>
                        <TableCell align="right">(O-E)^2/FE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.K}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.K}
                            </TableCell>
                            <TableCell align="right">{row.start}</TableCell>
                            <TableCell align="right">{row.end}</TableCell>
                            <TableCell align="right">{row.frecuency}</TableCell>
                            <TableCell align="right">{row.f0}</TableCell>
                            <TableCell align="right">{row.fe}</TableCell>
                            <TableCell align="right">{row.final}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}