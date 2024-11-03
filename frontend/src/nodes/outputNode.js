import React, { useState } from 'react';
import { AbstractNode } from './AbstractNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <AbstractNode
      id={id}
      label="Output"
      handles={[{ type: 'target', position: Position.Left, top: '50%', id: 'value' }]}
    >
      <label>
        Name:
        <input type="text" value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </label>
      <label>
        Type:
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </AbstractNode>
  );
};
