
export type MethodResult = { X?: number, Ri: number };

export type CongruentialParams = {
    a?: number,
    m?: number,
    c?: number,
}

export type ValidatorResult = {
    result: boolean,
    table: ChiSquaredTable | any,
}

export interface ChiSquaredTable {
    classStart?: number[],
    classEnd?: number[],
    classLength?: number[],
    observedFrequencies?: number[],
    expectedFrequencies?: number[], // N/k multiplicado por longitud de la clase
    differential?: number[],  // 1/E * (O-E)^2, la sumatoria da Xo^2
    X02?: number,
    Xv2?: number,
}

export type GoodnessTestParams = {
    sample: number[],
    alpha: number,
}

export type Params = CongruentialParams | CongruentialParams[];

export type ParamsValidatorResponse = {
    ok?: boolean,
    error?: string,
}

export type ParamsValidator = (params: any) => boolean;

export type RandomGeneratorFunc = (seed: number, params: any, n: number) => number[];

export type Handler = (event: React.ChangeEvent<any>) => void;
