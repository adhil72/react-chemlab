import React from 'react';
import { BohrModelProps } from './BohrModel.types';

export const BohrModel: React.FC<BohrModelProps> = ({
  elementSymbol = 'C',
  elementName = 'Carbon',
  protons = 6,
  neutrons = 6,
  electronShells = [2, 4],
  showLabels = true,
  showCallouts,
  showPhotonTransition = true,
  photonWavelengthNm = 656,
  animated = true,
  width = '100%',
  height = 'auto',
  className = '',
  style
}) => {
  const isCalloutsVisible = showCallouts ?? showLabels;

  const svgWidth = 600;
  const svgHeight = 440;
  const centerX = 300;
  const centerY = 220;

  const nucleusRadius = 32;
  const baseShellRadius = 60;
  const shellStep = 45;

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      style={{ width, ...style }}
      role="img"
      aria-label={`${elementName} Bohr Model`}
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <defs>
          <linearGradient id="nucleus-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>

          <marker
            id="photon-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#ef4444" />
          </marker>
        </defs>

        {electronShells.map((count, shellIdx) => {
          const r = baseShellRadius + shellIdx * shellStep;
          const shellLetters = ['K', 'L', 'M', 'N', 'O'];

          return (
            <g key={shellIdx}>
              <circle
                cx={centerX}
                cy={centerY}
                r={r}
                fill="none"
                stroke="#64748b"
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />

              {showLabels && (
                <text
                  x={centerX + r * 0.72}
                  y={centerY - r * 0.72}
                  fill="#475569"
                  fontSize={10.5}
                  fontFamily="monospace"
                >
                  n={shellIdx + 1} ({shellLetters[shellIdx] ?? ''})
                </text>
              )}

              {Array.from({ length: count }).map((_, electronIdx) => {
                const angle = (electronIdx / count) * 2 * Math.PI - Math.PI / 2;
                const ex = centerX + r * Math.cos(angle);
                const ey = centerY + r * Math.sin(angle);

                return (
                  <circle
                    key={electronIdx}
                    cx={ex}
                    cy={ey}
                    r={5.5}
                    fill="#38bdf8"
                    stroke="#0284c7"
                    strokeWidth={1.5}
                    className={animated ? 'animate-pulse' : ''}
                  />
                );
              })}
            </g>
          );
        })}

        <circle
          cx={centerX}
          cy={centerY}
          r={nucleusRadius}
          fill="url(#nucleus-grad)"
          stroke="#0f172a"
          strokeWidth={2}
        />
        <text
          x={centerX}
          y={centerY - 5}
          fill="#ffffff"
          fontSize={15}
          fontWeight="bold"
          textAnchor="middle"
        >
          {elementSymbol}
        </text>
        <text
          x={centerX}
          y={centerY + 10}
          fill="#fecdd3"
          fontSize={9.5}
          fontWeight="500"
          fontFamily="monospace"
          textAnchor="middle"
        >
          {protons}p⁺, {neutrons}n⁰
        </text>

        {showPhotonTransition && (
          <g>
            <path
              d={`
                M ${centerX + baseShellRadius + shellStep} ${centerY}
                Q ${centerX + baseShellRadius + shellStep / 2} ${centerY - 18} ${centerX + baseShellRadius} ${centerY}
              `}
              fill="none"
              stroke="#ef4444"
              strokeWidth={2}
              markerEnd="url(#photon-arrow)"
            />
            <path
              d={`
                M ${centerX + baseShellRadius + shellStep + 10} ${centerY - 10}
                Q ${centerX + baseShellRadius + shellStep + 25} ${centerY - 25} ${centerX + baseShellRadius + shellStep + 40} ${centerY - 10}
                T ${centerX + baseShellRadius + shellStep + 70} ${centerY - 10}
              `}
              fill="none"
              stroke="#eab308"
              strokeWidth={2}
              markerEnd="url(#photon-arrow)"
            />
            <text
              x={centerX + baseShellRadius + shellStep + 75}
              y={centerY - 14}
              fill="#ca8a04"
              fontSize={11}
              fontWeight="bold"
            >
              hν (λ={photonWavelengthNm}nm)
            </text>
          </g>
        )}

        {isCalloutsVisible && (
          <g>
            <text x={centerX - 190} y={centerY - nucleusRadius - 30} fill="#c2410c" fontSize={13} fontWeight="bold">
              Nucleus
            </text>
            <line
              x1={centerX - 130}
              y1={centerY - nucleusRadius - 35}
              x2={centerX - 20}
              y2={centerY - 10}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={centerX - 240} y={centerY + baseShellRadius + shellStep - 15} fill="#c2410c" fontSize={12} fontWeight="bold">
              Valence Shell (n={electronShells.length})
            </text>
            <line
              x1={centerX - 100}
              y1={centerY + baseShellRadius + shellStep - 20}
              x2={centerX - (baseShellRadius + (electronShells.length - 1) * shellStep)}
              y2={centerY}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={centerX} y={395} fill="#0f172a" fontSize={13} fontWeight="bold" textAnchor="middle">
              {elementName} (Z = {protons}) — Configuration: {electronShells.join(', ')}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
