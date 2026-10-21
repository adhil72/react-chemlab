import React from 'react'
import type { WheatstoneBridgeProps } from './WheatstoneBridge.types'

export const WheatstoneBridge: React.FC<WheatstoneBridgeProps> = ({
  r1 = 100,
  r2 = 100,
  r3 = 200,
  rx = 200,
  voltage = 10,
  showGalvanometerDeflection = true,
  showBalanceEquation = true,
  showCallouts = true,
  width = '100%',
  height = 'auto',
  className = '',
}) => {
  const vb = (voltage * r3) / (r1 + r3)
  const vd = (voltage * rx) / (r2 + rx)
  const vDiff = vb - vd
  const isBalanced = Math.abs(vDiff) < 0.001
  const needleAngle = Math.max(-40, Math.min(40, vDiff * 25))

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
          <line x1={340} y1={80} x2={290} y2={130} stroke="#1e293b" strokeWidth={2.5} />
          <rect
            x={265}
            y={120}
            width={44}
            height={20}
            rx={2}
            fill="#fef3c7"
            stroke="#b45309"
            strokeWidth={2}
            transform="rotate(45 287 130)"
          />
          <text
            x={260}
            y={105}
            textAnchor="end"
            fill="#b45309"
            fontSize={12}
            fontWeight="bold"
          >
            R₁ = {r1} Ω
          </text>
          <line x1={270} y1={150} x2={210} y2={210} stroke="#1e293b" strokeWidth={2.5} />

          <line x1={340} y1={80} x2={390} y2={130} stroke="#1e293b" strokeWidth={2.5} />
          <rect
            x={370}
            y={120}
            width={44}
            height={20}
            rx={2}
            fill="#fef3c7"
            stroke="#b45309"
            strokeWidth={2}
            transform="rotate(-45 392 130)"
          />
          <text
            x={420}
            y={105}
            textAnchor="start"
            fill="#b45309"
            fontSize={12}
            fontWeight="bold"
          >
            R₂ = {r2} Ω
          </text>
          <line x1={410} y1={150} x2={470} y2={210} stroke="#1e293b" strokeWidth={2.5} />

          <line x1={210} y1={210} x2={260} y2={260} stroke="#1e293b" strokeWidth={2.5} />
          <rect
            x={250}
            y={260}
            width={44}
            height={20}
            rx={2}
            fill="#fef3c7"
            stroke="#b45309"
            strokeWidth={2}
            transform="rotate(-45 272 270)"
          />
          <text
            x={240}
            y={305}
            textAnchor="end"
            fill="#b45309"
            fontSize={12}
            fontWeight="bold"
          >
            R₃ = {r3} Ω
          </text>
          <line x1={285} y1={285} x2={340} y2={340} stroke="#1e293b" strokeWidth={2.5} />

          <line x1={470} y1={210} x2={420} y2={260} stroke="#1e293b" strokeWidth={2.5} />
          <rect
            x={385}
            y={260}
            width={44}
            height={20}
            rx={2}
            fill="#eff6ff"
            stroke="#2563eb"
            strokeWidth={2}
            transform="rotate(45 407 270)"
          />
          <text
            x={440}
            y={305}
            textAnchor="start"
            fill="#2563eb"
            fontSize={12}
            fontWeight="bold"
          >
            Rₓ = {rx} Ω
          </text>
          <line x1={400} y1={280} x2={340} y2={340} stroke="#1e293b" strokeWidth={2.5} />

          <line x1={210} y1={210} x2={305} y2={210} stroke="#1e293b" strokeWidth={2.2} />
          <line x1={375} y1={210} x2={470} y2={210} stroke="#1e293b" strokeWidth={2.2} />

          <circle cx={340} cy={210} r={28} fill="#f8fafc" stroke="#475569" strokeWidth={2.5} />
          <circle cx={340} cy={210} r={2} fill="#1e293b" />
          
          <path d="M 324 195 A 18 18 0 0 1 356 195" fill="none" stroke="#94a3b8" strokeWidth={1} />
          <line x1={340} y1={191} x2={340} y2={196} stroke="#0f172a" strokeWidth={1.5} />
          <line x1={326} y1={197} x2={329} y2={201} stroke="#64748b" strokeWidth={1} />
          <line x1={354} y1={197} x2={351} y2={201} stroke="#64748b" strokeWidth={1} />

          {showGalvanometerDeflection ? (
            <line
              x1={340}
              y1={210}
              x2={340 + Math.sin((needleAngle * Math.PI) / 180) * 20}
              y2={210 - Math.cos((needleAngle * Math.PI) / 180) * 20}
              stroke="#dc2626"
              strokeWidth={2}
              strokeLinecap="round"
            />
          ) : (
            <line x1={340} y1={210} x2={340} y2={191} stroke="#dc2626" strokeWidth={2} strokeLinecap="round" />
          )}

          <text x={340} y={230} textAnchor="middle" fill="#475569" fontSize={14} fontWeight="900">
            G
          </text>
          <text
            x={340}
            y={184}
            textAnchor="middle"
            fill={isBalanced ? '#16a34a' : '#dc2626'}
            fontSize={10}
            fontWeight="bold"
          >
            0
          </text>

          <circle cx={340} cy={80} r={5} fill="#0f172a" />
          <text x={340} y={66} textAnchor="middle" fill="#0f172a" fontSize={14} fontWeight="bold">
            A
          </text>

          <circle cx={210} cy={210} r={5} fill="#0f172a" />
          <text x={192} y={215} textAnchor="end" fill="#0f172a" fontSize={14} fontWeight="bold">
            B
          </text>

          <circle cx={340} cy={340} r={5} fill="#0f172a" />
          <text x={340} y={360} textAnchor="middle" fill="#0f172a" fontSize={14} fontWeight="bold">
            C
          </text>

          <circle cx={470} cy={210} r={5} fill="#0f172a" />
          <text x={488} y={215} textAnchor="start" fill="#0f172a" fontSize={14} fontWeight="bold">
            D
          </text>

          <path
            d="M 340 80 L 100 80 L 100 420 L 310 420"
            fill="none"
            stroke="#1e293b"
            strokeWidth={2.2}
          />
          <path
            d="M 370 420 L 580 420 L 580 340 L 340 340"
            fill="none"
            stroke="#1e293b"
            strokeWidth={2.2}
          />

          <g>
            <line x1={310} y1={420} x2={330} y2={420} stroke="#1e293b" strokeWidth={2.2} />
            <line x1={330} y1={405} x2={330} y2={435} stroke="#1e293b" strokeWidth={3} />
            <text x={322} y={400} fill="#dc2626" fontSize={13} fontWeight="bold">+</text>

            <line x1={348} y1={411} x2={348} y2={429} stroke="#1e293b" strokeWidth={5} />
            <text x={354} y={400} fill="#1e293b" fontSize={13} fontWeight="bold">-</text>

            <line x1={348} y1={420} x2={370} y2={420} stroke="#1e293b" strokeWidth={2.2} />

            <text
              x={340}
              y={452}
              textAnchor="middle"
              fill="#0f172a"
              fontSize={12}
              fontWeight="bold"
            >
              Battery (V = {voltage} V)
            </text>
          </g>
        </g>

        {showBalanceEquation && (
          <g>
            <rect
              x={210}
              y={15}
              width={260}
              height={36}
              rx={6}
              fill={isBalanced ? '#f0fdf4' : '#fff7ed'}
              stroke={isBalanced ? '#16a34a' : '#ea580c'}
              strokeWidth={1.5}
            />
            <text
              x={340}
              y={38}
              textAnchor="middle"
              fill={isBalanced ? '#15803d' : '#c2410c'}
              fontSize={13}
              fontWeight="bold"
            >
              {isBalanced
                ? 'Balanced Bridge: R₁ / R₂ = R₃ / Rₓ (I_G = 0)'
                : `Unbalanced Bridge: ΔV = ${Math.abs(vDiff).toFixed(2)} V`}
            </text>
          </g>
        )}

        {showCallouts && (
          <g>
            <text x={340} y={270} textAnchor="middle" fill="#c2410c" fontSize={12} fontWeight="bold">
              Galvanometer (Zero-Center)
            </text>
            <line x1={340} y1={255} x2={340} y2={242} stroke="#c2410c" strokeWidth={1.2} />

            <text x={140} y={130} textAnchor="middle" fill="#c2410c" fontSize={11} fontWeight="bold">
              Standard Arm R₁
            </text>
            <line x1={180} y1={130} x2={260} y2={130} stroke="#c2410c" strokeWidth={1.2} />

            <text x={530} y={280} textAnchor="start" fill="#c2410c" fontSize={11} fontWeight="bold">
              Unknown Resistor Rₓ
            </text>
            <line x1={525} y1={280} x2={432} y2={276} stroke="#c2410c" strokeWidth={1.2} />
          </g>
        )}
      </svg>
    </div>
  )
}
