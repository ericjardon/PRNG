import { RandomGeneratorFunc } from "../../types";

interface MidSquaresParams {
    iterations: number
}

const randomMidSquares : RandomGeneratorFunc = (seed: number, params: MidSquaresParams, n:number) => {
    let results: number[] = []
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
                console.log("repeated val", val);
                return results
            }
            values.add(val);
            results.push(val);
            seed = x2;
    }

    return  results
}

// console.log("MS ",randomMidSquares(123, {}, 5));
export default randomMidSquares