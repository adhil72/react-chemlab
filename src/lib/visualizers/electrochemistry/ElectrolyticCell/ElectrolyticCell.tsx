import React from 'react';
import { ElectrolyticCellProps } from './ElectrolyticCell.types';
import { Beaker } from '@/lib/core/primitives/Beaker';
import { Liquid } from '@/lib/core/primitives/Liquid';

export const ElectrolyticCell: React.FC<ElectrolyticCellProps> = ({
  mode = 'water-electrolysis',
  voltage = 6.0,
  electrolyte = 'Dilute H₂SO₄(aq)',
  showLabels = true,
  showCallouts,
  showBubbles = true,
  showBattery = true,
  animated = true,
  width = '100%',
  height = 'auto',
  className = '',
  style
}) => {
  const isCalloutsVisible = showCallouts ?? showLabels;
  const isWaterElectrolysis = mode === 'water-electrolysis';

  const svgWidth = 720;
  const svgHeight = 440;

  const beakerX = 180;
  const beakerY = 170;
  const beakerWidth = 360;
  const beakerHeight = 220;

  const leftElectrodeX = 265;
  const rightElectrodeX = 415;
  const electrodeWidth = 24;
  const electrodeY = 265;
  const electrodeHeight = 105;

  const batteryCenterX = 360;
  const batteryY = 40;
  const batteryWidth = 110;
  const batteryHeight = 44;

  const leftWirePath = `
    M ${leftElectrodeX + electrodeWidth / 2} ${electrodeY}
    L ${leftElectrodeX + electrodeWidth / 2} ${batteryY + batteryHeight / 2}
    L ${batteryCenterX - batteryWidth / 2} ${batteryY + batteryHeight / 2}
  `;

  const rightWirePath = `
    M ${batteryCenterX + batteryWidth / 2} ${batteryY + batteryHeight / 2}
    L ${rightElectrodeX + electrodeWidth / 2} ${batteryY + batteryHeight / 2}
    L ${rightElectrodeX + electrodeWidth / 2} ${electrodeY}
  `;

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      style={{ width, ...style }}
      role="img"
      aria-label="Electrolytic Cell Diagram"
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <defs>
          <marker
            id="callout-arrow-elec"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#c2410c" />
          </marker>
        </defs>

        <path
          d={leftWirePath}
          fill="none"
          stroke="#0f172a"
          strokeWidth={2.4}
          strokeLinecap="round"
        />
        <path
          d={rightWirePath}
          fill="none"
          stroke="#0f172a"
          strokeWidth={2.4}
          strokeLinecap="round"
        />

        {showBattery && (
          <g>
            <rect
              x={batteryCenterX - batteryWidth / 2}
              y={batteryY}
              width={batteryWidth}
              height={batteryHeight}
              rx={4}
              fill="#0f172a"
              stroke="#334155"
              strokeWidth={2}
            />
            <rect
              x={batteryCenterX - batteryWidth / 2 + 10}
              y={batteryY + 8}
              width={batteryWidth - 20}
              height={batteryHeight - 16}
              rx={2}
              fill="#1e293b"
            />
            <text
              x={batteryCenterX}
              y={batteryY + batteryHeight / 2 + 1}
              fill="#38bdf8"
              fontSize={14}
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
              dominantBaseline="central"
            >
              DC {voltage.toFixed(1)} V
            </text>
            <text
              x={batteryCenterX - batteryWidth / 2 + 18}
              y={batteryY - 8}
              fill="#ef4444"
              fontSize={15}
              fontWeight="bold"
            >
              +
            </text>
            <text
              x={batteryCenterX + batteryWidth / 2 - 25}
              y={batteryY - 8}
              fill="#38bdf8"
              fontSize={17}
              fontWeight="bold"
            >
              −
            </text>
          </g>
        )}

        <Liquid
          x={beakerX}
          y={beakerY}
          width={beakerWidth}
          height={beakerHeight}
          fill={isWaterElectrolysis ? 'rgba(56, 189, 248, 0.45)' : 'rgba(14, 165, 233, 0.6)'}
          fillOpacity={0.8}
          levelRatio={0.78}
        />

        <Beaker
          x={beakerX}
          y={beakerY}
          width={beakerWidth}
          height={beakerHeight}
          stroke="#0284c7"
          strokeWidth={2.5}
        />

        {isWaterElectrolysis && (
          <g>
            <path
              d={`
                M ${leftElectrodeX - 8} ${beakerY + 50}
                L ${leftElectrodeX - 8} ${beakerY + 195}
                L ${leftElectrodeX + electrodeWidth + 8} ${beakerY + 195}
                L ${leftElectrodeX + electrodeWidth + 8} ${beakerY + 50}
                Q ${leftElectrodeX + electrodeWidth / 2} ${beakerY + 38} ${leftElectrodeX - 8} ${beakerY + 50}
              `}
              fill="#ffffff"
              fillOpacity={0.4}
              stroke="#64748b"
              strokeWidth={2}
            />
            <rect
              x={leftElectrodeX - 6}
              y={beakerY + 45}
              width={electrodeWidth + 12}
              height={45}
              fill="#f8fafc"
              fillOpacity={0.9}
            />
            <text
              x={leftElectrodeX + electrodeWidth / 2}
              y={beakerY + 72}
              fill="#0f172a"
              fontSize={13}
              fontWeight="bold"
              textAnchor="middle"
            >
              O₂ (1 vol)
            </text>

            <path
              d={`
                M ${rightElectrodeX - 8} ${beakerY + 50}
                L ${rightElectrodeX - 8} ${beakerY + 195}
                L ${rightElectrodeX + electrodeWidth + 8} ${beakerY + 195}
                L ${rightElectrodeX + electrodeWidth + 8} ${beakerY + 50}
                Q ${rightElectrodeX + electrodeWidth / 2} ${beakerY + 38} ${rightElectrodeX - 8} ${beakerY + 50}
              `}
              fill="#ffffff"
              fillOpacity={0.4}
              stroke="#64748b"
              strokeWidth={2}
            />
            <rect
              x={rightElectrodeX - 6}
              y={beakerY + 45}
              width={electrodeWidth + 12}
              height={85}
              fill="#f8fafc"
              fillOpacity={0.9}
            />
            <text
              x={rightElectrodeX + electrodeWidth / 2}
              y={beakerY + 95}
              fill="#0f172a"
              fontSize={13}
              fontWeight="bold"
              textAnchor="middle"
            >
              H₂ (2 vol)
            </text>
          </g>
        )}

        <rect
          x={leftElectrodeX}
          y={electrodeY}
          width={electrodeWidth}
          height={electrodeHeight}
          fill="#334155"
          stroke="#0f172a"
          strokeWidth={1.5}
          rx={2}
        />
        <text
          x={leftElectrodeX + electrodeWidth / 2}
          y={electrodeY + electrodeHeight / 2}
          fill="#ffffff"
          fontSize={11}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="central"
        >
          Pt
        </text>

        <rect
          x={rightElectrodeX}
          y={electrodeY}
          width={electrodeWidth}
          height={electrodeHeight}
          fill="#334155"
          stroke="#0f172a"
          strokeWidth={1.5}
          rx={2}
        />
        <text
          x={rightElectrodeX + electrodeWidth / 2}
          y={electrodeY + electrodeHeight / 2}
          fill="#ffffff"
          fontSize={11}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="central"
        >
          Pt
        </text>

        {showBubbles && animated && (
          <g>
            <circle cx={leftElectrodeX + 5} cy={electrodeY + 70} r={2.5} fill="#ffffff" fillOpacity={0.8} className="animate-pulse" />
            <circle cx={leftElectrodeX + electrodeWidth - 5} cy={electrodeY + 40} r={3} fill="#ffffff" fillOpacity={0.8} className="animate-pulse" />
            <circle cx={leftElectrodeX + 10} cy={electrodeY - 10} r={3.5} fill="#ffffff" fillOpacity={0.8} />

            <circle cx={rightElectrodeX + 4} cy={electrodeY + 75} r={3} fill="#ffffff" fillOpacity={0.8} className="animate-pulse" />
            <circle cx={rightElectrodeX + electrodeWidth - 4} cy={electrodeY + 45} r={3.5} fill="#ffffff" fillOpacity={0.8} className="animate-pulse" />
            <circle cx={rightElectrodeX + 6} cy={electrodeY - 15} r={4} fill="#ffffff" fillOpacity={0.8} className="animate-pulse" />
            <circle cx={rightElectrodeX + electrodeWidth - 6} cy={electrodeY + 15} r={3} fill="#ffffff" fillOpacity={0.8} />
          </g>
        )}

        <text
          x={batteryCenterX}
          y={beakerY + beakerHeight - 16}
          fill="#0f172a"
          fontSize={12}
          fontWeight="bold"
          textAnchor="middle"
        >
          {electrolyte}
        </text>

        {isCalloutsVisible && (
          <g>
            <text x={leftElectrodeX - 110} y={electrodeY + 40} fill="#c2410c" fontSize={13} fontWeight="bold">
              Anode (+)
            </text>
            <line
              x1={leftElectrodeX - 35}
              y1={electrodeY + 36}
              x2={leftElectrodeX}
              y2={electrodeY + 36}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={rightElectrodeX + 65} y={electrodeY + 40} fill="#c2410c" fontSize={13} fontWeight="bold">
              Cathode (−)
            </text>
            <line
              x1={rightElectrodeX + 60}
              y1={electrodeY + 36}
              x2={rightElectrodeX + electrodeWidth}
              y2={electrodeY + 36}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={leftElectrodeX - 145} y={electrodeY + 95} fill="#c2410c" fontSize={12} fontWeight="bold">
              Oxidation (2H₂O → O₂ + 4H⁺ + 4e⁻)
            </text>
            <line
              x1={leftElectrodeX - 45}
              y1={electrodeY + 90}
              x2={leftElectrodeX}
              y2={electrodeY + 90}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text x={rightElectrodeX + 65} y={electrodeY + 95} fill="#c2410c" fontSize={12} fontWeight="bold">
              Reduction (4e⁻ + 4H⁺ → 2H₂)
            </text>
            <line
              x1={rightElectrodeX + 60}
              y1={electrodeY + 90}
              x2={rightElectrodeX + electrodeWidth}
              y2={electrodeY + 90}
              stroke="#c2410c"
              strokeWidth={1.5}
            />
          </g>
        )}
      </svg>
    </div>
  );
};
