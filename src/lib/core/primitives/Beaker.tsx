import React from 'react';

export interface BeakerProps {
  x: number;
  y: number;
  width: number;
  height: number;
  lipWidth?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  className?: string;
}

export const Beaker: React.FC<BeakerProps> = ({
  x,
  y,
  width,
  height,
  lipWidth = 8,
  stroke = '#94a3b8',
  strokeWidth = 3,
  fill = 'none',
  className = ''
}) => {
  const r = 10;
  const pathData = `
    M ${x - lipWidth} ${y}
    L ${x + width + lipWidth} ${y}
    M ${x} ${y}
    L ${x} ${y + height - r}
    Q ${x} ${y + height} ${x + r} ${y + height}
    L ${x + width - r} ${y + height}
    Q ${x + width} ${y + height} ${x + width} ${y + height - r}
    L ${x + width} ${y}
  `;

  return (
    <g className={className}>
      <path
        d={pathData}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill={fill}
      />
      <line
        x1={x + 10}
        y1={y + height * 0.3}
        x2={x + 22}
        y2={y + height * 0.3}
        stroke={stroke}
        strokeWidth={1.5}
        strokeOpacity={0.6}
      />
      <line
        x1={x + 10}
        y1={y + height * 0.5}
        x2={x + 28}
        y2={y + height * 0.5}
        stroke={stroke}
        strokeWidth={1.5}
        strokeOpacity={0.6}
      />
      <line
        x1={x + 10}
        y1={y + height * 0.7}
        x2={x + 22}
        y2={y + height * 0.7}
        stroke={stroke}
        strokeWidth={1.5}
        strokeOpacity={0.6}
      />
    </g>
  );
};
