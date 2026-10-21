import React from 'react'
import type { LogicCircuitProps, GateType } from './LogicCircuit.types'

function computeOutput(gate: GateType, a: 0 | 1, b: 0 | 1): 0 | 1 {
  switch (gate) {
    case 'AND':
      return a === 1 && b === 1 ? 1 : 0
    case 'OR':
      return a === 1 || b === 1 ? 1 : 0
    case 'NAND':
      return a === 1 && b === 1 ? 0 : 1
    case 'NOR':
      return a === 1 || b === 1 ? 0 : 1
    case 'XOR':
      return a !== b ? 1 : 0
    case 'NOT':
      return a === 1 ? 0 : 1
  }
}

export const LogicCircuit: React.FC<LogicCircuitProps> = ({
  gateType = 'AND',
  inputA = 1,
  inputB = 0,
  showTruthTable = true,
  showCallouts = true,
  width = '100%',
  height = 'auto',
  className = '',
}) => {
  const output = computeOutput(gateType, inputA, inputB)
  const isHighA = inputA === 1
  const isHighB = inputB === 1
  const isHighOut = output === 1

  const isUnary = gateType === 'NOT'

  return (
    <div
      className={`inline-block font-sans select-none ${className}`}
      style={{ width, height, maxWidth: '100%' }}
    >
      <svg
        viewBox="0 0 680 440"
        className="w-full h-auto block"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="ledGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="680" height="440" fill="#ffffff" rx={8} />

        <g>
          <g>
            <rect
              x={40}
              y={isUnary ? 180 : 130}
              width={80}
              height={36}
              rx={6}
              fill={isHighA ? '#dcfce7' : '#f1f5f9'}
              stroke={isHighA ? '#16a34a' : '#94a3b8'}
              strokeWidth={2}
            />
            <text
              x={80}
              y={isUnary ? 203 : 153}
              textAnchor="middle"
              fill={isHighA ? '#15803d' : '#64748b'}
              fontSize={13}
              fontWeight="bold"
            >
              A = {inputA}
            </text>
            <line
              x1={120}
              y1={isUnary ? 198 : 148}
              x2={220}
              y2={isUnary ? 198 : 148}
              stroke={isHighA ? '#16a34a' : '#64748b'}
              strokeWidth={3}
            />
          </g>

          {!isUnary && (
            <g>
              <rect
                x={40}
                y={230}
                width={80}
                height={36}
                rx={6}
                fill={isHighB ? '#dcfce7' : '#f1f5f9'}
                stroke={isHighB ? '#16a34a' : '#94a3b8'}
                strokeWidth={2}
              />
              <text
                x={80}
                y={253}
                textAnchor="middle"
                fill={isHighB ? '#15803d' : '#64748b'}
                fontSize={13}
                fontWeight="bold"
              >
                B = {inputB}
              </text>
              <line
                x1={120}
                y1={248}
                x2={220}
                y2={248}
                stroke={isHighB ? '#16a34a' : '#64748b'}
                strokeWidth={3}
              />
            </g>
          )}

          <g>
            {gateType === 'AND' && (
              <path
                d="M 220 120 L 270 120 A 78 78 0 0 1 270 276 L 220 276 Z"
                fill="#f8fafc"
                stroke="#1e293b"
                strokeWidth={3.5}
                strokeLinejoin="round"
              />
            )}

            {gateType === 'NAND' && (
              <g>
                <path
                  d="M 220 120 L 270 120 A 78 78 0 0 1 270 276 L 220 276 Z"
                  fill="#f8fafc"
                  stroke="#1e293b"
                  strokeWidth={3.5}
                  strokeLinejoin="round"
                />
                <circle cx={358} cy={198} r={9} fill="#ffffff" stroke="#1e293b" strokeWidth={3} />
              </g>
            )}

            {gateType === 'OR' && (
              <path
                d="M 215 120 Q 255 198 215 276 Q 295 276 348 198 Q 295 120 215 120 Z"
                fill="#f8fafc"
                stroke="#1e293b"
                strokeWidth={3.5}
                strokeLinejoin="round"
              />
            )}

            {gateType === 'NOR' && (
              <g>
                <path
                  d="M 215 120 Q 255 198 215 276 Q 295 276 348 198 Q 295 120 215 120 Z"
                  fill="#f8fafc"
                  stroke="#1e293b"
                  strokeWidth={3.5}
                  strokeLinejoin="round"
                />
                <circle cx={357} cy={198} r={9} fill="#ffffff" stroke="#1e293b" strokeWidth={3} />
              </g>
            )}

            {gateType === 'XOR' && (
              <g>
                <path
                  d="M 205 120 Q 245 198 205 276"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth={3.5}
                />
                <path
                  d="M 220 120 Q 260 198 220 276 Q 300 276 352 198 Q 300 120 220 120 Z"
                  fill="#f8fafc"
                  stroke="#1e293b"
                  strokeWidth={3.5}
                  strokeLinejoin="round"
                />
              </g>
            )}

            {gateType === 'NOT' && (
              <g>
                <polygon
                  points="220,138 330,198 220,258"
                  fill="#f8fafc"
                  stroke="#1e293b"
                  strokeWidth={3.5}
                  strokeLinejoin="round"
                />
                <circle cx={339} cy={198} r={9} fill="#ffffff" stroke="#1e293b" strokeWidth={3} />
              </g>
            )}

            <text
              x={265}
              y={204}
              textAnchor="middle"
              fill="#0f172a"
              fontSize={14}
              fontWeight="900"
            >
              {gateType}
            </text>
          </g>

          <g>
            <line
              x1={gateType === 'NAND' || gateType === 'NOR' || gateType === 'NOT' ? 368 : 348}
              y1={198}
              x2={440}
              y2={198}
              stroke={isHighOut ? '#16a34a' : '#64748b'}
              strokeWidth={3.5}
            />

            {isHighOut && (
              <circle
                cx={465}
                cy={198}
                r={26}
                fill="#86efac"
                opacity={0.6}
                filter="url(#ledGlow)"
              />
            )}

            <circle
              cx={465}
              cy={198}
              r={18}
              fill={isHighOut ? '#22c55e' : '#e2e8f0'}
              stroke={isHighOut ? '#15803d' : '#94a3b8'}
              strokeWidth={2.5}
            />
            <text
              x={465}
              y={204}
              textAnchor="middle"
              fill={isHighOut ? '#ffffff' : '#64748b'}
              fontSize={15}
              fontWeight="bold"
            >
              {output}
            </text>
            <text
              x={465}
              y={235}
              textAnchor="middle"
              fill={isHighOut ? '#15803d' : '#64748b'}
              fontSize={11}
              fontWeight="bold"
            >
              Output (Q)
            </text>
          </g>
        </g>

        {showTruthTable && (
          <g transform="translate(540, 100)">
            <rect
              x={0}
              y={0}
              width={115}
              height={isUnary ? 85 : 140}
              rx={6}
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth={1.5}
            />
            <text x={57} y={20} textAnchor="middle" fill="#0f172a" fontSize={11} fontWeight="bold">
              Truth Table
            </text>
            <line x1={0} y1={28} x2={115} y2={28} stroke="#cbd5e1" strokeWidth={1} />

            {isUnary ? (
              <g>
                <text x={30} y={44} fill="#475569" fontSize={10} fontWeight="bold">A</text>
                <text x={85} y={44} fill="#475569" fontSize={10} fontWeight="bold">Q</text>
                {[0, 1].map((val, idx) => {
                  const outVal = val === 1 ? 0 : 1
                  const isActive = inputA === val
                  return (
                    <g key={idx}>
                      {isActive && (
                        <rect x={2} y={50 + idx * 16} width={111} height={15} fill="#dcfce7" rx={2} />
                      )}
                      <text x={32} y={62 + idx * 16} fill={isActive ? '#15803d' : '#334155'} fontSize={10} fontWeight={isActive ? 'bold' : 'normal'}>
                        {val}
                      </text>
                      <text x={87} y={62 + idx * 16} fill={isActive ? '#15803d' : '#334155'} fontSize={10} fontWeight={isActive ? 'bold' : 'normal'}>
                        {outVal}
                      </text>
                    </g>
                  )
                })}
              </g>
            ) : (
              <g>
                <text x={18} y={42} fill="#475569" fontSize={10} fontWeight="bold">A</text>
                <text x={50} y={42} fill="#475569" fontSize={10} fontWeight="bold">B</text>
                <text x={85} y={42} fill="#475569" fontSize={10} fontWeight="bold">Q</text>
                {[
                  [0, 0],
                  [0, 1],
                  [1, 0],
                  [1, 1],
                ].map(([a, b], idx) => {
                  const outVal = computeOutput(gateType, a as 0 | 1, b as 0 | 1)
                  const isActive = inputA === a && inputB === b
                  return (
                    <g key={idx}>
                      {isActive && (
                        <rect x={2} y={48 + idx * 20} width={111} height={18} fill="#dcfce7" rx={2} />
                      )}
                      <text x={20} y={62 + idx * 20} fill={isActive ? '#15803d' : '#334155'} fontSize={10} fontWeight={isActive ? 'bold' : 'normal'}>
                        {a}
                      </text>
                      <text x={52} y={62 + idx * 20} fill={isActive ? '#15803d' : '#334155'} fontSize={10} fontWeight={isActive ? 'bold' : 'normal'}>
                        {b}
                      </text>
                      <text x={87} y={62 + idx * 20} fill={isActive ? '#15803d' : '#334155'} fontSize={10} fontWeight={isActive ? 'bold' : 'normal'}>
                        {outVal}
                      </text>
                    </g>
                  )
                })}
              </g>
            )}
          </g>
        )}

        {showCallouts && (
          <g>
            <text x={80} y={90} textAnchor="middle" fill="#c2410c" fontSize={11} fontWeight="bold">
              Binary Inputs (0 / 1)
            </text>
            <line x1={80} y1={95} x2={80} y2={125} stroke="#c2410c" strokeWidth={1.2} />

            <text x={265} y={80} textAnchor="middle" fill="#c2410c" fontSize={11} fontWeight="bold">
              {gateType} Logic Gate
            </text>
            <line x1={265} y1={85} x2={265} y2={115} stroke="#c2410c" strokeWidth={1.2} />

            <text x={465} y={145} textAnchor="middle" fill="#c2410c" fontSize={11} fontWeight="bold">
              Output Indicator LED
            </text>
            <line x1={465} y1={150} x2={465} y2={175} stroke="#c2410c" strokeWidth={1.2} />
          </g>
        )}
      </svg>
    </div>
  )
}
