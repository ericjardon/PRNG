interface MixedCongruentialParams{
    iterations: number // iterations of the method.
    a: number, // multiplicador
    c: number, // increment
    m: number, // module
}

const randomMixedCongruential = (seed: number, params: MixedCongruentialParams) => {
    // recibir n ciclos y regresar un arreglo con los n resultados de Ri Basarse en dummy.
    let results: number[] = []
    let setR = new Set<number>()
    if(HullDobell(params)){
        for(let i=0; i<=params.iterations; i++){
            let x = (((params.a * seed) + params.c) % params.m)
            let Ri = x/params.m
            if(setR.has(Ri)){
                console.log("Repeated Ri:", Ri)
                return results 
            }else{
                setR.add(Ri)
                results.push(Ri)
            }
            seed = x
            console.log("The seed", seed)
        }
    }else{
        return results
    }
    return results
}

const GCD = (a: number,b: number): any => {
    if(!b){
        return a
    }
    return GCD(b, a % b)
}

const HullDobell = (params: MixedCongruentialParams): any => {
    if(GCD(params.c, params.m) === 1 && (params.m % 2 === 0) && ((params.a-1) % 2 === 0) &&  (params.m % 4 === 0) && ((params.a-1) % 4 === 0)){
        return true
    }else{
        return false
    }
}

console.log("MC ", randomMixedCongruential(4, {iterations: 16, a: 5, c: 7, m: 8}))

export default randomMixedCongruential