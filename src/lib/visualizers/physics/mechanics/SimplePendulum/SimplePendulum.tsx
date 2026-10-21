import React from 'react'
import type { SimplePendulumProps } from './SimplePendulum.types'

export const SimplePendulum: React.FC<SimplePendulumProps> = ({
  stringLength = 1.0,
  angleDegrees = 25,
  bobMass = 0.5,
  showForceVectors = true,
  showTrajectoryArc = true,
  showFormula = true,
  showCallouts = true,
  width = '100%',
  height = 'auto',
  className = '',
}) => {
  const pivotX = 340
  const pivotY = 60
  const lengthPx = 220

  const rad = (angleDegrees * Math.PI) / 180
  const bobX = pivotX + lengthPx * Math.sin(rad)
  const bobY = pivotY + lengthPx * Math.cos(rad)

  const g = 9.8
  const period = 2 * Math.PI * Math.sqrt(stringLength / g)

  const fGravity = bobMass * g
  const fRestoring = fGravity * Math.sin(rad)
  const fTension = fGravity * Math.cos(rad)

  const arcRad = 70
  const arcEndX = pivotX + arcRad * Math.sin(rad)
  const arcEndY = pivotY + arcRad * Math.cos(rad)

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
        <defs>
          <radialGradient id="bobShading" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="40%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>

          <marker
            id="forceArrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626" />
          </marker>

          <marker
            id="tensionArrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb" />
          </marker>
        </defs>

        <rect width="680" height="480" fill="#ffffff" rx={8} />

        <g>
          <line x1={260} y1={60} x2={420} y2={60} stroke="#1e293b" strokeWidth={3} />
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={i}
              x1={270 + i * 16}
              y1={60}
              x2={280 + i * 16}
              y2={48}
              stroke="#64748b"
              strokeWidth={1.8}
            />
          ))}
          <circle cx={pivotX} cy={pivotY} r={4.5} fill="#1e293b" />
        </g>

        <line
          x1={pivotX}
          y1={pivotY}
          x2={pivotX}
          y2={pivotY + lengthPx + 20}
          stroke="#cbd5e1"
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />

        {showTrajectoryArc && (
          <path
            d={`
              M ${pivotX - lengthPx * Math.sin(rad)} ${pivotY + lengthPx * Math.cos(rad)}
              A ${lengthPx} ${lengthPx} 0 0 0 ${bobX} ${bobY}
            `}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={2}
            strokeDasharray="3 3"
          />
        )}

        {angleDegrees !== 0 && (
          <g>
            <path
              d={`
                M ${pivotX} ${pivotY + arcRad}
                A ${arcRad} ${arcRad} 0 0 ${angleDegrees > 0 ? 1 : 0} ${arcEndX} ${arcEndY}
              `}
              fill="none"
              stroke="#0284c7"
              strokeWidth={1.5}
            />
            <text
              x={pivotX + 18}
              y={pivotY + arcRad - 5}
              fill="#0284c7"
              fontSize={12}
              fontWeight="bold"
            >
              θ = {angleDegrees}°
            </text>
          </g>
        )}

        <line
          x1={pivotX}
          y1={pivotY}
          x2={bobX}
          y2={bobY}
          stroke="#334155"
          strokeWidth={2}
        />

        <circle
          cx={bobX}
          cy={bobY}
          r={18}
          fill="url(#bobShading)"
          stroke="#1e293b"
          strokeWidth={1.5}
        />
        <text
          x={bobX}
          y={bobY + 4}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={10}
          fontWeight="bold"
        >
          m
        </text>

        {showForceVectors && (
          <g>
            <line
              x1={bobX}
              y1={bobY}
              x2={bobX}
              y2={bobY + 55}
              stroke="#dc2626"
              strokeWidth={2}
              markerEnd="url(#forceArrow)"
            />
            <text
              x={bobX + 8}
              y={bobY + 52}
              fill="#dc2626"
              fontSize={11}
              fontWeight="bold"
            >
              F_g = mg ({fGravity.toFixed(2)} N)
            </text>

            <line
              x1={bobX}
              y1={bobY}
              x2={bobX - 50 * Math.sin(rad)}
              y2={bobY - 50 * Math.cos(rad)}
              stroke="#2563eb"
              strokeWidth={2}
              markerEnd="url(#tensionArrow)"
            />
            <text
              x={bobX - 55 * Math.sin(rad) - 10}
              y={bobY - 55 * Math.cos(rad)}
              fill="#2563eb"
              fontSize={11}
              fontWeight="bold"
            >
              T ({fTension.toFixed(2)} N)
            </text>

            <line
              x1={bobX}
              y1={bobY}
              x2={bobX - 45 * Math.cos(rad)}
              y2={bobY + 45 * Math.sin(rad)}
              stroke="#d97706"
              strokeWidth={1.8}
            />
            <text
              x={bobX - 48 * Math.cos(rad) - 15}
              y={bobY + 48 * Math.sin(rad) + 12}
              fill="#d97706"
              fontSize={10}
              fontWeight="bold"
            >
              mg·sin θ ({fRestoring.toFixed(2)} N)
            </text>
          </g>
        )}

        {showFormula && (
          <g>
            <rect
              x={160}
              y={415}
              width={360}
              height={45}
              rx={6}
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth={1.5}
            />
            <text x={340} y={434} textAnchor="middle" fill="#0f172a" fontSize={12} fontWeight="bold">
              Period: T = 2π √(L / g) = {period.toFixed(2)} s
            </text>
            <text x={340} y={450} textAnchor="middle" fill="#475569" fontSize={11}>
              Length L = {stringLength} m | Mass m = {bobMass} kg | g = 9.8 m/s²
            </text>
          </g>
        )}

        {showCallouts && (
          <g>
            <text x={430} y={40} fill="#c2410c" fontSize={11} fontWeight="bold">
              Rigid Fixed Support
            </text>
            <line x1={425} y1={42} x2={390} y2={56} stroke="#c2410c" strokeWidth={1.2} />

            <text x={240} y={150} textAnchor="end" fill="#c2410c" fontSize={11} fontWeight="bold">
              Inextensible String (L = {stringLength} m)
            </text>
            <line
              x1={245}
              y1={150}
              x2={pivotX + (lengthPx / 2) * Math.sin(rad)}
              y2={pivotY + (lengthPx / 2) * Math.cos(rad)}
              stroke="#c2410c"
              strokeWidth={1.2}
            />

            <text x={bobX + 60} y={bobY - 15} fill="#c2410c" fontSize={11} fontWeight="bold">
              Spherical Bob (m = {bobMass} kg)
            </text>
            <line x1={bobX + 55} y1={bobY - 12} x2={bobX + 20} y2={bobY} stroke="#c2410c" strokeWidth={1.2} />
          </g>
        )}
      </svg>
    </div>
  )
}
