import { PanoramaSharp } from "@mui/icons-material"

interface KolSmiParams{
    sample: number[], 
    alpha: number
}

const testKolSmi = (params: KolSmiParams) => {
    const {sample} = params;
    sample.sort()
    let d : number[]= []
    let i_n, max_d

    for(let i = 0 ; i < sample.length; i ++){
        // this is i / N, but since we are starting at 0, we need to ad 1 
        i_n = (i+1) /sample.length
        //push to array value of (i/n) - Ri and Ri - ((i-1)/N) that are the columns D+ and D- to get the maximum of both columns
        d.push(i_n - sample[i]) 
        d.push( sample[i] - ((i-1) / sample.length) )
    }
    max_d = Math.max(...d)
    if(max_d > 0.05){
        return true
    }
    console.log(d)
    return false
}


console.log(testKolSmi( {sample: [0.023,0.186,0.225,0.234,0.294,0.333,0.334,0.406,0.511,0.517,0.538,0.685,0.761,0.774,0.836,0.968,1.064,1.064,1.267,1.401,1.458,1.507,1.514,1.624,1.702,1.725,1.849,2.23,2.325,2.33,2.343,2.563,2.634,2.782,2.92,2.921,3.214,3.246,3.323,3.334,3.491,3.81,4.025,4.49,4.778,5.088,5.587,6.426,7.514,8.223], alpha: 0.05}))

export default testKolSmi