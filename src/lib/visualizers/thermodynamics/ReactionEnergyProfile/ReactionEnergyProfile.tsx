import React from 'react';
import { ReactionEnergyProfileProps } from './ReactionEnergyProfile.types';

export const ReactionEnergyProfile: React.FC<ReactionEnergyProfileProps> = ({
  reactionType = 'exothermic',
  reactantsLabel = 'A + B',
  productsLabel = 'C + D',
  activationEnergyKj = 75,
  deltaHKj = -45,
  showCatalyzedPath = true,
  catalyzedActivationEnergyKj = 40,
  showLabels = true,
  showCallouts,
  width = '100%',
  height = 'auto',
  className = '',
  style
}) => {
  const isCalloutsVisible = showCallouts ?? showLabels;
  const isExothermic = reactionType === 'exothermic';

  const svgWidth = 640;
  const svgHeight = 420;

  const originX = 100;
  const originY = 340;
  const graphWidth = 480;

  const reactantsY = isExothermic ? 230 : 280;
  const productsY = isExothermic ? 300 : 180;
  const peakY = 90;
  const catalyzedPeakY = peakY + 45;

  const reactantsXEnd = originX + 70;
  const peakX = originX + 220;
  const productsXStart = originX + 370;
  const endX = originX + graphWidth - 20;

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      style={{ width, ...style }}
      role="img"
      aria-label="Reaction Energy Profile Diagram"
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <defs>
          <marker
            id="axis-arrow-thermo"
            viewBox="0 0 10 10"
            refX="6"
            refY="3"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 3 L 0 6 z" fill="#0f172a" />
          </marker>

          <marker
            id="double-arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0284c7" />
          </marker>
        </defs>

        <line
          x1={originX}
          y1={originY}
          x2={originX}
          y2={50}
          stroke="#0f172a"
          strokeWidth={2}
          markerEnd="url(#axis-arrow-thermo)"
        />
        <text
          x={originX - 15}
          y={40}
          fill="#0f172a"
          fontSize={13}
          fontWeight="bold"
          textAnchor="middle"
        >
          Potential Energy (kJ/mol)
        </text>

        <line
          x1={originX}
          y1={originY}
          x2={originX + graphWidth}
          y2={originY}
          stroke="#0f172a"
          strokeWidth={2}
          markerEnd="url(#axis-arrow-thermo)"
        />
        <text
          x={originX + graphWidth / 2}
          y={originY + 35}
          fill="#0f172a"
          fontSize={13}
          fontWeight="bold"
          textAnchor="middle"
        >
          Reaction Coordinate (Progress)
        </text>

        <line
          x1={originX}
          y1={reactantsY}
          x2={endX}
          y2={reactantsY}
          stroke="#94a3b8"
          strokeWidth={1}
          strokeDasharray="4 4"
        />

        <line
          x1={productsXStart}
          y1={productsY}
          x2={endX}
          y2={productsY}
          stroke="#94a3b8"
          strokeWidth={1}
          strokeDasharray="4 4"
        />

        {showCatalyzedPath && (
          <path
            d={`
              M ${originX + 15} ${reactantsY}
              L ${reactantsXEnd} ${reactantsY}
              C ${reactantsXEnd + 50} ${reactantsY}, ${peakX - 60} ${catalyzedPeakY}, ${peakX} ${catalyzedPeakY}
              C ${peakX + 60} ${catalyzedPeakY}, ${productsXStart - 50} ${productsY}, ${productsXStart} ${productsY}
              L ${endX} ${productsY}
            `}
            fill="none"
            stroke="#10b981"
            strokeWidth={2.2}
            strokeDasharray="5 5"
          />
        )}

        <path
          d={`
            M ${originX + 15} ${reactantsY}
            L ${reactantsXEnd} ${reactantsY}
            C ${reactantsXEnd + 60} ${reactantsY}, ${peakX - 70} ${peakY}, ${peakX} ${peakY}
            C ${peakX + 70} ${peakY}, ${productsXStart - 60} ${productsY}, ${productsXStart} ${productsY}
            L ${endX} ${productsY}
          `}
          fill="none"
          stroke="#0284c7"
          strokeWidth={2.8}
        />

        <text
          x={originX + 45}
          y={reactantsY - 12}
          fill="#0f172a"
          fontSize={13}
          fontWeight="bold"
        >
          {reactantsLabel}
        </text>

        <text
          x={endX - 35}
          y={productsY - 12}
          fill="#0f172a"
          fontSize={13}
          fontWeight="bold"
          textAnchor="end"
        >
          {productsLabel}
        </text>

        <circle cx={peakX} cy={peakY} r={4} fill="#ef4444" />
        <text
          x={peakX}
          y={peakY - 14}
          fill="#ef4444"
          fontSize={12}
          fontWeight="bold"
          textAnchor="middle"
        >
          Transition State [‡]
        </text>

        <line
          x1={peakX}
          y1={peakY}
          x2={peakX}
          y2={reactantsY}
          stroke="#0284c7"
          strokeWidth={1.8}
        />
        <text
          x={peakX - 12}
          y={(peakY + reactantsY) / 2}
          fill="#0284c7"
          fontSize={12}
          fontWeight="bold"
          textAnchor="end"
        >
          Ea = +{activationEnergyKj} kJ
        </text>

        <line
          x1={endX - 25}
          y1={reactantsY}
          x2={endX - 25}
          y2={productsY}
          stroke="#c2410c"
          strokeWidth={2}
        />
        <text
          x={endX - 15}
          y={(reactantsY + productsY) / 2 + 4}
          fill="#c2410c"
          fontSize={12}
          fontWeight="bold"
        >
          ΔH = {deltaHKj > 0 ? `+${deltaHKj}` : deltaHKj} kJ
        </text>

        {isCalloutsVisible && showCatalyzedPath && (
          <g>
            <text x={peakX + 65} y={catalyzedPeakY - 8} fill="#059669" fontSize={11.5} fontWeight="bold">
              Catalyzed Path (Ea = +{catalyzedActivationEnergyKj} kJ)
            </text>
            <line
              x1={peakX + 60}
              y1={catalyzedPeakY - 12}
              x2={peakX + 25}
              y2={catalyzedPeakY}
              stroke="#059669"
              strokeWidth={1.5}
            />
          </g>
        )}
      </svg>
    </div>
  );
};
