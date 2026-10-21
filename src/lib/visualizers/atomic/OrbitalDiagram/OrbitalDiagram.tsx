import React from 'react';
import { OrbitalDiagramProps, SubshellConfig } from './OrbitalDiagram.types';

const DEFAULT_SUBSHELLS: SubshellConfig[] = [
  { label: '1s', boxes: 1, electrons: [2] },
  { label: '2s', boxes: 1, electrons: [2] },
  { label: '2p', boxes: 3, electrons: [2, 1, 1] }
];

export const OrbitalDiagram: React.FC<OrbitalDiagramProps> = ({
  elementSymbol = 'O',
  elementName = 'Oxygen',
  atomicNumber = 8,
  subshells = DEFAULT_SUBSHELLS,
  showEnergyAxis = true,
  showLabels = true,
  width = '100%',
  height = 'auto',
  className = '',
  style
}) => {
  const svgWidth = 600;
  const svgHeight = 320;

  const boxSize = 36;
  const startX = 120;
  const baseY = 240;

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      style={{ width, ...style }}
      role="img"
      aria-label={`${elementName} Orbital Diagram`}
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <defs>
          <marker
            id="energy-arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="3"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 3 L 0 6 z" fill="#0f172a" />
          </marker>

          <marker
            id="spin-arrow"
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

        {showEnergyAxis && (
          <g>
            <line
              x1={60}
              y1={baseY + 20}
              x2={60}
              y2={50}
              stroke="#0f172a"
              strokeWidth={2}
              markerEnd="url(#energy-arrow)"
            />
            <text
              x={60}
              y={38}
              fill="#0f172a"
              fontSize={12}
              fontWeight="bold"
              textAnchor="middle"
            >
              Energy (E)
            </text>
          </g>
        )}

        {showLabels && (
          <text
            x={startX}
            y={40}
            fill="#0f172a"
            fontSize={15}
            fontWeight="bold"
          >
            {elementName} ({elementSymbol}, Z = {atomicNumber}) — Orbital Diagram
          </text>
        )}

        {subshells.map((subshell, subIdx) => {
          let currentOffset = startX;
          for (let i = 0; i < subIdx; i++) {
            currentOffset += (subshells[i]?.boxes ?? 1) * boxSize + 40;
          }
          const subshellX = currentOffset;
          const subshellY = baseY - subIdx * 50;

          return (
            <g key={subIdx}>
              <text
                x={subshellX + (subshell.boxes * boxSize) / 2}
                y={subshellY + boxSize + 18}
                fill="#0f172a"
                fontSize={13}
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {subshell.label}
              </text>

              {Array.from({ length: subshell.boxes }).map((_, boxIdx) => {
                const bx = subshellX + boxIdx * boxSize;
                const eCount = subshell.electrons[boxIdx] ?? 0;

                return (
                  <g key={boxIdx}>
                    <rect
                      x={bx}
                      y={subshellY}
                      width={boxSize}
                      height={boxSize}
                      fill="#f8fafc"
                      stroke="#0f172a"
                      strokeWidth={1.8}
                    />

                    {eCount >= 1 && (
                      <g>
                        <line
                          x1={bx + boxSize * 0.35}
                          y1={subshellY + boxSize - 6}
                          x2={bx + boxSize * 0.35}
                          y2={subshellY + 8}
                          stroke="#0284c7"
                          strokeWidth={2.2}
                          markerEnd="url(#spin-arrow)"
                        />
                      </g>
                    )}

                    {eCount >= 2 && (
                      <g>
                        <line
                          x1={bx + boxSize * 0.65}
                          y1={subshellY + 6}
                          x2={bx + boxSize * 0.65}
                          y2={subshellY + boxSize - 8}
                          stroke="#ef4444"
                          strokeWidth={2.2}
                          markerEnd="url(#spin-arrow)"
                        />
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
