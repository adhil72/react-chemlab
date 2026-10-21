import React from 'react';
import { GasPistonProps } from './GasPiston.types';

export const GasPiston: React.FC<GasPistonProps> = ({
  pressureAtm = 2.0,
  volumeLiters = 4.0,
  temperatureKelvin = 298.15,
  moles = 1.0,
  showHeatSource = true,
  showPressureGauge = true,
  showParticles = true,
  showLabels = true,
  showCallouts,
  animated = true,
  width = '100%',
  height = 'auto',
  className = '',
  style
}) => {
  const isCalloutsVisible = showCallouts ?? showLabels;

  const svgWidth = 600;
  const svgHeight = 460;

  const cylinderX = 200;
  const cylinderY = 90;
  const cylinderWidth = 200;
  const cylinderHeight = 260;

  const minPistonY = cylinderY + 20;
  const maxPistonY = cylinderY + cylinderHeight - 60;
  const normalizedHeight = Math.max(0.1, Math.min(1.0, volumeLiters / 8.0));
  const pistonY = maxPistonY - normalizedHeight * (maxPistonY - minPistonY);

  const gaugeX = cylinderX - 65;
  const gaugeY = cylinderY + cylinderHeight - 40;

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      style={{ width, ...style }}
      role="img"
      aria-label="Gas Cylinder with Movable Piston"
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <defs>
          <radialGradient id="flame-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </radialGradient>
        </defs>

        <rect
          x={cylinderX}
          y={cylinderY}
          width={cylinderWidth}
          height={cylinderHeight}
          fill="rgba(248, 250, 252, 0.4)"
          stroke="#0284c7"
          strokeWidth={3}
          rx={4}
        />

        <rect
          x={cylinderX + 3}
          y={pistonY + 16}
          width={cylinderWidth - 6}
          height={cylinderY + cylinderHeight - (pistonY + 16) - 2}
          fill="rgba(56, 189, 248, 0.15)"
        />

        {showParticles && (
          <g>
            {[
              [230, pistonY + 30],
              [270, pistonY + 50],
              [330, pistonY + 25],
              [360, pistonY + 65],
              [240, pistonY + 85],
              [290, pistonY + 100],
              [340, pistonY + 110],
              [260, cylinderY + cylinderHeight - 25],
              [310, cylinderY + cylinderHeight - 35],
              [370, cylinderY + cylinderHeight - 20]
            ].map(([px, py], pIdx) => {
              if (py >= cylinderY + cylinderHeight - 8 || py <= pistonY + 16) return null;
              return (
                <circle
                  key={pIdx}
                  cx={px}
                  cy={py}
                  r={3.5}
                  fill="#0284c7"
                  className={animated ? 'animate-pulse' : ''}
                />
              );
            })}
          </g>
        )}

        <line
          x1={cylinderX + cylinderWidth / 2}
          y1={pistonY}
          x2={cylinderX + cylinderWidth / 2}
          y2={cylinderY - 40}
          stroke="#475569"
          strokeWidth={8}
          strokeLinecap="round"
        />

        <rect
          x={cylinderX + 2}
          y={pistonY}
          width={cylinderWidth - 4}
          height={16}
          fill="#334155"
          stroke="#0f172a"
          strokeWidth={2}
          rx={2}
        />

        <rect
          x={cylinderX + cylinderWidth / 2 - 25}
          y={cylinderY - 55}
          width={50}
          height={20}
          fill="#1e293b"
          stroke="#0f172a"
          strokeWidth={1.5}
          rx={2}
        />
        <text
          x={cylinderX + cylinderWidth / 2}
          y={cylinderY - 41}
          fill="#f8fafc"
          fontSize={10}
          fontWeight="bold"
          textAnchor="middle"
        >
          {pressureAtm.toFixed(1)} atm
        </text>

        {showPressureGauge && (
          <g>
            <line
              x1={cylinderX}
              y1={gaugeY}
              x2={gaugeX + 18}
              y2={gaugeY}
              stroke="#0f172a"
              strokeWidth={3}
            />
            <circle
              cx={gaugeX}
              cy={gaugeY}
              r={24}
              fill="#f8fafc"
              stroke="#0f172a"
              strokeWidth={2}
            />
            <line
              x1={gaugeX}
              y1={gaugeY}
              x2={gaugeX + 12}
              y2={gaugeY - 12}
              stroke="#ef4444"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <circle cx={gaugeX} cy={gaugeY} r={3} fill="#0f172a" />
            <text
              x={gaugeX}
              y={gaugeY + 14}
              fill="#0f172a"
              fontSize={8.5}
              fontWeight="bold"
              textAnchor="middle"
            >
              {pressureAtm.toFixed(1)} atm
            </text>
          </g>
        )}

        {showHeatSource && (
          <g>
            <path
              d={`
                M ${cylinderX + cylinderWidth / 2} ${cylinderY + cylinderHeight + 10}
                Q ${cylinderX + cylinderWidth / 2 - 20} ${cylinderY + cylinderHeight + 35} ${cylinderX + cylinderWidth / 2} ${cylinderY + cylinderHeight + 48}
                Q ${cylinderX + cylinderWidth / 2 + 20} ${cylinderY + cylinderHeight + 35} ${cylinderX + cylinderWidth / 2} ${cylinderY + cylinderHeight + 10}
              `}
              fill="url(#flame-grad)"
              className={animated ? 'animate-pulse' : ''}
            />
            <rect
              x={cylinderX + cylinderWidth / 2 - 12}
              y={cylinderY + cylinderHeight + 48}
              width={24}
              height={14}
              fill="#475569"
              rx={1}
            />
          </g>
        )}

        {isCalloutsVisible && (
          <g>
            <text x={cylinderX + cylinderWidth + 25} y={pistonY + 12} fill="#c2410c" fontSize={13} fontWeight="bold">
              Piston
            </text>
            <line
              x1={cylinderX + cylinderWidth + 20}
              y1={pistonY + 8}
              x2={cylinderX + cylinderWidth}
              y2={pistonY + 8}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={cylinderX + cylinderWidth + 25} y={pistonY + (cylinderY + cylinderHeight - pistonY) / 2} fill="#c2410c" fontSize={12} fontWeight="bold">
              Volume: {volumeLiters.toFixed(1)} L (n = {moles.toFixed(1)} mol)
            </text>

            <text x={gaugeX - 35} y={gaugeY - 30} fill="#c2410c" fontSize={12} fontWeight="bold" textAnchor="end">
              Pressure Gauge
            </text>
            <line
              x1={gaugeX - 30}
              y1={gaugeY - 26}
              x2={gaugeX}
              y2={gaugeY - 10}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={cylinderX + cylinderWidth / 2 + 35} y={cylinderY + cylinderHeight + 35} fill="#c2410c" fontSize={12} fontWeight="bold">
              Heat Source ({temperatureKelvin.toFixed(1)} K)
            </text>
            <line
              x1={cylinderX + cylinderWidth / 2 + 30}
              y1={cylinderY + cylinderHeight + 30}
              x2={cylinderX + cylinderWidth / 2 + 10}
              y2={cylinderY + cylinderHeight + 30}
              stroke="#c2410c"
              strokeWidth={1.5}
            />
          </g>
        )}
      </svg>
    </div>
  );
};
