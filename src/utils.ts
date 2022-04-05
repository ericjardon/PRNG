
import { METHOD_PARAMS_VALIDATORS } from './stats/methods'
import { ParamsValidator, ParamsValidatorResponse } from './types';

export const toNumbers = (params:any):any => {
	const result : any = {}
	for (const key in params){
		result[key] = Number.parseFloat(params[key]);
        if (Number.isNaN(result[key])){
            console.log("incorrect parameter", key, params[key]);
            return null;
        }
	}
	return result;
}

export const validateNumeric = (val: string) : boolean => !Number.isNaN(Number.parseFloat(val.trim()));

export const completeParams = (paramsObj:any, method:string) : boolean => {
    const validator : ParamsValidator = METHOD_PARAMS_VALIDATORS[method];
    const result = validator(paramsObj)
    if (result) console.log("Params complete")
    else console.log("Params incomplete!", paramsObj);
    return result;
}

export const safeInteger = (integer:number) : boolean => {
    if (integer < 0 || integer+1 >= Number.MAX_SAFE_INTEGER) {
        return false;
    } 
    return true;
}
