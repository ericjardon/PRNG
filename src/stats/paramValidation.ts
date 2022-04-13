import {ParamsValidator, Params, CongruentialParams} from '../types'
import { MAX_COMBINED_GENERATORS } from '../constants'

export const midSquaresParamValidation = (params:Params) : boolean => {
    return (
        true
    )
}

export const linearCongurentialParamValidation = (params:CongruentialParams) : boolean => {
    return Boolean(
        params.a && params.a > 0 &&
        params.c && params.c > 0 &&
        params.m && params.m > 0
    )
}
export const mixedCongurentialParamValidation = (params:CongruentialParams) : boolean => {
    return Boolean(
        params.a && params.a > 0 &&
        params.c && params.c > 0 &&
        params.m && params.m > 0
    )
}

export const combinedCongruentialParamValidation = (params:any) : boolean => {

    const {numGenerators} = params; // number of generators
    if (!numGenerators || numGenerators>MAX_COMBINED_GENERATORS){
        console.log("missing num generators: ", numGenerators);
        return false;
    } 

    // receive params for N generators. For every key i+1, check that a and m exist.
    for(let i=1; i<=numGenerators; i++) {
        let a = `a${i}`;
        let m = `m${i}`;

        if (!(
            params[a] && params[a] > 0 &&
            params[m] && params[m] > 0
            )) {
                console.log("incomplete combined params", i);
                return false;
            }
    }

    return true;
}

export const multiplicativeParamValidation = (params:CongruentialParams) : boolean => {
    return Boolean(
        params.a && params.a > 0 &&
        params.m && params.m > 0 &&
        params.m > params.a &&
        !params.c
    )
}