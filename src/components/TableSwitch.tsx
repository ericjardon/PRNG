import React from 'react'
import TestTable from './output/TestTable'
import DataTable from './output/DataTable'
import { ChiSquaredTable, KolSmiTable, ValidatorResult } from '../types'


type Props = {
    data: ValidatorResult,
    type: number,
}

const TableSwitch : React.FC<Props> = ({
    data,
    type
}) => {

    // Don't show anything if there is no table data
    if (!data) {
        return <></>
    }

    // Demian
    if (type===1) {
        return (
            <TestTable data={data}/>
        )
    }

    else {
        return (
            <DataTable data={data}/>
        )
    }
}

export default TableSwitch