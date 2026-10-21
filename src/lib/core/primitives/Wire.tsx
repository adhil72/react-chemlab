import React from 'react';

export interface WireProps {
  path: string;
  stroke?: string;
  strokeWidth?: number;
  animated?: boolean;
  reverse?: boolean;
  className?: string;
}

export const Wire: React.FC<WireProps> = ({
  path,
  stroke = '#cbd5e1',
  strokeWidth = 2.5,
  animated = false,
  reverse = false,
  className = ''
}) => {
  return (
    <g className={className}>
      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {animated && (
        <path
          d={path}
          fill="none"
          stroke="#38bdf8"
          strokeWidth={4}
          strokeDasharray="6 14"
          strokeLinecap="round"
          className={reverse ? 'animate-flow-reverse' : 'animate-flow'}
          style={{
            animation: `${reverse ? 'dashReverse' : 'dash'} 1.2s linear infinite`
          }}
        />
      )}
    </g>
  );
};
