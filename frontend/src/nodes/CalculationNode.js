import React, { useState } from 'react';
import { AbstractNode } from './AbstractNode';
import { Position } from 'reactflow';

export const CalculationNode = ({ id, data }) => {
  const [result, setResult] = useState(0);

  const handleCalculate = () => {
    // Example calculation
    setResult(Number(data.num1) + Number(data.num2));
  };

  return (
    <AbstractNode
      id={id}
      label="Calculator"
      handles={[
        { id: 'num1', type: 'target', position: Position.Left, top: '33%' },
        { id: 'num2', type: 'target', position: Position.Left, top: '66%' },
        { id: 'result', type: 'source', position: Position.Right, top: '50%' },
      ]}
    >
      <button onClick={handleCalculate}>Calculate</button>
      <div>Result: {result}</div>
    </AbstractNode>
  );
};
