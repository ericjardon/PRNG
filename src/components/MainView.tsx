import React from 'react'
import Form from './Form'
import {Container} from '@mui/material'

export default function MainView() {
  return (
    <div className="App-main">
      <div className="column">
      <Form onSubmit={()=>console.log("Hello")}></Form>
      </div>
      <div className="column">
        Hello
      </div>
    </div>
  )
}
