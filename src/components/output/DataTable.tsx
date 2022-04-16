import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
  } from '@mui/material';
import { ChiSquaredTable, KolSmiTable, ValidatorResult } from '../../types';
import { CSVLink } from 'react-csv';
interface DataTableProps {
    data: ValidatorResult;
}

const DataTable : React.FC<DataTableProps> = ({
    data
}) => {

    const heading = ('Dplus' in data) ? "Kolmogorov-Smirnov" : "Ji-Cuadrada"

  return (
    <div className={"flexDivY"}>
        <h3>{heading}</h3>
        <div className="flexDivX">

        </div>
    </div>
  )
}

const colNamesCS : Record<string, string> = {
    classStart: 'Comienzo',
    classEnd: 'Fin',
    classLength: 'Longitud',
    observedFrequencies: 'F. Observada',
    expectedFrequencies: 'F. Esperada',
    differential: 'Desvío*',
} 

const colNamesKS : Record<string, string> = {
    Ri: 'Ri',
    Fx: 'i/N',
    Dplus: 'i/N - Ri',
    Dminus: 'Ri - (i-1)/N',
}


export default DataTable;