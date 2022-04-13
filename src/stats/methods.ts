import { bulkRandomDummy} from "./dummy"
import randomMidSquares from './midSquares'
import testChiSquared from "./chiSquared"
import randomLinearCongruential from "./linearCongruential";
import randomLinearMCLM from "./mclm";
import { Params, ParamsValidator, RandomGeneratorFunc } from '../types';
import {
    midSquaresParamValidation,
    linearCongurentialParamValidation,
    mixedCongurentialParamValidation,
    combinedCongruentialParamValidation,
    multiplicativeParamValidation,
} from './paramValidation';
import { RNG } from "../RNGs";

export const METHODS : Record<string, RandomGeneratorFunc> = {
    [RNG.MathRandom]: bulkRandomDummy,
    // RNG.MidSquares: randomMidSquares,
    [RNG.LinearCongruential]: randomLinearCongruential, 
    // RNG.MixedCongruential: randomMixedCongruential,
    [RNG.MultiplicativeCongruential]: randomLinearMCLM,  // TODO: Generador Multiplicativo
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



