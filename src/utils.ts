
import { Data } from 'react-csv/components/CommonPropTypes';
import { METHOD_PARAMS_VALIDATORS } from './stats/methods'
import { ChiSquaredTable, KolSmiTable } from './types';

export const isInteger = (x: any) => Number.isInteger(Number(x));

export const paramsToIntegers = (params: any): any => {
    const result: any = {}
    for (const key in params) {
        result[key] = Number.parseInt(params[key]);   // for all of our methods we use only integer parameters
        if (Number.isNaN(result[key])) {
            console.error("Incorrect parameter:", key, params[key]);
            return null;
        }
    }
    return result;
}

export const validateNumeric = (val: string): boolean => !Number.isNaN(Number(val.trim()));

export const completeParams = (paramsObj: any, method: string): boolean => {
    const result = METHOD_PARAMS_VALIDATORS[method](paramsObj)
    console.log("Complete form?", result);
    return result;
}

export const safeInteger = (integer: number): boolean => {
    if (integer < 0 || integer + 1 >= Number.MAX_SAFE_INTEGER) {
        return false;
    }
    return true;
}

export const GCD = (a: number,b: number): any => {
    if(!b){
        return a
    }
    return GCD(b, a % b)
}

export const areRelativePrimes = (m: number, c: number) => GCD(m, c) === 1;

const getPrimesOf = (x: number): number[] => {
    let sieve = [];
    let i;
    let j;
    let primes = [];

    for (i = 2; i <= x; ++i) {
        if (!sieve[i]) {

            if (x % i === 0) {
                primes.push(i);
            }

            for (j = i << 1; j <= x; j += i) {
                sieve[j] = true;
            }
        }
    }
    return primes;
}

export const divisibleByPrimes = (a_1:number, m:number) : boolean => {
    // a-1 is divisible by all prime factors of m
    const primes = getPrimesOf(m);
    for (let p of primes) {
        if (a_1 % p !==0 ) return false;
    }
    return true;
}

export const divisibleByFourCheck = (a_1:number, m:number) : boolean => {
    // if m is divisible by four, then a-1 is divisible by 4
    if (m%4 !== 0) return true;  // not divisble by four so no problem
    return a_1%4 === 0;
}

// console.log(getPrimesOf(166));

export const formatNum = (x:number, d:number): number => {
    let factor = 10 ** d;
    return Math.floor(x * factor) / factor
}

const csvHeaders: Record<string, Record<string,string>> = {
    chi: {
        'classStart': 'Inicio',
        'classEnd':'Fin',
        'classLength':'Longitud',
        'observedFrequencies':'FOᵢ',
        'expectedFrequencies':'FEᵢ',
        'differential':'Desvío'
    },
    kol: {
        'Fx':'F(x) = i/N',
        'Ri':'S(x) = Ri',
        'Dplus':'D+',
        'Dminus':'D-'
    }
}


export const tableToCSVData = (table: ChiSquaredTable | KolSmiTable) : Data => {
    let data : Data = []
    let test = 'Ri' in table ? 'kol' : 'chi';
    let N = test==='kol' ? table.N! : (table as ChiSquaredTable).k!;

    let columns : string[] = Object.keys(table).filter(key => Array.isArray((table as any)[key]))
    console.log("Columns:", columns);

    for (let i=0; i<N; i++) {
        let row : Record<string, number> = {}

        columns.forEach(key => {
            row[csvHeaders[test][key]] = (table as any)[key][i];
        })
        
        data.push(row);
    }

    return data;
}


export const TEST_SAMPLE = [
    22.9,
    23.2,
    24.3,
    24.8,
    25.5,
    25.7,
    25.8,
    26,
    26.2,
    26.2,
    26.2,
    27,
    27.8,
    27.9,
    27.9,
    28,
    28.1,
    28.1,
    28.4,
    28.4,
    28.5,
    28.6,
    28.7,
    28.9,
    29,
    29.3,
    29.4,
    29.6,
    29.6,
    29.6,
    29.7,
    30.1,
    30.1,
    30.9,
    30.9,
    31.5,
    31.9,
    32,
    32.1,
    32.1,
    32.4,
    32.4,
    33,
    33,
    33.3,
    33.5,
    33.6,
    34.6,
    35.2,
    37.8
]

export const TEST_SAMPLE_2 = [0.023, 0.186, 0.225, 0.234, 0.294, 0.333, 0.334, 0.406, 0.511, 0.517, 0.538, 0.685, 0.761, 0.774, 0.836, 0.968, 1.064, 1.064, 1.267, 1.401, 1.458, 1.507, 1.514, 1.624, 1.702, 1.725, 1.849, 2.23, 2.325, 2.33, 2.343, 2.563, 2.634, 2.782, 2.92, 2.921, 3.214, 3.246, 3.323, 3.334, 3.491, 3.81, 4.025, 4.49, 4.778, 5.088, 5.587, 6.426, 7.514, 8.223]

// N=50
export const SAMPLE_RANDOMS = [
    0,
    0.020134228,
    0.093959732,
    0.127516779,
    0.174496644,
    0.187919463,
    0.194630872,
    0.208053691,
    0.22147651,
    0.22147651,
    0.22147651,
    0.275167785,
    0.32885906,
    0.33557047,
    0.33557047,
    0.342281879,
    0.348993289,
    0.348993289,
    0.369127517,
    0.369127517,
    0.375838926,
    0.382550336,
    0.389261745,
    0.402684564,
    0.409395973,
    0.429530201,
    0.436241611,
    0.44966443,
    0.44966443,
    0.44966443,
    0.456375839,
    0.483221477,
    0.483221477,
    0.536912752,
    0.536912752,
    0.577181208,
    0.604026846,
    0.610738255,
    0.617449664,
    0.617449664,
    0.637583893,
    0.637583893,
    0.677852349,
    0.677852349,
    0.697986577,
    0.711409396,
    0.718120805,
    0.785234899,
    0.825503356,
    1,
]

// N=48
export const SAMPLE_RANDOMS_2 = [
0.019878049,
0.024634146,
0.025731707,
0.03304878,
0.037804878,
0.037926829,
0.046707317,
0.059512195,
0.060243902,
0.062804878,
0.080731707,
0.09,
0.091585366,
0.099146341,
0.115243902,
0.12695122,
0.12695122,
0.151707317,
0.16804878,
0.175,
0.18097561,
0.181829268,
0.195243902,
0.204756098,
0.207560976,
0.222682927,
0.269146341,
0.280731707,
0.281341463,
0.282926829,
0.309756098,
0.318414634,
0.336463415,
0.353292683,
0.353414634,
0.389146341,
0.39304878,
0.402439024,
0.403780488,
0.422926829,
0.461829268,
0.48804878,
0.544756098,
0.579878049,
0.617682927,
0.678536585,
0.780853659,
0.913536585,
]