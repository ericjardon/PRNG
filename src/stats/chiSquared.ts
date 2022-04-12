import { PanoramaSharp } from "@mui/icons-material"

interface ChiSquareadParams{
    sample: number[],
    range: number,
    k: number,
    class: number,
    eX: number,
    classes: {[c: string]: number},
}

const testChiSquared = (seed:number,params: ChiSquareadParams) => {
    params.sample.sort()
    params.range = params.sample[params.sample.length-1] - params.sample[0]
    params.k = Math.floor(1 + Math.log2(params.sample.length)) 
    params.class = params.range / params.k

    // Increment the class until if it gets multiplied by 'k' it gives as result an interger number
    // while(parseFloat((params.class * params.k % 1).toFixed(2))){
    //     params.class = parseFloat((params.class + 0.01).toFixed(2))
    // }

    // Create the classes and store the total count of every class.
    let counter
    for(let i = params.class ; i <= params.class * params.k; i = i + params.class){
        counter = 0 
        // Count the number of elements per class and store the total count in dict classes 
        for(let e of params.sample){
            if(e <= i){
                counter += 1
            }else{
                break
            }
        }
        params.sample.splice(0, counter)
        params.classes[i.toString()] = counter
        console.log("Classes: ", params.classes)
    }

    // For each class we need to check if its total count is less than 5 if it's the case we need to 
    console.log("Chi squared", params)
    return {X: params.sample[0], Ri: params.sample[params.sample.length-1]}
}


console.log(testChiSquared(.05, {sample: [0.023,0.186,0.225,0.234,0.294,0.333,0.334,0.406,0.511,0.517,0.538,0.685,0.761,0.774,0.836,0.968,1.064,1.064,1.267,1.401,1.458,1.507,1.514,1.624,1.702,1.725,1.849,2.23,2.325,2.33,2.343,2.563,2.634,2.782,2.92,2.921,3.214,3.246,3.323,3.334,3.491,3.81,4.025,4.49,4.778,5.088,5.587,6.426,7.514,8.223], range: 0, k: 0, class: 0, eX: 0, classes: {}}))

export default testChiSquared