
interface DummyParams {
    alpha?: number,
    beta?: number,
    chi?: number,
    someParam?:number,
}

/* Uses Math Random */

export const randomDummy = (seed:number, params: DummyParams) => {
    console.log("Called random dummy");
    const {alpha, beta, chi, someParam} = params;
    console.log("Seed", seed);
    return {Ri: Math.random()};
}

export const bulkRandomDummy = (seed:number, params:DummyParams, n:number) : number[]=> {
    // Calcular el periodo o mantener registro de valores generados.
    // Nos detenemos cuando valores se repiten o cuando se acaba el periodo.
    let results: number[] = [];
    for (let i=0; i<n; i++) {
        results.push(Math.random());
    }

    return results;
}

