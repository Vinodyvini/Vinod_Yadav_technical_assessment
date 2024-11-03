import React from 'react';
import { AbstractNode } from './AbstractNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id }) => {
  return (
    <AbstractNode
      id={id}
      label="LLM"
      handles={[
        { type: 'target', position: Position.Left, id: 'system', top: `${100 / 3}%` },
        { type: 'target', position: Position.Left, id: 'prompt', top: `${200 / 3}%` },
        { type: 'source', position: Position.Right, id: 'response' },
      ]}
    >
      <span>This is a LLM.</span>
    </AbstractNode>
  );
};
