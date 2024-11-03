import React, { useState } from 'react';
import { AbstractNode } from './AbstractNode';
import { Position } from 'reactflow';

export const ConditionalNode = ({ id, data }) => {
  const [conditionMet, setConditionMet] = useState(false);

  const handleConditionCheck = () => {
    setConditionMet(data.input > 10); // Example condition
  };

  return (
    <AbstractNode
      id={id}
      label="Conditional Check"
      handles={[
        { id: 'input', type: 'target', position: Position.Left, top: '50%' },
        { id: 'output', type: 'source', position: Position.Right, top: '50%' },
      ]}
    >
      <button onClick={handleConditionCheck}>Check Condition</button>
      <div>{conditionMet ? "Condition Met" : "Condition Not Met"}</div>
    </AbstractNode>
  );
};
