interface MCLMParams {
    a: number[],
    m:number[],
    iterations: number
}


const randomMCLM = (seed:number, params: MCLMParams) => {
    let {a,m,iterations} = params;
    let result = new Set<number>();
    let generators = Array(iterations).fill(Array(a.length).fill(0));
    let temseed, r : number | undefined;
    function get_gm(a_single: number, m_single: number, temseed: number) {
        return (a_single*temseed) % m_single;
    }
    
    for(let j = 0; j < a.length ; j++ ){
        temseed = seed
        for(let i = 0; i<iterations; i++){
            temseed = get_gm(a[j], m[j], temseed)
            generators[i][j] = temseed
        }
    }

    for(let j = 0; j < a.length ; j++ ){
        for(let i = 0; i< iterations; i++){
            r += generators[i][j]
            if(result.has(r as number)){
                break
            }
            result.add(r as number)
        }
    }
    console.log(result)
    return Array.from( result );
    



}


export default randomMCLM;