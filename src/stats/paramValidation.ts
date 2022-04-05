import {ParamsValidator, Params} from '../types'

export const midSquaresParamValidation = (params:Params) : boolean => {
    return (
        true
    )
}

export const linearCongurentialParamValidation = (params:Params) : boolean => {
    return Boolean(
        params.a && params.a > 0 &&
        params.c && params.c > 0 &&
        params.m && params.m > 0
    )
}
export const mixedCongurentialParamValidation = (params:Params) : boolean => {
    return Boolean(
        params.a && params.a > 0 &&
        params.c && params.c > 0 &&
        params.m && params.m > 0
    )
}

export const combinedCongurentialParamValidation = (params:Params) : boolean => {
    // TODO
    return Boolean(
        params.a && params.a > 0 &&
        params.c && params.c > 0 &&
        params.m && params.m > 0 &&
        params.a2 && params.a2 > 0 &&
        params.c2 && params.c2 > 0 &&
        params.m2 && params.m2 > 0 
    )
}

export const multiplicativeParamValidation = (params:Params) : boolean => {
    return Boolean(
        params.a && params.a > 0 &&
        params.m && params.m > 0 &&
        !params.c
    )
}