import React, { useState } from 'react'
import Form from './Form'
import Result from './Result'
import { Alert } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Routes, Route, Link } from 'react-router-dom'

export default function MainView() {

  const [random, setRandom] = useState<number | null>(null);
  const [alert, setAlert] = useState<ReactJSXElement | null>(null);
  const [cache, setCache] = useState<number[]>([]);

  const clearCache = () => {
    setCache([]);
  }

  const updateRandom = (random: number) => {
    console.log('Set Random!', random)
    setAlert(null);
    setRandom(random);
    setCache(cache => [...cache, random]);
    console.log(cache);
  }

  const setError = (error: string): void => {

    setAlert(<Alert severity="error">{error}</Alert>)
  }

  return (
    <div className="App-main">
          <div className="row">
            <div className="column">
              <Form onSubmit={updateRandom} setError={setError} clearCache={clearCache}></Form>
            </div>
            <div className="column">
              <Result random={random} alert={alert} cache={cache}/>
            </div>
          </div>
    </div >
  )
}
