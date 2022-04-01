
interface DummyParams {
    alpha: number,
    beta: number,
    chi: number,
    someParam:number,
}


const randomDummy = (seed:number, params: DummyParams) => {
    console.log("Called random dummy");
    const {alpha, beta, chi, someParam} = params;
    console.log("Seed", seed);
    return {Ri: Math.random()};
}

export default randomDummy;