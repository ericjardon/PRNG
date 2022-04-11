export type MethodResult = {X?:number, Ri: number};

export type Params = {
    a?:number,
    c?:number,
    m?:number,
    a2?:number,
    c2?:number,
    m2?:number,
}

export type ParamsValidatorResponse = {
    ok?: boolean,
    error?: string,
}

export type ParamsValidator = (params: any) => boolean;

export type RandomGeneratorFunc = (seed:number, params: any, n:number) => MethodResult | number[];

export type Handler = (event: React.ChangeEvent<any>) => void;
