import React, {useState} from 'react'
import Form from './Form'
import {Container} from '@mui/material'

export default function MainView() {

  const [random, setRandom] = useState<number|null>(null)

  const updateRandom = (random:number) => {
    console.log('Set Random!', random)
    setRandom(random);
  }

  return (
    <div className="App-main">
      <nav className="Nav"><h3>Métodos Cuantitativos y Simulación</h3></nav>
      <div className="row">
      <div className="column">
      <Form onSubmit={updateRandom}></Form>
      </div>
      <div className="column">
        {random!==null ? `Tu aleatorio: ${random}`
        : 'Llena los parámetros y haz click en "Generar"'
        }
      </div>
      </div>

    </div>
  )
}
