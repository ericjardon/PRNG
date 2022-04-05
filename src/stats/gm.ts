interface GMParams {
    a: number,
    m: number
}


const randomGM = (seed:number, params: GMParams) => {
    const {a, m} = params;
    if(m > a && m > seed){
        let result = (a*seed) % m;
        return {X: result, Ri: result};
    }
    return {X: 1, Ri: 1};
}


export default randomGM;