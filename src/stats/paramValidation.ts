import {ParamsValidator, Params, CongruentialParams } from '../types'
import { MAX_COMBINED_GENERATORS } from '../constants'
import {GCD} from '../utils'

export const HullDobell = (params: CongruentialParams): any => {

    if(GCD(params.c, params.m) === 1 && (params.m % 2 === 0) && ((params.a-1) % 2 === 0) &&  (params.m % 4 === 0) && ((params.a-1) % 4 === 0)){
        return true
    }else{
        return false
    }
}

export const midSquaresParamValidation = (params:Params) : boolean => {
    // uses no Params
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
        let s = `s${i}`;

        if (!(
            params[s] &&
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