import {GoodnessTestParams, ChiSquaredTable, ValidatorResult} from '../../types'
import {chiSquaredValues} from '../../criticalValues'


/*
A table can be an object with keys as column names pointing to
arrays of same size.
*/

const getClassesColumns = (k:number, classSize: number) => {
    let classStart = []; // indicate start and end
    let classEnd = [];
    let classLength = []; 

    for (let i=0; i<k; i++) {
        classStart.push(classSize*i); 
        classEnd.push(classSize*(i+1)); 
        classLength.push(1);  // multiplier of class size;
    }

    return { classStart, classEnd, classLength };  // column headers
}

const getObservedFrequencies = (table: ChiSquaredTable, sample: number[]) : number[] => {

    let numClasses = table.classEnd!.length;
    let observedFrequencies : number[] = Array(numClasses).fill(0);
    let ri;
    let currentClass = 0;
    for (let i=0; i<sample.length; i++) {
        ri = sample[i];

        // sorted sample so we can move to next class when we exceed class limit
        if (ri <= table.classEnd![currentClass]) {
            observedFrequencies[currentClass] += 1;
        } else {
            currentClass += 1;
            observedFrequencies[currentClass] += 1;
        }
    }
    console.log("Frequencies",observedFrequencies)
    return observedFrequencies
}

const reduceClasses = (table: ChiSquaredTable) : ChiSquaredTable => {
    /* 
        This function analyzes the classes and reduces them according to
        the minimum-5 observations per class rule.
    */
    let currentCount = 0;
    let currentClassLength = 1;
    let newStart : number[] = [];
    let newEnd : number[] = [];
    let newFrequencies : number[] = [];
    let newClassLength : number[] = [];
    let k = table.classStart!.length;
    let startIndex = 0;
    let currentStart = table.classStart![0];

    for (let i=0; i<k; i++) {
        currentCount += table.observedFrequencies![i];
        if (currentCount >= 5) {
            newStart.push(currentStart);
            newEnd.push(table.classEnd![i]);
            newFrequencies.push(currentCount);
            newClassLength.push(currentClassLength);

            startIndex = i;
            currentStart = table.classEnd![i];
            currentCount = 0;
            currentClassLength = 1;
        } else {
            currentClassLength += 1;
        }
    }

    // if last element in array newEnd !== 1 it means that last class does not have 5 or more elements.
    // extend last class and sum current count

    if (newEnd[newEnd.length-1] !== 1) {
        newEnd[newEnd.length-1] = table.classEnd![k-1];
        newFrequencies[newEnd.length-1] += currentCount;
        newClassLength[newEnd.length - 1] += 1;
    }
    
    let reducedTable : ChiSquaredTable = {
        classStart: newStart,
        classEnd: newEnd,
        classLength: newClassLength,
        observedFrequencies: newFrequencies,
    }; 

   return reducedTable;
}

const getExpectedFrequencies = (table: ChiSquaredTable, Ei: number) : number[] => {
    return table.classLength!.map(length => length*Ei);
}

const getDifferential = (table: ChiSquaredTable) => {
    return table.observedFrequencies!.map((O, i) => (
        Math.pow((O-table.expectedFrequencies![i]), 2) / table.expectedFrequencies![i]
    ));
}


const chiSquaredTest = (params: GoodnessTestParams) : ValidatorResult => {
    const { sample, alpha } = params;
    const N = sample.length;

    if (N<5) {
        console.log("insufficient N");
        return {result:false, table:null}; // TODO: return type object
    }

    console.log("N", N);

    sample.sort();

    const range = sample[N-1] - sample[0];
    console.log("range", range);

    // Sturges Empirical Law
    let k = 1 + Math.floor(Math.log2(N));

    const Ei = N / k; // expected per class size

    console.log("classes:", k);

    // classSize = 1/k
    const classSize = 1/k;  // class
    console.log("class size:", classSize);


    let table : ChiSquaredTable = getClassesColumns(k, classSize); 
    table.observedFrequencies = getObservedFrequencies(table, sample);

    console.log("Table with all classes", table)
    table = reduceClasses(table);
    k = table.classStart!.length;
    console.log("Reduced table", table)

    if (k<2) {
        console.log("insufficient classes after reduction");
        return {result:false, table:null}; // TODO: return type object
    }

    table.k = k;

    // Add Expected frequencies
    table.expectedFrequencies = getExpectedFrequencies(table, Ei);

    // Calculate differential
    table.differential = getDifferential(table);
    
    // la sumatoria de estas differential
    table.X02 = table.differential.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const v = k - 1;  // estimated parameters = 0
    console.log("Degrees v:", v)

    table.Xv2 = chiSquaredValues[v][alpha];
    table.N = N;
    console.dir(table);
    
    return {result: table.X02 < table.Xv2, table:table};
}


const testChiSquared = (seed:number,params: any) => {
    params.sample.sort()
    params.range = params.sample[params.sample.length-1] - params.sample[0]
    params.k = Math.floor(1 + Math.log2(params.sample.length)) 
    params.class = (params.range / params.k)

    console.log("Params poblated: ", params)
    // Increment the class until if it gets multiplied by 'k' it gives as result an interger number
    // while(parseFloat((params.class * params.k % 1).toFixed(2))){
    //     params.class = parseFloat((params.class + 0.01).toFixed(2))
    // }

    // Create the classes and store the total count of every class.
    let counter
    let sampleAux = Object.assign([], params.sample)
    for(let i = params.sample[0] + params.class ; i <= (params.class * params.k) + params.sample[0]; i = i + params.class){
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
        // console.log("Classes: ", params.classes)
    }
    params.sample = sampleAux

    // join the classes with less than 5 F0i 
    minClasses(params.classes)

    // update k using the new number of keys in the dictionary
    params.k = Object.keys(params.classes).length

    // X0i 
    let Ei = params.sample.length / params.k
    console.log("Length ", params.sample.length)
    console.log("K: ", params.k)
    console.log("Ei: ", Ei)
    let prevK = params.sample[0]
    let times = 0

    
    for(let key in params.classes){
        params.X = params.X + ((Math.pow((params.classes[key] - Ei), 2)/Ei))
    }
    // For each class we need to check if its total count is less than 5 if it's the case we need to 
    console.log("Chi squared", params)

    return {X: params.sample[0], Ri: params.sample[(params.sample.length)-1]}
}


const minClasses = (classes: any) => {
    // identify the classes with less than 5 elements and join them 
    let auxKey = ""
    console.log(classes)
    for(let key in classes){
        if(auxKey!==""){
            classes[key] = classes[key] + classes[auxKey]
            delete classes[auxKey]
            auxKey = ""
        }
        if(classes[key] < 5){
            console.log(key)
            auxKey = key
        }
    }

    if(auxKey!==""){
        classes[auxKey] = classes[auxKey] + classes[Object.keys(classes)[Object.keys(classes).length - 2]] // Add the value of the second to last element to the last one.
        delete classes[Object.keys(classes)[Object.keys(classes).length - 2]] // Delete the second to last element 
    }
}


// console.log(testChiSquared(.05, {sample: TEST_SAMPLE_2, range: 0, k: 0, class: 0, X: 0, classes: {}}))

export default chiSquaredTest