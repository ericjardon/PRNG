import {GoodnessTestParams, KolSmiTable, ValidatorResult} from '../../types'
import {kolSmiValues} from '../../criticalValues'

const testKolSmi = (params: GoodnessTestParams) : ValidatorResult => {
    const {sample, alpha} = params;

    sample.sort()
    let d : number[]= []
    let d_plus: number[]= []
    let d_minus: number[]= []
    let Fx : number[] = [] // i/N values

    let plus, minus, i_n : number;
    let d_alpha = -1  // what we compare against

    for(let i = 0 ; i < sample.length; i ++){
        // this is i / N, but since we are starting at 0, we need to ad 1 
        i_n = (i+1) / sample.length

        //push to array value of (i/n) - Ri and Ri - ((i-1)/N) that are the columns D+ and D- to get the maximum of both columns
        plus = Math.abs(i_n - sample[i])
        minus = Math.abs(sample[i] - ((i) / sample.length)) 
        // d.push(plus)
        // d.push(minus)
        Fx.push(i_n);
        d_plus.push(plus);
        d_minus.push(minus);
    }

    const max_d_plus = Math.max(...d_plus);
    const max_d_minus = Math.max(...d_minus);
    const max_d = Math.max(max_d_plus, max_d_minus);

    if (sample.length > 50) {
        switch (alpha) {
          case 0.2:
            d_alpha = 1.07 / Math.sqrt(sample.length);
            break;
          case 0.1:
            d_alpha =1.22 / Math.sqrt(sample.length);
            break;
          case 0.05:
            d_alpha =1.36 / Math.sqrt(sample.length);
            break;
          case 0.02:
            d_alpha =1.52 / Math.sqrt(sample.length);
            break;
          case 0.01:
            d_alpha =1.63 / Math.sqrt(sample.length);
            break;
          case 0.005:
            d_alpha =1.73 / Math.sqrt(sample.length);
            break;
          case 0.002:
            d_alpha =1.85 / Math.sqrt(sample.length);
            break;
          case 0.001:
            d_alpha =1.95 / Math.sqrt(sample.length);
            break;
        }
    }else{
        d_alpha = kolSmiValues[alpha][sample.length-1]
    }

    console.log("Maximum D", max_d);
    console.log("Test D:", d_alpha);

    const table : KolSmiTable = {
      Fx: Fx, 
      Ri: sample,
      Dplus: d_plus,
      Dminus: d_minus,
      DplusMax: max_d_plus,
      DminusMax: max_d_minus,
      Dsample: max_d,
      Dalpha: d_alpha
    }

    table.N = sample.length;
    console.dir(table);
    
    return {result: max_d < d_alpha, table: table}
}


//console.log(testKolSmi( {sample: [0.05,0.14,0.44,0.81,0.93], alpha: 0.05}))

export default testKolSmi