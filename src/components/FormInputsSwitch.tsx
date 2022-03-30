import React from 'react'
import MidSquares from './MidSquares';
// importar todos los inputs específicos a métodos

export interface IFormInputsSwitchProps {
    method: string,
    updateHandler: (event:React.FormEvent<HTMLInputElement>) => void
}

export default function FormInputsSwitch (props: IFormInputsSwitchProps) {


  if (props.method==='midSquares') {
    return (
      <MidSquares/>
    )
  }

  return (
    <>
    </>
  );
}
