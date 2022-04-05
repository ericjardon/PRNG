interface LinearCongruentialParams{
    a: number, // multiplicador
    c: number, // increment
    m: number, // module
}

const randomLinearCongruential = (seed: number, params: LinearCongruentialParams) => {
    // RETURN THE RANDOM NUMBER AND THE Ri
    // if (params.m == 1) {
    //     return {Ri:-2};
    // }
    console.log("MC params", params);
    console.log("Seed", seed);
    let x = (((params.a * seed) + params.c) % params.m)
    return {X: x, Ri:(x/params.m)}
}

console.log("LC", randomLinearCongruential(3, {a:5, c:7, m:8}))


export default randomLinearCongruential