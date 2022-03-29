import randomDummy from "./dummy"
// import all the methods to be used.
import randomMidSquares from './midSquares'

const randomNotImplemented = (params:any) => {
    // midSquares and all others should be imported from their respective module.
    return 0
} 

type RandomGeneratorFunc = (seed:number, params: any) => number;

export const METHODS : Record<string,RandomGeneratorFunc> = {
    'dummy': randomDummy,
    'midSquares': randomMidSquares,
    'MC': randomNotImplemented,
    'MCM': randomNotImplemented,
}
// will be called in front as: METHODS[name](params)