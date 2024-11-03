import React from 'react';
import { AbstractNode } from './AbstractNode';
import { Position } from 'reactflow';

export const DateNode = ({ id, data }) => {
  return (
    <AbstractNode
      id={id}
      label="Date Selector"
      handles={[
        { id: 'input', type: 'target', position: Position.Left, top: '50%' },
        { id: 'output', type: 'source', position: Position.Right, top: '50%' },
      ]}
    >
      <label>
        Select Date:
        <input type="date" />
      </label>
    </AbstractNode>
  );
};
