import React from 'react';
import { AbstractNode } from './AbstractNode';
import { Position } from 'reactflow';

export const NewCustomNode = ({ id }) => {
  return (
    <AbstractNode
      id={id}
      label="Custom Node"
      handles={[
        { type: 'source', position: Position.Right, top: '50%', id: 'customOutput' },
        { type: 'target', position: Position.Left, id: 'customInput' },
      ]}
    >
      <span>Custom content goes here</span>
    </AbstractNode>
  );
};
