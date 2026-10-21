import React from 'react';

export interface SaltBridgeIonsProps {
  startX: number;
  endX: number;
  midY: number;
  animated?: boolean;
}

export const SaltBridgeIons: React.FC<SaltBridgeIonsProps> = ({
  startX,
  endX,
  midY,
  animated = true
}) => {
  return (
    <g>
      <text
        x={startX + 18}
        y={midY}
        fill="#f43f5e"
        fontSize={11}
        fontWeight="bold"
        className={animated ? 'animate-pulse' : ''}
      >
        NO₃⁻ →
      </text>
      <text
        x={endX - 45}
        y={midY}
        fill="#a855f7"
        fontSize={11}
        fontWeight="bold"
        className={animated ? 'animate-pulse' : ''}
      >
        → K⁺
      </text>
    </g>
  );
};
