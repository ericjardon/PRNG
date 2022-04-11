import { resourceLimits } from "worker_threads";

interface GMParams {
    a: number,
    m: number,
    iterations: number
}


const randomGM = (seed:number, params: GMParams) => {
    const {a, m} = params;
    let xi;
    let result = new Map<number, number>();
    if(m < seed){
        return {Ri: 99}
    }
    for(let i = 0; i<params.iterations; i++){
        xi = (a*seed) % m
        if(!result.has(xi)){
            seed = xi/m;
            result.set(xi, seed);
        }
        seed = result.get(xi) as number;
        if(result.size  === m ){
            break
        }
    }
    return {Ri: seed};

}



export default randomGM;