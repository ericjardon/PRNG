import React from 'react'
import chiSquaredTest from '../stats/tests/chiSquared'
import testKolSmi from '../stats/tests/kolmogrovSmirnov'
import { GoodnessTestParams } from '../types'
import { SAMPLE_RANDOMS, SAMPLE_RANDOMS_2 } from '../utils'

type Props = {}

export default function TestView({ }: Props) {

    function testCS() {
        console.log("Test...")
        let params : GoodnessTestParams = {
            sample: SAMPLE_RANDOMS,
            alpha: 0.05
        }

        const {result, table} = chiSquaredTest(params)

        if (result) {
            console.log("CHI SQUARED: TRUE");
        } else {
            console.log("CHI SQUARED: FALSE");

        };
    }

    function testKS() {
        console.log("K-S...")

        let params: GoodnessTestParams = {
            sample: SAMPLE_RANDOMS_2,
            alpha: 0.05
        }

        const {result, table} = testKolSmi(params);
        console.log(JSON.stringify(table))

        if (result) {
            console.log("KOL SMI: TRUE");
        } else {
            console.log("KOL SMI: FALSE");

        };
    }

    return (
        <div style={{display:'flex', textAlign:'center', justifyContent:'center', padding:'40px'}}>
            <button onClick={testCS}>TestChiSquared</button>
            <button onClick={testKS}>Test Kolmogorov Smirnov</button>
        </div>
    )
}