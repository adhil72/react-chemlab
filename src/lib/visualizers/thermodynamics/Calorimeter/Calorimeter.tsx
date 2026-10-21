import React from 'react';
import { CalorimeterProps } from './Calorimeter.types';

export const Calorimeter: React.FC<CalorimeterProps> = ({
  initialTemperatureC = 21.0,
  finalTemperatureC = 28.5,
  waterMassGrams = 100.0,
  soluteName = '5.0 g NaOH(s)',
  showLabels = true,
  showCallouts,
  showHeatExchange = true,
  width = '100%',
  height = 'auto',
  className = '',
  style
}) => {
  const isCalloutsVisible = showCallouts ?? showLabels;
  const deltaT = finalTemperatureC - initialTemperatureC;
  const heatJoules = waterMassGrams * 4.184 * deltaT;

  const svgWidth = 600;
  const svgHeight = 460;

  const cupCenterX = 300;
  const cupWidth = 210;
  const cupHeight = 220;
  const cupTopY = 160;

  const thermometerX = 260;
  const stirrerX = 345;

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      style={{ width, ...style }}
      role="img"
      aria-label="Calorimeter Apparatus"
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <path
          d={`
            M ${cupCenterX - cupWidth / 2 - 12} ${cupTopY}
            L ${cupCenterX - cupWidth / 2 - 8} ${cupTopY + cupHeight}
            Q ${cupCenterX - cupWidth / 2 - 8} ${cupTopY + cupHeight + 16} ${cupCenterX - cupWidth / 2 + 10} ${cupTopY + cupHeight + 16}
            L ${cupCenterX + cupWidth / 2 - 10} ${cupTopY + cupHeight + 16}
            Q ${cupCenterX + cupWidth / 2 + 8} ${cupTopY + cupHeight + 16} ${cupCenterX + cupWidth / 2 + 8} ${cupTopY + cupHeight}
            L ${cupCenterX + cupWidth / 2 + 12} ${cupTopY}
          `}
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth={2}
        />

        <path
          d={`
            M ${cupCenterX - cupWidth / 2} ${cupTopY}
            L ${cupCenterX - cupWidth / 2 + 3} ${cupTopY + cupHeight - 4}
            Q ${cupCenterX - cupWidth / 2 + 3} ${cupTopY + cupHeight + 8} ${cupCenterX - cupWidth / 2 + 14} ${cupTopY + cupHeight + 8}
            L ${cupCenterX + cupWidth / 2 - 14} ${cupTopY + cupHeight + 8}
            Q ${cupCenterX + cupWidth / 2 - 3} ${cupTopY + cupHeight + 8} ${cupCenterX + cupWidth / 2 - 3} ${cupTopY + cupHeight - 4}
            L ${cupCenterX + cupWidth / 2} ${cupTopY}
          `}
          fill="#f8fafc"
          stroke="#cbd5e1"
          strokeWidth={2}
        />

        <path
          d={`
            M ${cupCenterX - cupWidth / 2 + 6} ${cupTopY + 50}
            L ${cupCenterX - cupWidth / 2 + 7} ${cupTopY + cupHeight - 10}
            Q ${cupCenterX - cupWidth / 2 + 7} ${cupTopY + cupHeight} ${cupCenterX - cupWidth / 2 + 18} ${cupTopY + cupHeight}
            L ${cupCenterX + cupWidth / 2 - 18} ${cupTopY + cupHeight}
            Q ${cupCenterX + cupWidth / 2 - 7} ${cupTopY + cupHeight} ${cupCenterX + cupWidth / 2 - 7} ${cupTopY + cupHeight - 10}
            L ${cupCenterX + cupWidth / 2 - 6} ${cupTopY + 50}
            Z
          `}
          fill="rgba(56, 189, 248, 0.4)"
        />

        <circle
          cx={cupCenterX}
          cy={cupTopY + cupHeight - 35}
          r={18}
          fill="#eab308"
          stroke="#ca8a04"
          strokeWidth={1.5}
        />
        <text
          x={cupCenterX}
          y={cupTopY + cupHeight - 32}
          fill="#0f172a"
          fontSize={9}
          fontWeight="bold"
          textAnchor="middle"
        >
          Sample
        </text>

        <rect
          x={cupCenterX - cupWidth / 2 - 20}
          y={cupTopY - 14}
          width={cupWidth + 40}
          height={16}
          rx={4}
          fill="#e2e8f0"
          stroke="#64748b"
          strokeWidth={2}
        />

        <g>
          <rect
            x={thermometerX - 4}
            y={50}
            width={8}
            height={cupTopY + 120}
            rx={4}
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth={1.5}
          />
          <circle cx={thermometerX} cy={cupTopY + 120} r={8} fill="#ef4444" stroke="#0f172a" strokeWidth={1} />
          <line
            x1={thermometerX}
            y1={cupTopY + 120}
            x2={thermometerX}
            y2={95}
            stroke="#ef4444"
            strokeWidth={3}
          />
        </g>

        <g>
          <path
            d={`
              M ${stirrerX} ${40}
              L ${stirrerX} ${cupTopY + cupHeight - 60}
              C ${stirrerX - 25} ${cupTopY + cupHeight - 40}, ${stirrerX + 25} ${cupTopY + cupHeight - 40}, ${stirrerX} ${cupTopY + cupHeight - 20}
            `}
            fill="none"
            stroke="#475569"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx={stirrerX} cy={40} r={6} fill="#475569" />
        </g>

        {showHeatExchange && (
          <g>
            <rect
              x={cupCenterX - 140}
              y={cupTopY + cupHeight + 35}
              width={280}
              height={38}
              rx={6}
              fill="#0f172a"
              stroke="#334155"
              strokeWidth={1.5}
            />
            <text
              x={cupCenterX}
              y={cupTopY + cupHeight + 58}
              fill="#38bdf8"
              fontSize={12}
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              q = m·c·ΔT = {heatJoules > 0 ? `+${(heatJoules / 1000).toFixed(2)}` : (heatJoules / 1000).toFixed(2)} kJ
            </text>
          </g>
        )}

        {isCalloutsVisible && (
          <g>
            <text x={thermometerX - 180} y={75} fill="#c2410c" fontSize={12} fontWeight="bold">
              Thermometer ({finalTemperatureC.toFixed(1)}°C)
            </text>
            <line
              x1={thermometerX - 35}
              y1={72}
              x2={thermometerX - 6}
              y2={72}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={stirrerX + 25} y={60} fill="#c2410c" fontSize={12} fontWeight="bold">
              Stirrer
            </text>
            <line
              x1={stirrerX + 5}
              y1={56}
              x2={stirrerX + 20}
              y2={56}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={cupCenterX + cupWidth / 2 + 25} y={cupTopY - 5} fill="#c2410c" fontSize={12} fontWeight="bold">
              Insulated Cover
            </text>

            <text x={cupCenterX + cupWidth / 2 + 25} y={cupTopY + 110} fill="#c2410c" fontSize={12} fontWeight="bold">
              Styrofoam Cups
            </text>
            <line
              x1={cupCenterX + cupWidth / 2 + 10}
              y1={cupTopY + 106}
              x2={cupCenterX + cupWidth / 2 + 20}
              y2={cupTopY + 106}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={50} y={cupTopY + 180} fill="#c2410c" fontSize={12} fontWeight="bold">
              Solute: {soluteName}
            </text>
            <line
              x1={175}
              y1={cupTopY + 176}
              x2={cupCenterX - 20}
              y2={cupTopY + cupHeight - 35}
              stroke="#c2410c"
              strokeWidth={1.5}
            />
          </g>
        )}
      </svg>
    </div>
  );
};
