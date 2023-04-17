import { useState } from "react"
import { LabeledNumericalInput } from "./CommonComponents.library";

function addTwo(a,b){
  return parseInt(a)+parseInt(b);
}

export const AdditionCalculator = () => {
    const [operandA,setOperandA] = useState(0);
    const [operandB, setOperandB] = useState(0);

    const [clientResponse,setClientResponse] = useState();
    const [serverResponse,setServerResponse] = useState();

    const [error,setError] = useState();

    const serverAddTwo = async () => {
      await fetch('/addTwo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({a:operandA,b:operandB}),
      })
      .then(response => response.json())
      .then(data => setServerResponse(data.result))
    };

    return (
        <>
          <div className="bg-light p-2 rounded mt-4">
            <p className="h3 mx-4 my-auto">Addition Calculator</p>
          </div>
          <div>
            <LabeledNumericalInput
              label="Operand 1:"
              state={operandA}
              setState={setOperandA}
            />
            <LabeledNumericalInput
              label="Operand 2:"
              state={operandB}
              setState={setOperandB}
            />
          </div>
          {error?<p className="bg-danger text-white rounded p-1">Both fields must be filled out to send a request!</p>:<></>}
          <button
            className="bg-primary border-0 rounded text-white"
            onClick={async () => {
              if(operandA && operandB){
                setError()
                setClientResponse(addTwo(operandA,operandB));
                await serverAddTwo();
              }
              else{
                setError(true)
              }
              // setServerResponse(await serverAddTwo());
            }}
          >Calculate</button>
          <br/>
          <br/>
          <p>Result from client: {clientResponse}</p>
          <p>Result from server: {serverResponse}</p>
        </>
    )
}