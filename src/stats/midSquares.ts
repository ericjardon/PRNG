interface MidSquaresParams {
    iterations: number
}

const randomMidSquares = (seed: number, params: MidSquaresParams) => {
    let result: number[] = []
    let x2:any = 0 
    
    for(let i=0; i<params.iterations; i++){
            x2 = seed * seed
            x2 = Math.trunc(x2/100)
            x2 = x2%10000
            result.push(x2/10000)
            seed = parseInt(x2)
    }

    return  result
}

console.log("MS ",randomMidSquares(123, {iterations: 5}))
export default randomMidSquares