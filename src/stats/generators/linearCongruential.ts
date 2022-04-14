import { RandomGeneratorFunc } from "../../types";

interface LinearCongruentialParams{
    a: number, // multiplicador
    c: number, // increment
    m: number, // module
}

const randomLinearCongruential : RandomGeneratorFunc = (seed: number, params: LinearCongruentialParams, n: number) => {
    let results: number[] = [] 
    let setR = new Set<number>()
    for(let i=0; i < n; i++){
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
}

//console.log("LC", randomLinearCongruential(3, {a:5, c:7, m:8}, 18))


export default randomLinearCongruential