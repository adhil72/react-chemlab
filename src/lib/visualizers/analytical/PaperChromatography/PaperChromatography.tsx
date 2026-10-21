import React from 'react';
import { PaperChromatographyProps } from './PaperChromatography.types';

const DEFAULT_SPOTS = [
  { name: 'Carotene', rf: 0.92, color: '#f59e0b' },
  { name: 'Xanthophyll', rf: 0.72, color: '#eab308' },
  { name: 'Chlorophyll a', rf: 0.48, color: '#10b981' },
  { name: 'Chlorophyll b', rf: 0.28, color: '#15803d' }
];

export const PaperChromatography: React.FC<PaperChromatographyProps> = ({
  spots = DEFAULT_SPOTS,
  solventName = 'Petroleum Ether / Acetone (9:1)',
  showLabels = true,
  showCallouts,
  showRfValues = true,
  width = '100%',
  height = 'auto',
  className = '',
  style
}) => {
  const isCalloutsVisible = showCallouts ?? showLabels;

  const svgWidth = 660;
  const svgHeight = 460;

  const chamberX = 140;
  const chamberY = 60;
  const chamberWidth = 340;
  const chamberHeight = 360;

  const paperWidth = 90;
  const paperHeight = 300;
  const paperX = chamberX + 40;
  const paperY = chamberY + 25;

  const originLineY = paperY + paperHeight - 35;
  const solventFrontY = paperY + 30;
  const travelDistance = originLineY - solventFrontY;

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      style={{ width, ...style }}
      role="img"
      aria-label="Paper Chromatography Chamber"
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <ellipse
          cx={chamberX + chamberWidth / 2}
          cy={chamberY}
          rx={chamberWidth / 2 + 10}
          ry={14}
          fill="#cbd5e1"
          stroke="#475569"
          strokeWidth={2}
        />
        <circle
          cx={chamberX + chamberWidth / 2}
          cy={chamberY - 14}
          r={7}
          fill="#475569"
        />

        <rect
          x={chamberX}
          y={chamberY}
          width={chamberWidth}
          height={chamberHeight}
          rx={12}
          fill="none"
          stroke="#0284c7"
          strokeWidth={2.5}
        />

        <rect
          x={chamberX + 2}
          y={chamberY + chamberHeight - 40}
          width={chamberWidth - 4}
          height={38}
          rx={10}
          fill="rgba(56, 189, 248, 0.45)"
        />

        <rect
          x={paperX}
          y={paperY}
          width={paperWidth}
          height={paperHeight}
          fill="#ffffff"
          stroke="#94a3b8"
          strokeWidth={1.5}
        />

        <line
          x1={paperX + 6}
          y1={originLineY}
          x2={paperX + paperWidth - 6}
          y2={originLineY}
          stroke="#64748b"
          strokeWidth={1.5}
          strokeDasharray="3 3"
        />

        <line
          x1={paperX + 6}
          y1={solventFrontY}
          x2={paperX + paperWidth - 6}
          y2={solventFrontY}
          stroke="#0284c7"
          strokeWidth={1.8}
        />

        {spots.map((spot, idx) => {
          const spotY = originLineY - travelDistance * spot.rf;
          const spotX = paperX + paperWidth / 2;

          return (
            <g key={idx}>
              <ellipse
                cx={spotX}
                cy={spotY}
                rx={14}
                ry={9}
                fill={spot.color}
                fillOpacity={0.85}
                stroke={spot.color}
                strokeWidth={1}
              />
              {showRfValues && (
                <text
                  x={paperX + paperWidth + 14}
                  y={spotY + 4}
                  fill="#0f172a"
                  fontSize={11.5}
                  fontWeight="bold"
                >
                  {spot.name} (Rf = {spot.rf.toFixed(2)})
                </text>
              )}
            </g>
          );
        })}

        <circle
          cx={paperX + paperWidth / 2}
          cy={originLineY}
          r={4}
          fill="#475569"
        />

        {isCalloutsVisible && (
          <g>
            <text x={40} y={solventFrontY + 4} fill="#c2410c" fontSize={12} fontWeight="bold">
              Solvent Front
            </text>
            <line
              x1={120}
              y1={solventFrontY}
              x2={paperX}
              y2={solventFrontY}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={60} y={originLineY + 4} fill="#c2410c" fontSize={12} fontWeight="bold">
              Origin Line
            </text>
            <line
              x1={125}
              y1={originLineY}
              x2={paperX}
              y2={originLineY}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={chamberX + chamberWidth + 20} y={chamberY + 40} fill="#c2410c" fontSize={12} fontWeight="bold">
              Chamber Lid
            </text>

            <text x={chamberX + chamberWidth + 20} y={chamberY + chamberHeight - 15} fill="#c2410c" fontSize={12} fontWeight="bold">
              Solvent: {solventName}
            </text>
            <line
              x1={chamberX + chamberWidth + 15}
              y1={chamberY + chamberHeight - 20}
              x2={chamberX + chamberWidth}
              y2={chamberY + chamberHeight - 20}
              stroke="#c2410c"
              strokeWidth={1.5}
            />
          </g>
        )}
      </svg>
    </div>
  );
};
