import {Link} from 'react-router-dom'


export default function ValidationView () {
  return (
    <div className="App-main">
          <div className="row">
            <div className="column">
              Validation Proof Form Here
            </div>
            <div className="column">
                <div style={{position:'relative'}}>
                <Link to={"/"} className="linkToValidation">Generación</Link>
              Results Here
                </div>
            </div>
          </div>
    </div >
  );
}