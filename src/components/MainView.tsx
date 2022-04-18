import React, { useState } from 'react'
import Form from './Form'
import Result from './output/Result'
import ValidationForm from './ValidationForm'
import { Alert } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {RNG} from '../RNGs'
/* Global App State is managed from this component. */

export default function MainView() {

  const [random, setRandom] = useState<number | null>(null);
  const [alert, setAlert] = useState<ReactJSXElement | null>(null);
  const [randoms, setRandoms] = useState<number[]>([]);

  const [globalState, setGlobalState] = useState({
    method: '',
  })

  const updateGlobalState = (name: string, value: any) => {
    setAlert(null);
    setGlobalState({
      ...globalState,
      [name]: value,
    })
  }

  const clearRandoms = () => {
    setRandoms([]);
  }

  const hasSample = (): boolean => randoms.length > 1;
  const hasValidation = (): boolean => (
      globalState.method === RNG.LinearCongruential ||
      globalState.method === RNG.MixedCongruential ||
      globalState.method === RNG.MultiplicativeCongruential || 
      globalState.method === RNG.MathRandom
    )

  const updateRandoms = (randoms: number[]) => {
    setAlert(null);
    setRandoms(randoms);
  }

  const setError = (error: string): void => {
    setAlert(<Alert severity="error">{error}</Alert>)
  }

  return (
    <div className="App-main">
      <div className="row">
        <div className="column">
          <Form
            updateRandoms={updateRandoms}
            setError={setError}
            clearRandoms={clearRandoms}
            updateGlobalState={updateGlobalState}
          />
        </div>
        <div className="column">
          <Result
            random={random}
            alert={alert}
            randoms={randoms}
            method={globalState.method}
          />
        </div>
      </div>
      {hasSample() && hasValidation() && (
        <div className="validationForm">
          <ValidationForm sample={randoms} />
        </div>
      )}
    </div >

  )
}
