import React from 'react'
import Form from './Form'


export default function MainView() {
  return (
    <div>
        <Form onSubmit={()=>console.log("Hello")}></Form>
    </div>
  )
}
