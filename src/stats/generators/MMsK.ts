import { QueueingFunc,QueueingTable } from "../../types";

interface MMsKParams {
    tasaLlegadas: number,
    tasaServicios: number,
    servidores: number, 
    maxClientes: number
}

const MMsK : QueueingFunc = (params: MMsKParams) => {
    let results: QueueingTable = {}
    results.lambda = params.tasaLlegadas
    results.nu = params.tasaServicios
    results.k = params.maxClientes
    results.s = params.servidores
    results.po = getPo(results)
    results.Pk = ( (Math.pow((results.lambda/results.nu),results.k)) / (Factorial(results.s) * Math.pow((results.s), (results.k-results.s))) ) * results.po
    results.ro = results.lambda/(results.s * results.nu)
    results.Lq = getLq(results)
    results.lambdaE = results.lambda * (1 - results.Pk)
    results.Wq = results.Lq / results.lambdaE
    results.W = results.Wq + (1/results.nu)
    results.L = results.lambdaE * results.W
    results.tasaUtil = 1 - results.po
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

function getPo(params: any){
    let firstSum = 0
    let secondSum = 0

    for(let i = 0; i<=params.s; i++){
        firstSum += (Math.pow((params.lambda/params.nu), i)/(Factorial(i))) 
    }
    for(let i = (params.s + 1); i<=params.k; i++){
        secondSum += Math.pow((params.lambda/(params.s * params.nu)),(i-params.s))
    }
    secondSum = secondSum * ((Math.pow((params.lambda/params.nu), params.s))/(Factorial(params.s)))
    return  (1/(firstSum + secondSum))
}


function getLq(params:any){
    let firstPart = 0
    let secondPart = 0

    firstPart = (((params.po*Math.pow((params.lambda/params.nu), params.s)*params.ro)) / (Factorial(params.s) * Math.pow((1-params.ro), 2)))
    secondPart = (1 - Math.pow((2/3),2) - (2* Math.pow((2/3),2)) * (1-(2/3)))

    return firstPart * secondPart
}

export default MMsK;