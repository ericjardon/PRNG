import { RandomGeneratorFunc } from "../../types";

interface GMParams {
    a: number,
    m: number,
}

const randomGM : RandomGeneratorFunc = (seed:number, params: GMParams, n: number) => {
    const {a, m} = params
    let iterations = n;
    let xi;
    let ri;
    let values = new Set<number>();
    let results : number[] = [];

    for(let i = 0; i<iterations; i++){
        xi = ((a*seed) % m)
        ri = xi/m;

        if(values.has(ri)){
            console.log("Repeated ri", ri);
            return results;
        }
        
        values.add(ri);
        results.push(ri);

        seed = xi;
    }
    return results
}



export default randomGM;