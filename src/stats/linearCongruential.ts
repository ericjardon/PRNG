interface LinearCongruentialParams{
    a: number, // multiplicador
    c: number, // increment
    m: number, // module
}

const randomLinearCongruential = (seed: number, params: LinearCongruentialParams) => {
    return ((((params.a * seed) + params.c) % params.m)/params.m)
}

console.log(randomLinearCongruential(6, {a:5, c:7, m:8}))


export default randomLinearCongruential