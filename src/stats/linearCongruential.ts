interface LinearCongruentialParams{
    iterations: number // iterations
    a: number, // multiplicador
    c: number, // increment
    m: number, // module
}

const randomLinearCongruential = (seed: number, params: LinearCongruentialParams) => {
    console.log("MC params", params);
    console.log("Seed", seed);
    let x = (((params.a * seed) + params.c) % params.m)
    return {X: x, Ri:(x/params.m)}
    // recibir n ciclos y regresar un arreglo con los n resultados de Ri Basarse en dummy.
}

console.log("LC", randomLinearCongruential(3, {iterations: 2, a:5, c:7, m:8}))


export default randomLinearCongruential