import React, { useState } from 'react';
import { AbstractNode } from './AbstractNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const [inputValue, setInputValue] = useState(''); // State to store the input value

  return (
    <AbstractNode
      id={id}
      label="Input"
      handles={[{ type: 'source', position: Position.Right, top: '50%', id: 'value' }]}
    >
      <label>
        Name:
        <input type="text" value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </label>
      <label>
        Type:
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="Number">Number</option>
        </select>
      </label>
      
      {/* Conditionally render the input field based on the selected input type */}
      {inputType === 'Text' && (
        <label>
          Text:
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        </label>
      )}
      {inputType === 'Number' && (
        <label>
          Number:
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            step="1" // Ensures only integers are allowed
          />
        </label>
      )}
      {inputType === 'File' && (
        <label>
          File:
          <input type="file" onChange={(e) => setInputValue(e.target.files[0])} />
        </label>
      )}
    </AbstractNode>
  );
};
