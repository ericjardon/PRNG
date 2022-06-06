import { RandomGeneratorFuncNew, RandomGeneratorResults } from "../../types";

interface LinearCongruentialParams{
    a: number, // multiplicador
    c: number, // increment
    m: number, // module
}

const randomLinearCongruential : RandomGeneratorFuncNew = (seed: number, params: LinearCongruentialParams, n: number) => {
    let seeds: number[] = [] 
    let output: number[] = [] 
    let results: number[] = [] 
    let setR = new Set<number>()
    for(let i=0; i < n; i++){
        let x = (((params.a * seed) + params.c) % params.m)
        let Ri = x/params.m
        if(setR.has(Ri)){
            console.log("Repeated Ri:", Ri)
            break;
        }else{
            setR.add(Ri)
            seeds.push(seed);
            output.push(x);
            results.push(Ri)
        }
        seed = x
    }

    const table: RandomGeneratorResults = {
        results,
        seeds,
        output
    }

    console.log(
        JSON.stringify(table)
    );

    console.log("Seeds length", seeds.length);
    console.log("Output length", output.length);
    console.log("Ri length", results.length); 

    return table;
}

//console.log("LC", randomLinearCongruential(3, {a:5, c:7, m:8}, 18))


export default randomLinearCongruential