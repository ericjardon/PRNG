import randomDummy from "./dummy"
// import all the methods to be used.
import randomMidSquares from './midSquares'
import randomLinearCongruential from './linearCongruential'
import randomMixedCongruential from "./mixedCongruential"
import testChiSquared from "./chiSquared"

const randomNotImplemented = (params:any) => {
    // midSquares and all others should be imported from their respective module.
    return {X:0, Ri:0}
} 

type MethodResult = {X?:number, Ri: number};

type RandomGeneratorFunc = (seed:number, params: any) => MethodResult;

export const METHODS : Record<string,RandomGeneratorFunc> = {
    'dummy': randomDummy,
    'midSquares': randomMidSquares,
    'MC': randomLinearCongruential,
    'MCM': randomMixedCongruential,
    'GM': randomNotImplemented,  // TODO: Generador Multiplicativo
    'MCLM': randomNotImplemented, // TODO: Método Congruencial Lineal Combinado
    'chiSquared': testChiSquared,
}
// will be called in front as: METHODS[name](params)