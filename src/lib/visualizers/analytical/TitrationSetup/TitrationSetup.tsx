import React from 'react';
import { TitrationSetupProps, TitrationIndicator } from './TitrationSetup.types';

function computeIndicatorColor(
  volumeAdded: number,
  eqVolume: number,
  indicator: TitrationIndicator
): string {
  const diff = volumeAdded - eqVolume;

  if (indicator === 'phenolphthalein') {
    if (diff < -0.2) return 'rgba(248, 250, 252, 0.4)';
    if (Math.abs(diff) <= 0.2) return 'rgba(244, 114, 182, 0.55)';
    return 'rgba(219, 39, 119, 0.75)';
  }

  if (indicator === 'bromothymol-blue') {
    if (diff < -0.2) return 'rgba(250, 204, 21, 0.65)';
    if (Math.abs(diff) <= 0.2) return 'rgba(34, 197, 94, 0.65)';
    return 'rgba(14, 165, 233, 0.75)';
  }

  if (diff < -0.2) return 'rgba(239, 68, 68, 0.7)';
  if (Math.abs(diff) <= 0.2) return 'rgba(249, 115, 22, 0.7)';
  return 'rgba(234, 179, 8, 0.7)';
}

export const TitrationSetup: React.FC<TitrationSetupProps> = ({
  titrant = '0.100 M NaOH',
  analyte = '25.0 mL HCl',
  titrantVolumeAdded = 24.8,
  equivalencePointVolume = 25.0,
  indicator = 'phenolphthalein',
  showLabels = true,
  showCallouts,
  showDroplets = true,
  showStirrer = true,
  animated = true,
  width = '100%',
  height = 'auto',
  className = '',
  style
}) => {
  const isCalloutsVisible = showCallouts ?? showLabels;
  const flaskLiquidColor = computeIndicatorColor(titrantVolumeAdded, equivalencePointVolume, indicator);

  const svgWidth = 600;
  const svgHeight = 520;

  const standBaseX = 140;
  const standBaseY = 460;
  const standWidth = 260;
  const standRodX = 180;
  const standRodTopY = 30;

  const buretteCenterX = 300;
  const buretteWidth = 26;
  const buretteTopY = 45;
  const buretteHeight = 250;
  const stopcockY = buretteTopY + buretteHeight;
  const tipBottomY = stopcockY + 35;

  const flaskTopY = tipBottomY + 25;
  const flaskHeight = 115;
  const flaskNeckWidth = 34;
  const flaskBaseWidth = 140;
  const flaskBottomY = flaskTopY + flaskHeight;

  const stirrerTopY = flaskBottomY;
  const stirrerHeight = 24;

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      style={{ width, ...style }}
      role="img"
      aria-label="Titration Apparatus"
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <rect
          x={standBaseX}
          y={standBaseY}
          width={standWidth}
          height={16}
          rx={3}
          fill="#334155"
          stroke="#0f172a"
          strokeWidth={1.5}
        />
        <line
          x1={standRodX}
          y1={standBaseY}
          x2={standRodX}
          y2={standRodTopY}
          stroke="#475569"
          strokeWidth={6}
          strokeLinecap="round"
        />

        <line
          x1={standRodX}
          y1={buretteTopY + 60}
          x2={buretteCenterX - buretteWidth / 2}
          y2={buretteTopY + 60}
          stroke="#1e293b"
          strokeWidth={5}
        />
        <rect
          x={buretteCenterX - buretteWidth / 2 - 4}
          y={buretteTopY + 54}
          width={buretteWidth + 8}
          height={12}
          rx={2}
          fill="#475569"
        />

        <line
          x1={standRodX}
          y1={buretteTopY + 180}
          x2={buretteCenterX - buretteWidth / 2}
          y2={buretteTopY + 180}
          stroke="#1e293b"
          strokeWidth={5}
        />
        <rect
          x={buretteCenterX - buretteWidth / 2 - 4}
          y={buretteTopY + 174}
          width={buretteWidth + 8}
          height={12}
          rx={2}
          fill="#475569"
        />

        <rect
          x={buretteCenterX - buretteWidth / 2}
          y={buretteTopY}
          width={buretteWidth}
          height={buretteHeight}
          fill="#f8fafc"
          fillOpacity={0.7}
          stroke="#0284c7"
          strokeWidth={2}
        />

        <rect
          x={buretteCenterX - buretteWidth / 2 + 2}
          y={buretteTopY + 30}
          width={buretteWidth - 4}
          height={buretteHeight - 30}
          fill="rgba(56, 189, 248, 0.35)"
        />

        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tick) => {
          const yPos = buretteTopY + 20 + tick * 20;
          return (
            <g key={tick}>
              <line
                x1={buretteCenterX + buretteWidth / 2 - 8}
                y1={yPos}
                x2={buretteCenterX + buretteWidth / 2}
                y2={yPos}
                stroke="#0f172a"
                strokeWidth={1.5}
              />
              {tick % 2 === 0 && (
                <text
                  x={buretteCenterX + buretteWidth / 2 + 4}
                  y={yPos + 3.5}
                  fill="#475569"
                  fontSize={8.5}
                  fontFamily="monospace"
                >
                  {tick * 5}
                </text>
              )}
            </g>
          );
        })}

        <circle
          cx={buretteCenterX}
          cy={stopcockY}
          r={7}
          fill="#0284c7"
          stroke="#0f172a"
          strokeWidth={1.5}
        />
        <line
          x1={buretteCenterX - 14}
          y1={stopcockY}
          x2={buretteCenterX + 14}
          y2={stopcockY}
          stroke="#0284c7"
          strokeWidth={4.5}
          strokeLinecap="round"
        />

        <polygon
          points={`
            ${buretteCenterX - 5},${stopcockY + 7}
            ${buretteCenterX + 5},${stopcockY + 7}
            ${buretteCenterX + 1.5},${tipBottomY}
            ${buretteCenterX - 1.5},${tipBottomY}
          `}
          fill="#0284c7"
        />

        {showDroplets && (
          <g>
            <circle
              cx={buretteCenterX}
              cy={tipBottomY + 8}
              r={2.5}
              fill="#0284c7"
              className={animated ? 'animate-bounce' : ''}
            />
            <circle
              cx={buretteCenterX}
              cy={tipBottomY + 18}
              r={2}
              fill="#0284c7"
              className={animated ? 'animate-pulse' : ''}
            />
          </g>
        )}

        {showStirrer && (
          <g>
            <rect
              x={buretteCenterX - flaskBaseWidth / 2 - 10}
              y={stirrerTopY}
              width={flaskBaseWidth + 20}
              height={stirrerHeight}
              rx={3}
              fill="#e2e8f0"
              stroke="#64748b"
              strokeWidth={1.5}
            />
            <circle cx={buretteCenterX - 45} cy={stirrerTopY + 12} r={4} fill="#94a3b8" />
            <circle cx={buretteCenterX + 45} cy={stirrerTopY + 12} r={4} fill="#0284c7" />
          </g>
        )}

        <path
          d={`
            M ${buretteCenterX - flaskNeckWidth / 2} ${flaskTopY}
            L ${buretteCenterX - flaskNeckWidth / 2} ${flaskTopY + 28}
            L ${buretteCenterX - flaskBaseWidth / 2} ${flaskBottomY - 10}
            Q ${buretteCenterX - flaskBaseWidth / 2} ${flaskBottomY} ${buretteCenterX - flaskBaseWidth / 2 + 10} ${flaskBottomY}
            L ${buretteCenterX + flaskBaseWidth / 2 - 10} ${flaskBottomY}
            Q ${buretteCenterX + flaskBaseWidth / 2} ${flaskBottomY} ${buretteCenterX + flaskBaseWidth / 2} ${flaskBottomY - 10}
            L ${buretteCenterX + flaskNeckWidth / 2} ${flaskTopY + 28}
            L ${buretteCenterX + flaskNeckWidth / 2} ${flaskTopY}
            Z
          `}
          fill="none"
          stroke="#0284c7"
          strokeWidth={2.2}
        />

        <path
          d={`
            M ${buretteCenterX - flaskBaseWidth / 2 + 18} ${flaskBottomY - 55}
            L ${buretteCenterX - flaskBaseWidth / 2 + 2} ${flaskBottomY - 10}
            Q ${buretteCenterX - flaskBaseWidth / 2 + 2} ${flaskBottomY - 2} ${buretteCenterX - flaskBaseWidth / 2 + 10} ${flaskBottomY - 2}
            L ${buretteCenterX + flaskBaseWidth / 2 - 10} ${flaskBottomY - 2}
            Q ${buretteCenterX + flaskBaseWidth / 2 - 2} ${flaskBottomY - 2} ${buretteCenterX + flaskBaseWidth / 2 - 2} ${flaskBottomY - 10}
            L ${buretteCenterX + flaskBaseWidth / 2 - 18} ${flaskBottomY - 55}
            Z
          `}
          fill={flaskLiquidColor}
        />

        {showStirrer && (
          <ellipse
            cx={buretteCenterX}
            cy={flaskBottomY - 6}
            rx={14}
            ry={3.5}
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth={1}
          />
        )}

        {isCalloutsVisible && (
          <g>
            <text x={buretteCenterX + 60} y={buretteTopY + 25} fill="#c2410c" fontSize={13} fontWeight="bold">
              Burette
            </text>
            <line
              x1={buretteCenterX + 55}
              y1={buretteTopY + 22}
              x2={buretteCenterX + buretteWidth / 2 + 2}
              y2={buretteTopY + 22}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={buretteCenterX + 60} y={buretteTopY + 100} fill="#c2410c" fontSize={12} fontWeight="bold">
              Titrant ({titrant})
            </text>
            <line
              x1={buretteCenterX + 55}
              y1={buretteTopY + 96}
              x2={buretteCenterX + buretteWidth / 2 + 2}
              y2={buretteTopY + 96}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={buretteCenterX + 60} y={stopcockY + 4} fill="#c2410c" fontSize={12} fontWeight="bold">
              Stopcock Valve
            </text>
            <line
              x1={buretteCenterX + 55}
              y1={stopcockY}
              x2={buretteCenterX + 16}
              y2={stopcockY}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={buretteCenterX + 95} y={flaskTopY + 65} fill="#c2410c" fontSize={13} fontWeight="bold">
              Erlenmeyer Flask
            </text>
            <line
              x1={buretteCenterX + 90}
              y1={flaskTopY + 60}
              x2={buretteCenterX + flaskBaseWidth / 2 - 20}
              y2={flaskTopY + 60}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={buretteCenterX + 95} y={flaskBottomY - 15} fill="#c2410c" fontSize={12} fontWeight="bold">
              Analyte ({analyte})
            </text>
            <line
              x1={buretteCenterX + 90}
              y1={flaskBottomY - 20}
              x2={buretteCenterX + 35}
              y2={flaskBottomY - 20}
              stroke="#c2410c"
              strokeWidth={1.5}
            />
          </g>
        )}
      </svg>
    </div>
  );
};
