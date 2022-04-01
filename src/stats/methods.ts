import randomDummy from "./dummy"
// import all the methods to be used.
import randomMidSquares from './midSquares'
import randomLinearCongruential from './linearCongruential'
import randomMixedCongruential from "./mixedContruential"

const randomNotImplemented = (params:any) => {
    // midSquares and all others should be imported from their respective module.
    return 0
} 

type RandomGeneratorFunc = (seed:number, params: any) => number;

export const METHODS : Record<string,RandomGeneratorFunc> = {
    'dummy': randomDummy,
    'midSquares': randomMidSquares,
    'MC': randomLinearCongruential,
    'MCM': randomMixedCongruential,
}
// will be called in front as: METHODS[name](params)