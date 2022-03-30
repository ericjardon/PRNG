interface MidSquaresParams {
    iterations: number
}

const randomMidSquares = (seed: number, params: MidSquaresParams) => {
    let result = ""
    let x2:any = 0 
    if (seed >= 100 && seed <= 9999){
        for(let i=0; i<params.iterations; i++){
            x2 = seed * seed
            x2 = x2.toString()
            x2 = "0".repeat(8-x2.length) + x2
            x2 = x2.slice(2, -2)
            result = i + ".- " + x2 + "; "
            seed = parseInt(x2)
        }
    }else{
        return 99
        // "The seed must be at least 3 digits"
    }
    return seed
}

console.log("MS ",randomMidSquares(123, {iterations: 5}))
export default randomMidSquares
