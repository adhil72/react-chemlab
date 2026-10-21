import React from 'react'
import type { RLCCircuitProps } from './RLCCircuit.types'

export const RLCCircuit: React.FC<RLCCircuitProps> = ({
  resistance = 50,
  inductance = 0.1,
  capacitance = 10,
  frequency = 50,
  voltage = 120,
  showPhasorSummary = true,
  showCallouts = true,
  animated = true,
  width = '100%',
  height = 'auto',
  className = '',
}) => {
  const cFarads = capacitance * 1e-6
  const omega = 2 * Math.PI * frequency
  const xl = omega * inductance
  const xc = 1 / (omega * cFarads)
  const z = Math.sqrt(resistance * resistance + (xl - xc) * (xl - xc))
  const current = voltage / z
  const fResonance = 1 / (2 * Math.PI * Math.sqrt(inductance * cFarads))

  return (
    <div
      className={`inline-block font-sans select-none ${className}`}
      style={{ width, height, maxWidth: '100%' }}
    >
      <svg
        viewBox="0 0 680 480"
        className="w-full h-auto block"
        style={{ overflow: 'visible' }}
      >
        <rect width="680" height="480" fill="#ffffff" rx={8} />

        <g>
          <line x1={100} y1={120} x2={160} y2={120} stroke="#1e293b" strokeWidth={2.5} />

          <path
            d="M 160 120 L 168 108 L 176 132 L 184 108 L 192 132 L 200 108 L 208 132 L 216 108 L 224 132 L 232 120"
            fill="none"
            stroke="#b45309"
            strokeWidth={2.8}
            strokeLinejoin="round"
          />
          <text
            x={196}
            y={88}
            textAnchor="middle"
            fill="#b45309"
            fontSize={12}
            fontWeight="bold"
          >
            R = {resistance} Ω
          </text>

          <line x1={232} y1={120} x2={290} y2={120} stroke="#1e293b" strokeWidth={2.5} />

          <path
            d="M 290 120 Q 300 95 310 120 Q 320 95 330 120 Q 340 95 350 120 Q 360 95 370 120"
            fill="none"
            stroke="#0284c7"
            strokeWidth={3}
          />
          <text
            x={330}
            y={88}
            textAnchor="middle"
            fill="#0284c7"
            fontSize={12}
            fontWeight="bold"
          >
            L = {inductance} H
          </text>

          <line x1={370} y1={120} x2={440} y2={120} stroke="#1e293b" strokeWidth={2.5} />

          <g>
            <line x1={440} y1={100} x2={440} y2={140} stroke="#1e293b" strokeWidth={4} />
            <line x1={454} y1={100} x2={454} y2={140} stroke="#1e293b" strokeWidth={4} />
            <line x1={454} y1={120} x2={560} y2={120} stroke="#1e293b" strokeWidth={2.5} />

            <text
              x={447}
              y={88}
              textAnchor="middle"
              fill="#7c3aed"
              fontSize={12}
              fontWeight="bold"
            >
              C = {capacitance} µF
            </text>
          </g>

          <line x1={560} y1={120} x2={560} y2={340} stroke="#1e293b" strokeWidth={2.5} />

          <line x1={560} y1={340} x2={365} y2={340} stroke="#1e293b" strokeWidth={2.5} />

          <g>
            <circle cx={330} cy={340} r={25} fill="#f8fafc" stroke="#1e293b" strokeWidth={2.5} />
            <path
              d="M 314 340 Q 322 324 330 340 Q 338 356 346 340"
              fill="none"
              stroke="#0284c7"
              strokeWidth={3}
              className={animated ? 'animate-pulse' : ''}
            />
            <text
              x={330}
              y={385}
              textAnchor="middle"
              fill="#0f172a"
              fontSize={12}
              fontWeight="bold"
            >
              AC Source: {voltage}V, {frequency}Hz
            </text>
          </g>

          <line x1={295} y1={340} x2={100} y2={340} stroke="#1e293b" strokeWidth={2.5} />

          <line x1={100} y1={340} x2={100} y2={120} stroke="#1e293b" strokeWidth={2.5} />
        </g>

        {showPhasorSummary && (
          <g>
            <rect
              x={130}
              y={415}
              width={400}
              height={50}
              rx={6}
              fill="#f1f5f9"
              stroke="#cbd5e1"
              strokeWidth={1.5}
            />
            <text x={150} y={436} fill="#0f172a" fontSize={11} fontWeight="bold">
              Impedance Z: {z.toFixed(1)} Ω | Current I: {current.toFixed(2)} A
            </text>
            <text x={150} y={453} fill="#475569" fontSize={11}>
              X_L: {xl.toFixed(1)} Ω | X_C: {xc.toFixed(1)} Ω | f₀ (Resonance): {fResonance.toFixed(1)} Hz
            </text>
          </g>
        )}

        {showCallouts && (
          <g>
            <text x={196} y={45} textAnchor="middle" fill="#c2410c" fontSize={11} fontWeight="bold">
              Resistor (V_R in phase)
            </text>
            <line x1={196} y1={50} x2={196} y2={74} stroke="#c2410c" strokeWidth={1.2} />

            <text x={330} y={45} textAnchor="middle" fill="#c2410c" fontSize={11} fontWeight="bold">
              Inductor (V_L leads by 90°)
            </text>
            <line x1={330} y1={50} x2={330} y2={74} stroke="#c2410c" strokeWidth={1.2} />

            <text x={447} y={45} textAnchor="middle" fill="#c2410c" fontSize={11} fontWeight="bold">
              Capacitor (V_C lags by 90°)
            </text>
            <line x1={447} y1={50} x2={447} y2={74} stroke="#c2410c" strokeWidth={1.2} />

            <text x={580} y={230} textAnchor="start" fill="#c2410c" fontSize={11} fontWeight="bold">
              Series Circuit Loop
            </text>
            <line x1={575} y1={230} x2={560} y2={230} stroke="#c2410c" strokeWidth={1.2} />
          </g>
        )}
      </svg>
    </div>
  )
}
