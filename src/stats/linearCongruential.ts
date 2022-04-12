interface LinearCongruentialParams{
    iterations: number // iterations
    a: number, // multiplicador
    c: number, // increment
    m: number, // module
}


const randomLinearCongruential = (seed: number, params: LinearCongruentialParams) => {
    let results: number[] = [] 
    let setR = new Set<number>()
    for(let i=0; i <= params.iterations; i++){
        console.log("MC params", params);
        console.log("Seed", seed);
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
    }
    return results
    // recibir n ciclos y regresar un arreglo con los n resultados de Ri Basarse en dummy.
}

console.log("LC", randomLinearCongruential(3, {iterations: 18, a:5, c:7, m:8}))


// export default randomLinearCongruential