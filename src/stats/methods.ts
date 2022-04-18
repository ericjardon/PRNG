import { bulkRandomDummy} from "./generators/dummy"
import randomMidSquares from './generators/midSquares'
import randomGM from './generators/gm'
import randomMixedCongruential from './generators/mixedCongruential'
import randomLinearCongruential from "./generators/linearCongruential";
import randomCombinedCongruential from "./generators/mclm";
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
    [RNG.MidSquares]: randomMidSquares,
    [RNG.LinearCongruential]: randomLinearCongruential, 
    [RNG.MixedCongruential]: randomMixedCongruential,
    [RNG.MultiplicativeCongruential]: randomGM,  
    [RNG.CombinedCongruential]: randomCombinedCongruential, 
}

export const METHOD_PARAMS_VALIDATORS : Record<string, ParamsValidator> = {
    [RNG.MathRandom]: (params:Params) => true,
    [RNG.MidSquares]: midSquaresParamValidation,
    [RNG.LinearCongruential]: linearCongurentialParamValidation,
    [RNG.MixedCongruential]: mixedCongurentialParamValidation,
    [RNG.MultiplicativeCongruential]: multiplicativeParamValidation,  
    [RNG.CombinedCongruential]: combinedCongruentialParamValidation, 
}



