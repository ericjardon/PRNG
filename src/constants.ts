import {ChiSquaredTable} from './types'

export const MAX_COMBINED_GENERATORS = 10;

export const EXAMPLE_CHI_TABLE : ChiSquaredTable = JSON.parse(`{
    "classStart": [
        0,
        0.3333333333333333,
        0.5,
        0.6666666666666666
    ],
    "classEnd": [
        0.3333333333333333,
        0.5,
        0.6666666666666666,
        1
    ],
    "classLength": [
        2,
        1,
        1,
        2
    ],
    "observedFrequencies": [
        13,
        20,
        9,
        8
    ],
    "expectedFrequencies": [
        16.666666666666668,
        8.333333333333334,
        8.333333333333334,
        16.666666666666668
    ],
    "differential": [
        0.8066666666666672,
        16.33333333333333,
        0.05333333333333323,
        4.506666666666668
    ],
    "X02": 21.7,
    "Xv2": 7.81
}`)