import React from 'react'
import MidSquares from './MidSquares';
import SimpleCongruential from './SimpleCongruential';
import CombinedCongruential from './CombinedCongruential';
import {RNG} from '../RNGs'
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


  if (method===RNG.MidSquares) {
    return (
      <MidSquares/>
    )
  }

  if (method===RNG.MixedCongruential || method===RNG.LinearCongruential || method === RNG.MultiplicativeCongruential) {
    return (
      <SimpleCongruential updateHandler={updateHandler} {...params} isMultiplicative={method===RNG.MultiplicativeCongruential}/>
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
