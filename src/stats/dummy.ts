
interface DummyParams {
    alpha: number,
    beta: number,
    chi: number,
    someParam:number,
}


const randomDummy = (params: DummyParams) => {
    const {alpha, beta, chi, someParam} = params;

    return Math.random();
}

export default randomDummy;