import {ParamsValidator, Params, CongruentialParams} from '../types'

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
    // TODO
    const {n} = params; // number of generators
    if (!n || n>15) return false;

    // receive params for N generators. For every key i+1, check that a and m exist.
    for(let i=0; i<n; i++) {
        let a = `a${i+1}`;
        let m = `m${i+1}`;

        if (!(
            params[a] && params[a] > 0 &&
            params[m] && params[m] > 0
            )) {
                return false;
            }
    }

    return true;
}

export const multiplicativeParamValidation = (params:CongruentialParams) : boolean => {
    return Boolean(
        params.a && params.a > 0 &&
        params.m && params.m > 0 &&
        !params.c
    )
}