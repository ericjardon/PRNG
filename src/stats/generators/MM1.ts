import { QueueingFunc,QueueingTable } from "../../types";

// lambda = tasaLlegadas
// nu = tasaServicios
interface MM1Params {
    tasaLlegadas: number,
    tasaServicios: number
}

const MM1 : QueueingFunc = (params: MM1Params) => {
    let results: QueueingTable = {}
    results.lambda = params.tasaLlegadas
    results.nu = params.tasaServicios
    results.p = params.tasaLlegadas / params.tasaServicios 
    results.po = 1 - results.p
    results.Lq = Math.pow(params.tasaLlegadas,2) / (params.tasaServicios * (params.tasaServicios - params.tasaLlegadas))
    results.L = params.tasaLlegadas / (params.tasaServicios - params.tasaLlegadas)
    results.Wq = results.Lq / params.tasaLlegadas
    results.W = results.L / params.tasaLlegadas
    return results   
}



export default MM1;
