import React from 'react'
import MidSquares from './MidSquares';
import MCM from './MCM';
// importar todos los inputs específicos a métodos

export interface IFormInputsSwitchProps {
    method: string,
    updateHandler: (event: React.ChangeEvent<any>) => void, //(event:React.FormEvent<HTMLInputElement>) => void
	params: any
}

const FormInputsSwitch : React.FC<IFormInputsSwitchProps> = ({
  method,
  updateHandler,
  params 
}) => {


  if (method==='midSquares') {
    return (
      <MidSquares/>
    )
  }

  if (method==='MCM' || method==='MC') {
    return (
      <MCM updateHandler={updateHandler} a={params.a} c ={params.c} m={params.m}/>
    )
  }

  return (
    <>
    </>
  );
}

export default FormInputsSwitch
