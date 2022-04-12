import { resourceLimits } from "worker_threads";

interface GMParams {
    a: number,
    m: number,
    iterations: number
}


const randomGM = (seed:number, params: GMParams) => {
    const {a, m, iterations} = params;
    let xi;
    let result = new Set<number>();
    if(m < seed){
        return {Ri: 99}
    }
    for(let i = 0; i<iterations; i++){
        xi = ((a*seed) % m)/m
        //cambiar a cuando encuentras return 
        if(result.has(xi)){
            break
        }
        seed = xi/m;
        result.add(xi)
    }
    return Array.from( result );

}



export default randomGM;