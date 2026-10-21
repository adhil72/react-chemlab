import React from 'react';
import { Beaker } from '@/lib/core/primitives/Beaker';
import { Liquid } from '@/lib/core/primitives/Liquid';
import { RedoxCouple } from '@/lib/core/constants/standardPotentials';

export interface HalfCellProps {
  x: number;
  y: number;
  width: number;
  height: number;
  electrodeX: number;
  electrodeY: number;
  electrodeWidth: number;
  electrodeHeight: number;
  electrodeMetal: string;
  couple: RedoxCouple;
  type: 'anode' | 'cathode';
  showReactionArrows?: boolean;
}

export const HalfCell: React.FC<HalfCellProps> = ({
  x,
  y,
  width,
  height,
  electrodeX,
  electrodeY,
  electrodeWidth,
  electrodeHeight,
  electrodeMetal,
  couple,
  type,
  showReactionArrows = true
}) => {
  const isAnode = type === 'anode';

  return (
    <g>
      <Liquid
        x={x}
        y={y}
        width={width}
        height={height}
        fill={couple.solutionColor}
        fillOpacity={0.75}
        levelRatio={0.75}
      />

      <Beaker
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="#0284c7"
        strokeWidth={2.5}
      />

      <rect
        x={electrodeX}
        y={electrodeY}
        width={electrodeWidth}
        height={electrodeHeight}
        fill={couple.color}
        stroke="#0f172a"
        strokeWidth={1.5}
        rx={2}
      />

      <text
        x={electrodeX + electrodeWidth / 2}
        y={electrodeY + 36}
        fill="#0f172a"
        fontSize={16}
        fontWeight="bold"
        textAnchor="middle"
      >
        {electrodeMetal}
      </text>

      {showReactionArrows && isAnode && (
        <g>
          <path
            d={`M ${electrodeX + electrodeWidth / 2} ${electrodeY + electrodeHeight} Q ${electrodeX + electrodeWidth / 2} ${electrodeY + electrodeHeight + 20} ${electrodeX + electrodeWidth / 2 + 30} ${electrodeY + electrodeHeight + 20}`}
            fill="none"
            stroke="#0f172a"
            strokeWidth={1.8}
            markerEnd="url(#salt-arrow)"
          />
          <text
            x={electrodeX + electrodeWidth / 2 + 52}
            y={electrodeY + electrodeHeight + 24}
            fill="#0f172a"
            fontSize={13}
            fontWeight="bold"
          >
            {couple.ion}
          </text>
        </g>
      )}

      {showReactionArrows && !isAnode && (
        <g>
          <path
            d={`M ${electrodeX - 35} ${electrodeY + electrodeHeight + 20} Q ${electrodeX - 10} ${electrodeY + electrodeHeight + 20} ${electrodeX + electrodeWidth / 2} ${electrodeY + electrodeHeight}`}
            fill="none"
            stroke="#0f172a"
            strokeWidth={1.8}
            markerEnd="url(#salt-arrow)"
          />
          <text
            x={electrodeX - 58}
            y={electrodeY + electrodeHeight + 24}
            fill="#0f172a"
            fontSize={13}
            fontWeight="bold"
            textAnchor="end"
          >
            {couple.ion}
          </text>
        </g>
      )}
    </g>
  );
};
