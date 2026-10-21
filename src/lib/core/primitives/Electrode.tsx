import React from 'react';

export interface ElectrodeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  label?: string;
  className?: string;
}

export const Electrode: React.FC<ElectrodeProps> = ({
  x,
  y,
  width,
  height,
  color,
  label,
  className = ''
}) => {
  return (
    <g className={className}>
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity={0.8} />
          <stop offset="50%" stopColor="#fffdf7" stopOpacity={0.34} />
          <stop offset="100%" stopColor={color} stopOpacity={1} />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        rx={2}
        stroke="#30454b"
        strokeWidth={1}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#grad-${color.replace('#', '')})`}
        rx={2}
      />
      {label && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          fill="#fffdf7"
          fontSize={12}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
        >
          {label}
        </text>
      )}
    </g>
  );
};
