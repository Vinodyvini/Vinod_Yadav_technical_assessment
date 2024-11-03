import React, { useState, useEffect } from 'react';
import { AbstractNode } from './AbstractNode';
import { Position } from 'reactflow';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const [inputWidth, setInputWidth] = useState(200);
  const [inputHeight, setInputHeight] = useState(data.inputHeight || 30);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const updateNodeField = useStore((state) => state.updateNodeField);

  const updateHandlesAndSize = () => {
    const lines = currText.split('\n').length;
    const newHeight = Math.max(30, lines * 20);
    const newWidth = Math.max(220, currText.length * 8);

    setInputWidth(newWidth);

    const variableMatches = currText.match(/{{\s*[\w\d_]+\s*}}/g);
    const uniqueVariables = Array.from(new Set(variableMatches || []));

    const newHandles = uniqueVariables.map((variable, index) => {
      const variableName = variable.replace(/{{\s*|\s*}}/g, '');
      return {
        id: variableName,
        type: 'target',
        position: Position.Left,
        top: `${20 * (index + 1)}%`,
      };
    });

    const outputHandleId = `${id}-output`;
    const outputVariableName = outputHandleId.replace(/.*-/, '');

    newHandles.push({
      id: outputVariableName,
      type: 'source',
      position: Position.Right,
      top: '50%',
    });

    setHandles(newHandles);
    setInputHeight(newHeight + uniqueVariables.length * 0.01);
  };

  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        updateHandlesAndSize();
      }, 500)
    );

    return () => clearTimeout(typingTimeout);
  }, [currText, id]);

  // Listen for new connections and adjust height accordingly
  useEffect(() => {
    updateNodeField(id, 'inputHeight', inputHeight);
  }, [inputHeight]);

  return (
    <AbstractNode
      id={id}
      label="Text"
      handles={handles}
      nodeWidth={inputWidth}
      nodeHeight={inputHeight}
    >
      <label>
        Text:
        <textarea
          style={{ width: '100%', height: `${inputHeight}px` }}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
        />
      </label>
    </AbstractNode>
  );
};
