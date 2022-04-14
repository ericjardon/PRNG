import { RandomGeneratorFunc } from "../../types";

interface DummyParams {
    alpha?: number,
    beta?: number,
    chi?: number,
    someParam?:number,
}

/* Uses Math Random */

export const bulkRandomDummy : RandomGeneratorFunc = (seed:number, params:DummyParams, n:number) : number[]=> {
    // Calcular el periodo o mantener registro de valores generados.
    // Nos detenemos cuando valores se repiten o cuando se acaba el periodo.

    let results: number[] = [];
    for (let i=0; i<n; i++) {
        results.push(Math.random());
    }
    return results;
}

