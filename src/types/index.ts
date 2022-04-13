export type MethodResult = { X?: number, Ri: number };

export type CongruentialParams = {
    a?: number,
    m?: number,
    c?: number,
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
