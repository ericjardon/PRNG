import {HullDobell} from '../paramValidation'
import {MixedCongruentialParams, RandomGeneratorFunc} from '../../types'

const randomMixedCongruential : RandomGeneratorFunc = (seed: number, params: MixedCongruentialParams, n:number) => {
    // recibir n ciclos y regresar un arreglo con los n resultados de Ri Basarse en dummy.
    console.log("Mixed Congruential N=", n);
    console.log(params);

    let results: number[] = []
    let setR = new Set<number>()
    let iterations = n;
    if(HullDobell(params)){
        for(let i=0; i<iterations; i++){
            let x = (((params.a * seed) + params.c) % params.m)
            let Ri = x/params.m
            if(setR.has(Ri)){
                console.log("Repeated Ri:", Ri)
                return results 
            }else{
                setR.add(Ri)
                results.push(Ri)
            }
            seed = x
            console.log("The seed", seed)
        }
    }else{
        console.log("Invalid hull dobell");
        return results
    }
    return results
}

// console.log("MC ", randomMixedCongruential(4, {a: 5, c: 7, m: 8}, 16))

export default randomMixedCongruential