import {randomDummy, bulkRandomDummy} from "./dummy"
import randomMidSquares from './midSquares'
import randomLinearCongruential from './linearCongruential'
import randomMixedCongruential from "./mixedCongruential"
import { Params, ParamsValidator, RandomGeneratorFunc } from '../types';
import {
    midSquaresParamValidation,
    linearCongurentialParamValidation,
    mixedCongurentialParamValidation,
    combinedCongruentialParamValidation,
    multiplicativeParamValidation,
} from './paramValidation';
import { RNG } from "../RNGs";

const randomNotImplemented = (params:any) => {
    // midSquares and all others should be imported from their respective module.
    return {X:0, Ri:0}
} 


export const METHODS : Record<string, RandomGeneratorFunc> = {
    [RNG.MathRandom]: (bulkRandomDummy as RandomGeneratorFunc),
    // RNG.MidSquares: randomMidSquares,
    // RNG.LinearCongruential: randomLinearCongruential,
    // RNG.MixedCongruential: randomMixedCongruential,
    // RNG.MultiplicativeCongruential: randomNotImplemented,  // TODO: Generador Multiplicativo
    // 'MCLM': randomNotImplemented, // TODO: Método Congruencial Lineal Combinado
}

export const METHOD_PARAMS_VALIDATORS : Record<string, ParamsValidator> = {
    [RNG.MathRandom]: (params:Params) => true,
    [RNG.MidSquares]: midSquaresParamValidation,
    [RNG.LinearCongruential]: linearCongurentialParamValidation,
    [RNG.MixedCongruential]: mixedCongurentialParamValidation,
    [RNG.MultiplicativeCongruential]: multiplicativeParamValidation,  // TODO: Generador Multiplicativo
    [RNG.CombinedCongruential]: combinedCongruentialParamValidation, // TODO: Método Congruencial Lineal Combinado  
}