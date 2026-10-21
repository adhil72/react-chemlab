import React from 'react';
import { SpectrophotometerProps } from './Spectrophotometer.types';

export const Spectrophotometer: React.FC<SpectrophotometerProps> = ({
  wavelengthNm = 520,
  absorbance = 0.435,
  transmittancePercent = 36.7,
  sampleColor = 'rgba(239, 68, 68, 0.75)',
  solutionLabel = 'KMnO₄ Solution',
  pathLengthCm = 1.0,
  showLabels = true,
  showCallouts,
  showRays = true,
  width = '100%',
  height = 'auto',
  className = '',
  style
}) => {
  const isCalloutsVisible = showCallouts ?? showLabels;

  const svgWidth = 740;
  const svgHeight = 360;
  const beamY = 160;

  const lampX = 40;
  const lensX = 140;
  const prismX = 220;
  const slitX = 330;
  const cuvetteX = 420;
  const cuvetteWidth = 44;
  const cuvetteHeight = 110;
  const detectorX = 540;
  const meterX = 640;

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      style={{ width, ...style }}
      role="img"
      aria-label="Spectrophotometer Optical System"
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <circle cx={lampX + 20} cy={beamY} r={18} fill="#fef08a" stroke="#ca8a04" strokeWidth={2} />
        <line x1={lampX + 20} y1={beamY - 26} x2={lampX + 20} y2={beamY - 32} stroke="#ca8a04" strokeWidth={2} />
        <line x1={lampX + 20} y1={beamY + 26} x2={lampX + 20} y2={beamY + 32} stroke="#ca8a04" strokeWidth={2} />
        <line x1={lampX - 6} y1={beamY} x2={lampX - 12} y2={beamY} stroke="#ca8a04" strokeWidth={2} />

        {showRays && (
          <g>
            <polygon
              points={`
                ${lampX + 38},${beamY - 6}
                ${lensX},${beamY - 14}
                ${lensX},${beamY + 14}
                ${lampX + 38},${beamY + 6}
              `}
              fill="#fef08a"
              fillOpacity={0.4}
            />
            <rect
              x={lensX + 10}
              y={beamY - 12}
              width={prismX - lensX - 10}
              height={24}
              fill="#ffffff"
              fillOpacity={0.5}
            />
          </g>
        )}

        <path
          d={`
            M ${lensX} ${beamY - 28}
            Q ${lensX + 12} ${beamY} ${lensX} ${beamY + 28}
            Q ${lensX - 12} ${beamY} ${lensX} ${beamY - 28}
          `}
          fill="#38bdf8"
          fillOpacity={0.65}
          stroke="#0284c7"
          strokeWidth={1.5}
        />

        <polygon
          points={`
            ${prismX},${beamY - 36}
            ${prismX + 50},${beamY + 34}
            ${prismX - 30},${beamY + 34}
          `}
          fill="rgba(224, 231, 255, 0.7)"
          stroke="#6366f1"
          strokeWidth={2}
        />

        {showRays && (
          <g>
            <line x1={prismX + 25} y1={beamY - 5} x2={slitX} y2={beamY - 18} stroke="#ef4444" strokeWidth={2.5} />
            <line x1={prismX + 25} y1={beamY - 5} x2={slitX} y2={beamY} stroke="#22c55e" strokeWidth={2.5} />
            <line x1={prismX + 25} y1={beamY - 5} x2={slitX} y2={beamY + 18} stroke="#3b82f6" strokeWidth={2.5} />

            <rect
              x={slitX}
              y={beamY - 4}
              width={cuvetteX - slitX}
              height={8}
              fill="#22c55e"
              fillOpacity={0.85}
            />

            <rect
              x={cuvetteX + cuvetteWidth}
              y={beamY - 3}
              width={detectorX - (cuvetteX + cuvetteWidth)}
              height={6}
              fill="#22c55e"
              fillOpacity={0.4}
            />
          </g>
        )}

        <rect x={slitX - 3} y={beamY - 45} width={6} height={36} fill="#0f172a" rx={1} />
        <rect x={slitX - 3} y={beamY + 9} width={6} height={36} fill="#0f172a" rx={1} />

        <rect
          x={cuvetteX}
          y={beamY - cuvetteHeight / 2}
          width={cuvetteWidth}
          height={cuvetteHeight}
          rx={2}
          fill="#f8fafc"
          fillOpacity={0.5}
          stroke="#0284c7"
          strokeWidth={2}
        />
        <rect
          x={cuvetteX + 2}
          y={beamY - cuvetteHeight / 2 + 10}
          width={cuvetteWidth - 4}
          height={cuvetteHeight - 12}
          fill={sampleColor}
        />

        <rect
          x={detectorX}
          y={beamY - 32}
          width={28}
          height={64}
          rx={3}
          fill="#0f172a"
          stroke="#334155"
          strokeWidth={1.5}
        />
        <rect
          x={detectorX + 2}
          y={beamY - 26}
          width={4}
          height={52}
          fill="#38bdf8"
        />

        <path
          d={`
            M ${detectorX + 28} ${beamY}
            L ${meterX - 25} ${beamY}
          `}
          fill="none"
          stroke="#0f172a"
          strokeWidth={2}
          strokeDasharray="4 4"
        />

        <g>
          <rect
            x={meterX - 25}
            y={beamY - 45}
            width={105}
            height={90}
            rx={4}
            fill="#0284c7"
            stroke="#0f172a"
            strokeWidth={2}
          />
          <rect
            x={meterX - 17}
            y={beamY - 37}
            width={89}
            height={74}
            rx={2}
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth={1.5}
          />

          <text
            x={meterX + 27}
            y={beamY - 20}
            fill="#64748b"
            fontSize={9.5}
            fontWeight="bold"
            textAnchor="middle"
          >
            ABSORBANCE (A)
          </text>
          <text
            x={meterX + 27}
            y={beamY - 2}
            fill="#0f172a"
            fontSize={15}
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
          >
            {absorbance.toFixed(3)}
          </text>

          <text
            x={meterX + 27}
            y={beamY + 16}
            fill="#64748b"
            fontSize={9.5}
            fontWeight="bold"
            textAnchor="middle"
          >
            % TRANSMITTANCE
          </text>
          <text
            x={meterX + 27}
            y={beamY + 31}
            fill="#0284c7"
            fontSize={13}
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
          >
            {transmittancePercent.toFixed(1)}%
          </text>
        </g>

        {isCalloutsVisible && (
          <g>
            <text x={lampX - 15} y={beamY + 55} fill="#c2410c" fontSize={11.5} fontWeight="bold">
              Light Source
            </text>
            <text x={lensX - 18} y={beamY + 70} fill="#c2410c" fontSize={11.5} fontWeight="bold">
              Collimator
            </text>
            <text x={prismX - 15} y={beamY + 60} fill="#c2410c" fontSize={12} fontWeight="bold">
              Prism
            </text>
            <text x={slitX - 25} y={beamY + 65} fill="#c2410c" fontSize={12} fontWeight="bold">
              λ = {wavelengthNm} nm
            </text>
            <text x={cuvetteX - 25} y={beamY + 80} fill="#c2410c" fontSize={12} fontWeight="bold">
              Cuvette: {solutionLabel} (b={pathLengthCm}cm)
            </text>
            <text x={detectorX - 10} y={beamY + 55} fill="#c2410c" fontSize={12} fontWeight="bold">
              Detector
            </text>
            <text x={meterX - 10} y={beamY + 65} fill="#c2410c" fontSize={12} fontWeight="bold">
              Digital Display
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
