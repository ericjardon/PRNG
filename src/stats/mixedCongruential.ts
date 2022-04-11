interface MixedCongruentialParams{
    a: number, // multiplicador
    c: number, // increment
    m: number, // module
}

const randomMixedCongruential = (seed: number, params: MixedCongruentialParams) => {
    // recibir n ciclos y regresar un arreglo con los n resultados de Ri Basarse en dummy.
    // if (params.m == 1) {
    //     return {Ri:-2};
    // }   
    if(GCD(params.c, params.m) === 1 && (params.m % 2 === 0) && ((params.a-1) % 2 === 0) &&  (params.m % 4 === 0) && ((params.a-1) % 4 === 0)){
        let x = (((params.a * seed) + params.c) % params.m)
        return {X: x, Ri: (x/params.m)}
    }
    return {Ri: -1}
}

const GCD = (a: number,b: number): any => {
    if(!b){
        return a
    }
    return GCD(b, a % b)
}


//console.log("MC ", randomMixedCongruential(0.375, {a: 5, c: 7, m: 8}))

export default randomMixedCongruential