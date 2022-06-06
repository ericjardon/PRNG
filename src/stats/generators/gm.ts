import { RandomGeneratorFuncNew, RandomGeneratorResults } from "../../types";

interface GMParams {
    a: number,
    m: number,
}

const randomGM : RandomGeneratorFuncNew = (seed:number, params: GMParams, n: number) => {
    const {a, m} = params
    let iterations = n;
    let xi;
    let ri;
    let values = new Set<number>();
    let seeds: number[] = [] 
    let output: number[] = [] 
    let results : number[] = [];

    for(let i = 0; i<iterations; i++){
        xi = ((a*seed) % m)
        ri = xi/m;

        if(values.has(ri)){
            console.log("Repeated ri", ri);
            break;
        }
        
        values.add(ri);
        seeds.push(seed);
        output.push(xi);
        results.push(ri);

        seed = xi;
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
    return table
}



export default randomGM;