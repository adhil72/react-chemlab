import React from 'react';

export interface VoltmeterProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  voltage: number;
  label?: string;
  showLabel?: boolean;
  className?: string;
}

export const Voltmeter: React.FC<VoltmeterProps> = ({
  x,
  y,
  width = 110,
  height = 46,
  voltage,
  label = 'Voltmeter',
  showLabel = true,
  className = ''
}) => {
  const boxX = x - width / 2;
  const boxY = y;
  const screenWidth = width - 24;
  const screenHeight = height - 18;
  const screenX = x - screenWidth / 2;
  const screenY = y + (height - screenHeight) / 2;

  const displayValue = Math.abs(voltage).toFixed(3);

  return (
    <g className={className}>
      {showLabel && label && (
        <text
          x={x}
          y={boxY - 8}
          fill="currentColor"
          fontSize={13}
          fontWeight="bold"
          textAnchor="middle"
        >
          {label}
        </text>
      )}

      <rect
        x={boxX}
        y={boxY}
        width={width}
        height={height}
        rx={3}
        fill="#0284c7"
        stroke="#0f172a"
        strokeWidth={2}
      />

      <rect
        x={screenX}
        y={screenY}
        width={screenWidth}
        height={screenHeight}
        rx={2}
        fill="#ffffff"
        stroke="#0f172a"
        strokeWidth={1.5}
      />

      <text
        x={x}
        y={screenY + screenHeight / 2 + 1}
        fill="#0f172a"
        fontSize={16}
        fontWeight="bold"
        fontFamily="monospace"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {displayValue}
      </text>

      <circle cx={boxX} cy={boxY + height / 2} r={3} fill="#0f172a" />
      <circle cx={boxX + width} cy={boxY + height / 2} r={3} fill="#0f172a" />
    </g>
  );
};
