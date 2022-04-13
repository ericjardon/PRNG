import React from 'react'
import ChiSquaredTest from '../stats/chiSquared'
import { GoodnessTestParams } from '../types'
import { TEST_SAMPLE } from '../utils'
export {TEST_SAMPLE} from '../utils'

type Props = {}

export default function TestView({ }: Props) {

    function test() {
        console.log("Test...")
        let params : GoodnessTestParams = {
            sample: TEST_SAMPLE,
            alpha: 0.5
        }

        ChiSquaredTest(params);
    }

    return (
        <div>
            <button onClick={test}>TestChiSquared</button>
        </div>
    )
}