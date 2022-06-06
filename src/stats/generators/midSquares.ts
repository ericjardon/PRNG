import { RandomGeneratorFuncNew, RandomGeneratorResults } from "../../types";

interface MidSquaresParams {
    iterations: number
}


const randomMidSquares : RandomGeneratorFuncNew = (seed: number, params: MidSquaresParams, n:number) => {
    let results: number[] = []
    let seeds: number[] = []
    let output: number[] = []
    let x2:number = 0 
    let val: number;
    let values = new Set<number>();
    let iterations = n;

    for(let i=0; i<iterations; i++){
            x2 = seed * seed
            x2 = Math.trunc(x2/100)
            x2 = x2%10000
            val = x2/10000
            if (values.has(val)) {
                console.log("repeated Ri", val);
                break;
            }
            values.add(val);
            results.push(val);
            seeds.push(seed);
            output.push(x2);
            seed = x2;
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

    return  table;
}

// console.log("MS ",randomMidSquares(123, {}, 5));
export default randomMidSquares