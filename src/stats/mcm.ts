interface MCMParams {
    a: number,
    m: number
}


const randomMCM = (seed:number, params: MCMParams) => {
    const {a, m} = params;
    if(m > a && m > seed){
        return (a*seed) % m;
    }else{
        return 1;
    }
    return Math.random();
}

export default randomMCM;