import React from 'react'
import MidSquares from './MidSquares';
import SimpleCongruential from './SimpleCongruential';
import CombinedCongruential from './CombinedCongruential';
// importar todos los inputs específicos a métodos

export interface IFormInputsSwitchProps {
    method: string,
    updateHandler: (event: React.ChangeEvent<any>) => void, 
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

  if (method==='MCM' || method==='MC' || method === 'GM') {
    return (
      <SimpleCongruential updateHandler={updateHandler} {...params} isMultiplicative={method==='GM'}/>
    )
  }

  if (method==='MCLM') {
    return (
      <CombinedCongruential updateHandler={updateHandler} {...params}/>
    )
  }

  return (
    <>
    </>
  );
}

export default FormInputsSwitch
