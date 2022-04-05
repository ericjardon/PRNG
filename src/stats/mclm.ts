interface MCLMParams {
    k: number,
    a1 : number,
    m1 : number,
    a2 : number,
    m2 : number
}


const randomMCLM = (seed:number, params: MCLMParams) => {
    const {k,a1,m1,a2,m2} = params;

    return {X: 1, Ri: 1};
}


export default randomMCLM;