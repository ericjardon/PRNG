interface MCLMParams {
    a:number,
    c:number,
    m:number,
    a2:number,
    c2:number,
    m2:number
    iterations: number
}


const randomMCLM = (seed:number, params: MCLMParams) => {
    let {a,c,m,a2,c2,m2} = params;
    let result = new Set<number>();
    
    for(let i = 0; i<params.iterations; i++){
        c = (a*c) % m;
        c2 = (a2*c2) % m2;
        seed = Math.abs((c - c2) % (m-1));
        result.add(seed);
    }
    console.log(result)
    return {Ri: seed};
    



}


export default randomMCLM;