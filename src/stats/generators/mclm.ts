import { RandomGeneratorFunc } from "../../types";

interface MCLMParams {
    a: number[],
    m:number[],
    xi: number[],
}

const computeMaxPeriod = (m:number[]) => {
    let p = 1;
    let k = m.length
    m.forEach( (mi) => {
        p *= (mi - 1);
    })

    return p / Math.pow(2, k-1);
}


const randomMCLM : RandomGeneratorFunc = (seed:number, params: MCLMParams, n: number) : number[] => {
    console.log("mclm params")
    console.dir(params);
    
    let {a,m, xi } = params;
    let max_period = computeMaxPeriod(m); 
    let iterations = Math.min(n, max_period);
    console.log("Max period:", max_period);
    console.log("Run for", iterations, 'iterations');

    let result : number[] = [];
    let generators = Array(iterations).fill(Array(a.length).fill(0));
    let temseed, r : number;
    function get_gm(a_single: number, m_single: number, xi_single: number) {
        return (a_single*xi_single) % m_single;
    }
    
    for(let j = 0; j < a.length; j++ ){
        for(let i = 0; i<iterations; i++){
            xi[j] = get_gm(a[j], m[j], xi[j])
            generators[i][j] = temseed
        }
    }

    for(let i = 0; i< iterations; i++){
        r = 0
        for(let j = 0; j < a.length ; j++ ){
            r +=   ((-1)** i ) * generators[i][j]
        }
        result.push(r)
    }
    console.log(result)
    return  result ;

}


export default randomMCLM;