
import { METHOD_PARAMS_VALIDATORS, METHODS } from './stats/methods'
import { ParamsValidator, ParamsValidatorResponse } from './types';
import { RNG } from './RNGs';

export const paramsToIntegers = (params: any): any => {
    const result: any = {}
    for (const key in params) {
        result[key] = Number.parseInt(params[key]);   // for all of our methods we use only integer parameters
        if (Number.isNaN(result[key])) {
            console.error("Incorrect parameter:", key, params[key]);
            return null;
        }
    }
    return result;
}

export const validateNumeric = (val: string): boolean => !Number.isNaN(Number.parseFloat(val.trim()));

export const completeParams = (paramsObj: any, method: string): boolean => {
    console.log("params", paramsObj);
    const result = METHOD_PARAMS_VALIDATORS[method](paramsObj)
    if (result) console.log("Params complete")
    else console.log("Params incomplete!", paramsObj);
    return result;
}

export const safeInteger = (integer: number): boolean => {
    if (integer < 0 || integer + 1 >= Number.MAX_SAFE_INTEGER) {
        return false;
    }
    return true;
}


export const TEST_SAMPLE = [
    22.9,
    23.2,
    24.3,
    24.8,
    25.5,
    25.7,
    25.8,
    26,
    26.2,
    26.2,
    26.2,
    27,
    27.8,
    27.9,
    27.9,
    28,
    28.1,
    28.1,
    28.4,
    28.4,
    28.5,
    28.6,
    28.7,
    28.9,
    29,
    29.3,
    29.4,
    29.6,
    29.6,
    29.6,
    29.7,
    30.1,
    30.1,
    30.9,
    30.9,
    31.5,
    31.9,
    32,
    32.1,
    32.1,
    32.4,
    32.4,
    33,
    33,
    33.3,
    33.5,
    33.6,
    34.6,
    35.2,
    37.8
]

export const TEST_SAMPLE_2 = [0.023, 0.186, 0.225, 0.234, 0.294, 0.333, 0.334, 0.406, 0.511, 0.517, 0.538, 0.685, 0.761, 0.774, 0.836, 0.968, 1.064, 1.064, 1.267, 1.401, 1.458, 1.507, 1.514, 1.624, 1.702, 1.725, 1.849, 2.23, 2.325, 2.33, 2.343, 2.563, 2.634, 2.782, 2.92, 2.921, 3.214, 3.246, 3.323, 3.334, 3.491, 3.81, 4.025, 4.49, 4.778, 5.088, 5.587, 6.426, 7.514, 8.223]