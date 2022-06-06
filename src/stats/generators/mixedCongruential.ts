import {HullDobell} from '../paramValidation'
import {MixedCongruentialParams, RandomGeneratorFuncNew, RandomGeneratorResults} from '../../types'


const randomMixedCongruential : RandomGeneratorFuncNew = (seed: number, params: MixedCongruentialParams, n:number) => {
    // recibir n ciclos y regresar un arreglo con los n resultados de Ri Basarse en dummy.
    console.log("Mixed Congruential N=", n);
    console.log(params);
    let seeds: number[] = [] 
    let output: number[] = []
    let results: number[] = []
    let setR = new Set<number>()
    let iterations = n;
    if(HullDobell(params)){
        for(let i=0; i<iterations; i++){
            let x = (((params.a * seed) + params.c) % params.m)
            let Ri = x/params.m
            if(setR.has(Ri)){
                console.log("Repeated Ri:", Ri)
                break;
            }else{
                setR.add(Ri)
                seeds.push(seed);
                output.push(x);
                results.push(Ri)
            }
            seed = x
            console.log("The seed", seed)
        }
    }else{
        console.log("Invalid hull dobell");
        return {
            results:[],
            seeds: [],
            output:[]
        }
    }
    const table: RandomGeneratorResults = {
        results,
        seeds,
        output
    }

    console.log(
        JSON.stringify(table)
    );

    console.log("Seeds length", seeds.length);
    console.log("Output length", output.length);
    console.log("Ri length", results.length); 

    return table;
}

// console.log("MC ", randomMixedCongruential(4, {a: 5, c: 7, m: 8}, 16))

export default randomMixedCongruential