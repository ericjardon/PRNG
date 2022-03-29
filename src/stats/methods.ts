import randomDummy from "./dummy"



const randomNotImplemented = (params:any) => {
    // midSquares and all others should be imported from their respective module.
    return 0
} 

type RandomGeneratorFunc = (params: any) => number;

export const METHODS : Record<string,RandomGeneratorFunc> = {
    'dummy': randomDummy,
    'midSquares': randomNotImplemented,
    'MC': randomNotImplemented,
    'MCM': randomNotImplemented,
}
// will be called in front as: METHODS[name](params)