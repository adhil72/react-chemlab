import React from 'react';
import { PhaseDiagramProps } from './PhaseDiagram.types';

export const PhaseDiagram: React.FC<PhaseDiagramProps> = ({
  substance = 'water',
  substanceName = 'Water (H₂O)',
  showLabels = true,
  showCallouts,
  showCriticalPoints = true,
  width = '100%',
  height = 'auto',
  className = '',
  style
}) => {
  const isCalloutsVisible = showCallouts ?? showLabels;
  const isWater = substance === 'water';

  const svgWidth = 640;
  const svgHeight = 440;

  const originX = 100;
  const originY = 360;
  const graphWidth = 480;
  const graphHeight = 300;

  const tripleX = originX + 160;
  const tripleY = originY - 120;

  const fusionEndX = isWater ? tripleX - 25 : tripleX + 70;
  const fusionEndY = originY - graphHeight + 40;

  const criticalX = tripleX + 220;
  const criticalY = tripleY - 110;

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      style={{ width, ...style }}
      role="img"
      aria-label={`Phase Diagram for ${substanceName}`}
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <defs>
          <marker
            id="axis-arrow-phase"
            viewBox="0 0 10 10"
            refX="6"
            refY="3"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 3 L 0 6 z" fill="#0f172a" />
          </marker>
        </defs>

        <path
          d={`
            M ${originX} ${originY}
            Q ${originX + 80} ${originY - 40} ${tripleX} ${tripleY}
            Q ${tripleX + (fusionEndX - tripleX) * 0.4} ${(tripleY + fusionEndY) / 2} ${fusionEndX} ${fusionEndY}
            L ${originX} ${fusionEndY}
            Z
          `}
          fill="rgba(224, 231, 255, 0.45)"
        />

        <path
          d={`
            M ${tripleX} ${tripleY}
            Q ${tripleX + (fusionEndX - tripleX) * 0.4} ${(tripleY + fusionEndY) / 2} ${fusionEndX} ${fusionEndY}
            L ${criticalX} ${fusionEndY}
            L ${criticalX} ${criticalY}
            Q ${tripleX + 110} ${tripleY - 40} ${tripleX} ${tripleY}
            Z
          `}
          fill="rgba(56, 189, 248, 0.35)"
        />

        <path
          d={`
            M ${originX} ${originY}
            Q ${originX + 80} ${originY - 40} ${tripleX} ${tripleY}
            Q ${tripleX + 110} ${tripleY - 40} ${criticalX} ${criticalY}
            L ${originX + graphWidth} ${criticalY}
            L ${originX + graphWidth} ${originY}
            Z
          `}
          fill="rgba(254, 240, 138, 0.3)"
        />

        <line
          x1={originX}
          y1={originY}
          x2={originX}
          y2={50}
          stroke="#0f172a"
          strokeWidth={2}
          markerEnd="url(#axis-arrow-phase)"
        />
        <text
          x={originX - 15}
          y={40}
          fill="#0f172a"
          fontSize={13}
          fontWeight="bold"
          textAnchor="middle"
        >
          Pressure (P, atm)
        </text>

        <line
          x1={originX}
          y1={originY}
          x2={originX + graphWidth}
          y2={originY}
          stroke="#0f172a"
          strokeWidth={2}
          markerEnd="url(#axis-arrow-phase)"
        />
        <text
          x={originX + graphWidth / 2}
          y={originY + 35}
          fill="#0f172a"
          fontSize={13}
          fontWeight="bold"
          textAnchor="middle"
        >
          Temperature (T, °C)
        </text>

        <path
          d={`
            M ${originX} ${originY}
            Q ${originX + 80} ${originY - 40} ${tripleX} ${tripleY}
          `}
          fill="none"
          stroke="#0284c7"
          strokeWidth={2.5}
        />

        <path
          d={`
            M ${tripleX} ${tripleY}
            Q ${tripleX + (fusionEndX - tripleX) * 0.4} ${(tripleY + fusionEndY) / 2} ${fusionEndX} ${fusionEndY}
          `}
          fill="none"
          stroke="#0284c7"
          strokeWidth={2.5}
        />

        <path
          d={`
            M ${tripleX} ${tripleY}
            Q ${tripleX + 110} ${tripleY - 40} ${criticalX} ${criticalY}
          `}
          fill="none"
          stroke="#0284c7"
          strokeWidth={2.5}
        />

        <text x={originX + 50} y={tripleY - 40} fill="#1e40af" fontSize={16} fontWeight="bold">
          SOLID
        </text>
        <text x={tripleX + 45} y={fusionEndY + 60} fill="#0369a1" fontSize={16} fontWeight="bold">
          LIQUID
        </text>
        <text x={tripleX + 130} y={tripleY + 45} fill="#a16207" fontSize={16} fontWeight="bold">
          GAS
        </text>

        {showCriticalPoints && (
          <g>
            <circle cx={tripleX} cy={tripleY} r={5} fill="#ef4444" stroke="#0f172a" strokeWidth={1.5} />
            <text x={tripleX + 12} y={tripleY + 4} fill="#ef4444" fontSize={12} fontWeight="bold">
              Triple Point
            </text>

            <circle cx={criticalX} cy={criticalY} r={5} fill="#ef4444" stroke="#0f172a" strokeWidth={1.5} />
            <text x={criticalX + 12} y={criticalY + 4} fill="#ef4444" fontSize={12} fontWeight="bold">
              Critical Point
            </text>
          </g>
        )}

        {isCalloutsVisible && (
          <g>
            <text x={originX + 70} y={tripleY + 45} fill="#c2410c" fontSize={11} fontWeight="bold">
              Sublimation Curve
            </text>
            <text x={tripleX - 95} y={fusionEndY + 40} fill="#c2410c" fontSize={11} fontWeight="bold">
              Melting / Fusion
            </text>
            <text x={tripleX + 65} y={tripleY - 55} fill="#c2410c" fontSize={11} fontWeight="bold">
              Vaporization Curve
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
