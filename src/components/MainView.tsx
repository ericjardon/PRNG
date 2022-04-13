import React, { useState } from 'react'
import Form from './Form'
import Result from './Result'
import { Alert } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Routes, Route, Link } from 'react-router-dom'
import Select, { SelectChangeEvent } from '@mui/material/Select';
/* Global App State is managed from this component. */

export default function MainView() {

  const [random, setRandom] = useState<number | null>(null);
  const [alert, setAlert] = useState<ReactJSXElement | null>(null);
  const [randoms, setRandoms] = useState<number[]>([]);

  const [globalState, setGlobalState] = useState({
    method: '',
  })

  const updateGlobalState = (name: string, value: any) => {
    console.log('global state', name, value)
    setGlobalState({
      ...globalState,
      [name]: value,
    })
  }

  const clearRandoms = () => {
    setRandoms([]);
  }

  const updateRandoms = (randoms: number[]) => {
    setAlert(null);
    console.log("randoms at updateRandoms", randoms);
    setRandoms(randoms);
  }

  const setError = (error: string): void => {
    setAlert(<Alert severity="error">{error}</Alert>)
  }

  return (
    <div className="App-main">
      <div className="row">
        <div className="column">
          <Form updateRandoms={updateRandoms} setError={setError} clearRandoms={clearRandoms} updateGlobalState={updateGlobalState}></Form>
        </div>
        <div className="column">
          <Result random={random} alert={alert} randoms={randoms} method={globalState.method}/>
        </div>
      </div>
    </div >
	
  )
}
