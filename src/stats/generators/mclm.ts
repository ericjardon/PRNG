interface MCLMParams {
    a: number[],
    m:number[],
    xi: number[],
    iterations: number
}


const randomMCLM = (seed:number, params: MCLMParams) => {
    let {a,m, xi, iterations} = params;
    let result = new Array<number>();
    let generators = Array(iterations).fill(Array(a.length).fill(0));
    let temseed, r : number;
    function get_gm(a_single: number, m_single: number, xi_single: number) {
        return (a_single*xi_single) % m_single;
    }
    
    for(let j = 0; j < a.length ; j++ ){
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