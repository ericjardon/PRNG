interface MixedCongruentialParams{
    a: number, // multiplicador
    c: number, // increment
    m: number, // module
}

const randomMixedCongruential = (seed: number, params: MixedCongruentialParams) => {
	console.log("seed", seed);
	console.log("params", params);
    if(GCD(params.c, params.m) === 1 && (params.m % 2 === 0) && ((params.a-1) % 2 === 0) &&  (params.m % 4 === 0) && ((params.a-1) % 4 === 0)){
        return ((((params.a * seed) + params.c) % params.m)/params.m)
    }
    return -1
}

const GCD = (a: number,b: number): any => {
    if(!b){
        return a
    }
    return GCD(b, a % b)
}


console.log("MC ", randomMixedCongruential(0.375, {a: 5, c: 7, m: 8}))

export default randomMixedCongruential