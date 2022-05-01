import { QueueingFunc, QueueingTable } from "../../types";

interface MMsParams{
    tasaLlegadas: number,
    tasaServicios: number,
    servidores: number
}

const MMs : QueueingFunc = (params: MMsParams) => {
    let results: QueueingTable = {}
    results.lambda = params.tasaLlegadas
    results.nu = params.tasaServicios
    results.s = params.servidores
    results.p = results.lambda / (results.s * results.nu)
    results.po = getPo(results)
    results.Lq = getLq(results)
    results.L = results.Lq + (results.lambda/results.nu)
    results.Wq = results.Lq / results.lambda
    results.W = results.Wq + (1/results.nu)
    return results
}

function Factorial(num: number): any {
    if (num < 0) 
          return -1;
    else if (num == 0) 
        return 1;
    else {
        return (num * Factorial(num - 1));
    }
}

function getPo(params: any): number{
    let getSum = 0
    for(let i=0; i<params.s; i++){
        getSum += Math.pow((params.lambda/params.nu), i) / Factorial(i)
    }
    let Po = 1/(getSum + (Math.pow((params.lambda/params.nu),params.s)/Factorial(params.s)) * (1/(1-(params.lambda/(params.s*params.nu)))))
    return Po
}

function getLq(params:any): number{
    let Lq = (params.po * Math.pow((params.lambda/params.nu), params.s) * params.p) / (Factorial(params.s) * Math.pow((1 - params.p), 2))
    return Lq
}



export default MMs;