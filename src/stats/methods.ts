import {randomDummy, bulkRandomDummy} from "./dummy"
import randomMidSquares from './midSquares'
import randomLinearCongruential from './linearCongruential'
import randomMixedCongruential from "./mixedCongruential"
import { Params, ParamsValidator, RandomGeneratorFunc } from '../types';
import {
    midSquaresParamValidation,
    linearCongurentialParamValidation,
    mixedCongurentialParamValidation,
    combinedCongurentialParamValidation,
    multiplicativeParamValidation,
} from './paramValidation';

const randomNotImplemented = (params:any) => {
    // midSquares and all others should be imported from their respective module.
    return {X:0, Ri:0}
} 


export const METHODS : Record<string,RandomGeneratorFunc> = {
    'dummy': randomDummy,
    'midSquares': randomMidSquares,
    'MC': randomLinearCongruential,
    'MCM': randomMixedCongruential,
    'GM': randomNotImplemented,  // TODO: Generador Multiplicativo
    'MCLM': randomNotImplemented, // TODO: Método Congruencial Lineal Combinado
}

export const METHOD_PARAMS_VALIDATORS : Record<string, ParamsValidator> = {
    'dummy': (params:Params) => true,
    'midSquares': midSquaresParamValidation,
    'MC': linearCongurentialParamValidation,
    'MCM': mixedCongurentialParamValidation,
    'GM': multiplicativeParamValidation,  // TODO: Generador Multiplicativo
    'MCLM': combinedCongurentialParamValidation, // TODO: Método Congruencial Lineal Combinado  
}

// will be called in front as: METHODS[name](params)