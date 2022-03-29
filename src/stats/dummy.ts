
interface DummyParams {
    alpha: number,
    beta: number,
    chi: number,
    someParam:number,
}


const randomDummy = (seed:number, params: DummyParams) => {
    const {alpha, beta, chi, someParam} = params;
    console.log("Seed", seed);
    return Math.random();
}

export default randomDummy;