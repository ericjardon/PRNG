import React, { ChangeEventHandler, useState, useEffect } from 'react'
import { Button, TextField, Stack, Select, MenuItem, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import FormInputsSwitch from './FormInputsSwitch'
import { METHODS } from '../stats/methods'
import { validateNumeric, paramsToIntegers, completeParams } from '../utils'
import { RNG } from '../RNGs'
interface Props {
    updateRandoms: (randoms: number[]) => void,
    setError: (error: string) => void,
    clearRandoms: () => void,
    updateGlobalState: (name: string, value: any) => void,
}

const Form: React.FC<Props> = ({
    updateRandoms,
    setError,
    clearRandoms,
    updateGlobalState,
}) => {

    const [method, setMethod] = useState<string>(RNG.MathRandom);
    const [seed, setSeed] = useState<string>("");
    const [numberRandoms, setNumberRandoms] = useState<string>("");
    const [params, setParams] = useState<any>({});
    const [completeForm, setCompleteForm] = useState<boolean>(false);
    const [seedLabel, setSeedLabel] = useState<string>("Semilla");

    useEffect(() => {
        updateGlobalState('method', method);
    }, [])

    useEffect(() => {          // completeForm updater
        if (method !== "" && validateNumeric(seed) && validateNumeric(numberRandoms) && completeParams(params, method)) {
            setCompleteForm(true);
        } else {
            setCompleteForm(false);
        }
    }, [seed, method, params])

    useEffect(() => {
        if (method === RNG.MidSquares) {
            setSeedLabel("Semilla (4 dígitos)");
        } else if (method === RNG.CombinedCongruential) {
            setSeed('1');  // dummy value
        }
        else {
            setSeedLabel("Semilla");
        }
    }, [method])

    const updateHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        const target = event.target as HTMLInputElement;
        setParams({
            ...params,
            [target.name]: target.value,
        });
    }

    const handleMethodChange = (event: SelectChangeEvent) => {
        setParams({})
        setMethod(event.target.value);
        clearRandoms();
        updateGlobalState('method', method);
    }

    const getSeedAsNum = (): number | null => {
        let seedNum: number = Number.parseFloat(seed);

        if (Number.isNaN(seedNum)) {
            setError("Introduce una semilla válida");
            return null;
        };

        if (seedNum <= 0) {
            setError('La semilla debe ser mayor a 0');
            return null;
        }

        return seedNum;
    }

    const getRandom = (): void => {
        const n = Number.parseInt(numberRandoms);
        console.log("How many nums?", n);
        console.log(params);

        if (!method || !seed) return;

        let seedNum;
        if (method === RNG.CombinedCongruential) {
            seedNum = 1; // dummy value for combined congruential
        } else {
            seedNum = getSeedAsNum();
            if (!seedNum) return;
        }

        console.log("Method selected:", method);

        // Prepare Params
        const { seedVal, cleanParams } = prepareParams(method, seedNum, params, n);

        if (cleanParams === null) {
            setError('Parámetros incorrectos');
            return;
        }

        if (!(method in METHODS)) {
            setError("Método no implementado.");
            return;
        }
        else {
            console.log("Calling method", method, 'with how many?', n);
            const randoms: number[] = METHODS[method](seedVal, cleanParams, n);
            console.log("updating randoms");
            updateRandoms(randoms);
        }
    }

    const handleSeedChange = (event: React.ChangeEvent<any>) => {
        console.log("New seed", event.target.value)

        setSeed(event.target.value);
    }

    const handleNumberRandomsChange = (event: React.ChangeEvent<any>) => {
        console.log("number randoms change", event.target.value);
        setNumberRandoms(event.target.value);
    }

    return (
        <div className="formContainer">
            <Stack spacing={2} className="formStack">
                <h4>Parámetros</h4>
                <Select
                    labelId="method-selector-label"
                    id="method-selector"
                    value={method}
                    onChange={handleMethodChange}
                >
                    <MenuItem value="">
                        <em>Sin selección</em>
                    </MenuItem>
                    <MenuItem value={RNG.MidSquares}>Mid Squares</MenuItem>
                    <MenuItem value={RNG.LinearCongruential}>Linear Congruential</MenuItem>
                    <MenuItem value={RNG.MixedCongruential}>Mixed Congruential</MenuItem>
                    <MenuItem value={RNG.CombinedCongruential}>Combined Congruential</MenuItem>
                    <MenuItem value={RNG.MultiplicativeCongruential}>Multiplicative Congruential</MenuItem>
                    <MenuItem value={RNG.MathRandom}>Math.Random</MenuItem>
                </Select>
                <TextField label="Número de Aleatorios" variant="filled" value={numberRandoms} onChange={handleNumberRandomsChange}></TextField>
                {(method !== RNG.CombinedCongruential &&
                    <TextField label={seedLabel} variant="filled" value={seed} onChange={handleSeedChange}></TextField>
                )}
                <FormInputsSwitch method={method} updateHandler={updateHandler} params={params} />
            </Stack>
            <div className="buttonContainer">
                <Button disabled={!completeForm} variant="contained" size="large" onClick={getRandom}>Generar {numberRandoms} Randoms</Button>
            </div>
        </div>
    )
}

// used for preprocessing of certain methods
export const prepareParams = (method: string, seedVal: number, params: any, n: number) => {
    if (method === RNG.CombinedCongruential) {

        let a: number[] = [];
        let m: number[] = [];
        let s: number[] = [];
        let k = Number(params.numGenerators);

        for (let i = 1; i <= k; i++) {
            a.push(Number(params[`a${i}`]))
            m.push(Number(params[`m${i}`]))
            s.push(Number(params[`s${i}`]))
        }

        console.log("a", a);
        console.log("m", m);
        console.log("s", s);

        params = {
            a,
            m,
            xi: s, // seeds for mclm
        }  // arrays of length k 

    } else {
        params = paramsToIntegers(params);
    }

    return { seedVal, cleanParams: params };
}

export default Form;