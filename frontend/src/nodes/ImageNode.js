import React from 'react';
import { AbstractNode } from './AbstractNode';
import { Position } from 'reactflow';

export const ImageNode = ({ id, data }) => {
  return (
    <AbstractNode
      id={id}
      label="Image Uploader"
      handles={[
        { id: 'output', type: 'source', position: Position.Right, top: '50%' },
      ]}
    >
      <label>
        Upload Image:
        <input type="file" accept="image/*" />
      </label>
    </AbstractNode>
  );
};
