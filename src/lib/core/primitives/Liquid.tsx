import React from 'react';

export interface LiquidProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  fillOpacity?: number;
  levelRatio?: number;
  className?: string;
}

export const Liquid: React.FC<LiquidProps> = ({
  x,
  y,
  width,
  height,
  fill,
  fillOpacity = 0.5,
  levelRatio = 0.75,
  className = ''
}) => {
  const liquidHeight = height * Math.min(Math.max(levelRatio, 0.1), 0.95);
  const liquidY = y + (height - liquidHeight);
  const r = 8;

  const pathData = `
    M ${x + 2} ${liquidY}
    L ${x + width - 2} ${liquidY}
    L ${x + width - 2} ${y + height - r}
    Q ${x + width - 2} ${y + height - 2} ${x + width - r} ${y + height - 2}
    L ${x + r} ${y + height - 2}
    Q ${x + 2} ${y + height - 2} ${x + 2} ${y + height - r}
    Z
  `;

  return (
    <g className={className}>
      <path
        d={pathData}
        fill={fill}
        fillOpacity={fillOpacity}
      />
      <ellipse
        cx={x + width / 2}
        cy={liquidY}
        rx={width / 2 - 2}
        ry={3}
        fill={fill}
        fillOpacity={fillOpacity + 0.15}
      />
    </g>
  );
};
