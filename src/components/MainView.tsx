import React, {useState} from 'react'
import Form from './Form'
import {Alert} from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export default function MainView() {

  const [random, setRandom] = useState<number|null>(null);
  const [alert, setAlert] = useState<ReactJSXElement|null>(null);

  const updateRandom = (random:number) => {
    console.log('Set Random!', random)
	setAlert(null);
    setRandom(random);
  }

  const setError = (error:string) : void => {
	console.log(error);
	setAlert(<Alert severity="error">{error}</Alert>)
  }

  return (
    <div className="App-main">
      <nav className="Nav"><h3>Métodos Cuantitativos y Simulación</h3></nav>
      <div className="row">
		<div className="column">
			<Form onSubmit={updateRandom} setError={setError}></Form>
		</div>
		<div className="column">
			{random!==null ? `Tu aleatorio: ${random}`
			: 'Llena los parámetros y haz click en "Generar"'
			}
			{alert}
		</div>
      </div>

    </div>
  )
}
