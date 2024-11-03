import React from 'react';
import { Handle } from 'reactflow';

export const AbstractNode = ({ id, data, label, children, handles = [], nodeWidth, nodeHeight }) => {
  const nodeStyle = {
    width: nodeWidth || 220,
    height: 'auto',
    padding: '10px',
    borderRadius: '8px',
    border: '2px solid #0074D9',
    backgroundColor: '#F0F8FF',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
  };

  const headerStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '6px',
  };

  const childrenStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    color: '#555',
    fontSize: '12px',
  };

  return (
    <div style={nodeStyle}>
      <div style={headerStyle}>{label}</div>
      <div style={childrenStyle}>{children}</div>

      {handles.map((handle) => (
        <div
          key={handle.id} // Ensure unique key for each handle
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            left: handle.type === 'target' ? '-12px' : 'auto',
            right: handle.type === 'source' ? '-12px' : 'auto',
            top: handle.top,
          }}
        >
          <Handle
            type={handle.type}
            position={handle.position}
            id={`${id}-${handle.id}`}
            style={{
              backgroundColor: '#0074D9',
              borderRadius: '50%',
              width: '6px',
              height: '6px',
              border: '2px solid #0074D9',
              marginLeft: handle.type === 'target' ? '10px' : '0',
              marginRight: handle.type === 'source' ? '10px' : '0',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              color: '#333',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: handle.type === 'target' ? '-80px' : 'auto',
              right: handle.type === 'source' ? '-80px' : 'auto',
              width: '70px',
              whiteSpace: 'nowrap',
              textAlign: handle.type === 'target' ? 'right' : 'left',
              direction: handle.type === 'target' ? 'rtl' : 'ltr',
            }}
          >
            {handle.id.replace(/-/g, ' ')}
          </span>
        </div>
      ))}
    </div>
  );
};
