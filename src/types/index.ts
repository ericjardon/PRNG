
export interface CongruentialParams {
    a: number,
    m: number,
    c?: number,
}
export interface MixedCongruentialParams {
    a: number,
    m: number,
    c: number,
}

export interface CombinedCongruentialParams {
    a: number[],
    m: number[],
    xi: number[],
}

export interface ValidatorResult {
    result: boolean,
    table: ChiSquaredTable | KolSmiTable | null,
}

export interface GoodnessTestParams {
    sample: number[],
    alpha: number,
}

export type Params = CongruentialParams | CombinedCongruentialParams;

export interface ParamsValidatorResponse {
    ok?: boolean,
    error?: string,
}

export type ParamsValidator = (params: any) => boolean;

export type RandomGeneratorFunc = (seed: number, params: any, n: number) => number[];

export type Handler = (event: React.ChangeEvent<any>) => void;

export interface ChiSquaredTable {
    classStart?: number[],
    classEnd?: number[],
    classLength?: number[],
    observedFrequencies?: number[],
    expectedFrequencies?: number[], // N/k multiplicado por longitud de la clase
    differential?: number[],  // 1/E * (O-E)^2, la sumatoria da Xo^2
    X02?: number,
    Xv2?: number,
    k?: number,
    N?:number,
}

export interface KolSmiTable {
    Fx?: number[], // i/N for uniform, F(x) in general
    Ri?: number[], // Ri for uniform, S(x) in general
    Dplus?: number[],  // i/N - Ri, or S(x)-F(x)
    Dminus?: number[], // Ri - (i-1)/N, or F(x)-S(x)
    DplusMax?: number,
    DminusMax?:number,
    Dsample?: number, // empirical
    Dalpha?: number,  // true
    N?:number,
}