
import { METHOD_PARAMS_VALIDATORS, METHODS } from './stats/methods'
import { ParamsValidator, ParamsValidatorResponse } from './types';
import {RNG} from './RNGs';

export const paramsToIntegers = (params:any):any => {
	const result : any = {}
	for (const key in params){
		result[key] = Number.parseInt(params[key]);   // for all of our methods we use only integer parameters
        if (Number.isNaN(result[key])){
            console.error("Incorrect parameter:", key, params[key]);
            return null;
        }
	}
	return result;
}

export const validateNumeric = (val: string) : boolean => !Number.isNaN(Number.parseFloat(val.trim()));

export const completeParams = (paramsObj:any, method:string) : boolean => {
    console.log("params", paramsObj);
    const result = METHOD_PARAMS_VALIDATORS[method](paramsObj)
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