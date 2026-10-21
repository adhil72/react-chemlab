import React from 'react'
import type { MeterBridgeProps } from './MeterBridge.types'

export const MeterBridge: React.FC<MeterBridgeProps> = ({
  resistanceR = 2,
  balanceLengthL = 40,
  unknownResistanceS,
  driverVoltage = 2,
  showCallouts = true,
  showFormula = true,
  width = '100%',
  height = 'auto',
  className = '',
}) => {
  const calculatedS = unknownResistanceS ?? (resistanceR * (100 - balanceLengthL)) / balanceLengthL
  const wireStartX = 100
  const wireEndX = 580
  const wireLengthPx = wireEndX - wireStartX
  const jockeyX = wireStartX + (balanceLengthL / 100) * wireLengthPx

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

        <rect
          x={70}
          y={215}
          width={540}
          height={65}
          rx={4}
          fill="#fed7aa"
          stroke="#c2410c"
          strokeWidth={1.5}
        />

        <rect x={85} y={242} width={510} height={26} fill="#ffedd5" stroke="#f97316" strokeWidth={1} />
        
        {Array.from({ length: 11 }).map((_, i) => {
          const tickX = wireStartX + (i / 10) * wireLengthPx
          return (
            <g key={i}>
              <line x1={tickX} y1={242} x2={tickX} y2={254} stroke="#9a3412" strokeWidth={1.2} />
              <text
                x={tickX}
                y={264}
                textAnchor="middle"
                fill="#9a3412"
                fontSize={9}
                fontWeight="bold"
              >
                {i * 10}
              </text>
            </g>
          )
        })}

        <line
          x1={wireStartX}
          y1={232}
          x2={wireEndX}
          y2={232}
          stroke="#475569"
          strokeWidth={3}
        />

        <path
          d="M 85 242 L 85 140 L 170 140 L 170 155 L 105 155 L 105 242 Z"
          fill="#d97706"
          stroke="#92400e"
          strokeWidth={1.5}
        />
        <circle cx={95} cy={232} r={4.5} fill="#78350f" />
        <text x={78} y={236} textAnchor="end" fill="#0f172a" fontSize={13} fontWeight="bold">
          A
        </text>

        <rect
          x={230}
          y={140}
          width={220}
          height={15}
          fill="#d97706"
          stroke="#92400e"
          strokeWidth={1.5}
        />
        <circle cx={340} cy={147.5} r={4.5} fill="#78350f" />

        <path
          d="M 595 242 L 595 140 L 510 140 L 510 155 L 575 155 L 575 242 Z"
          fill="#d97706"
          stroke="#92400e"
          strokeWidth={1.5}
        />
        <circle cx={585} cy={232} r={4.5} fill="#78350f" />
        <text x={602} y={236} textAnchor="start" fill="#0f172a" fontSize={13} fontWeight="bold">
          B
        </text>

        <g>
          <line x1={170} y1={147.5} x2={185} y2={147.5} stroke="#1e293b" strokeWidth={2} />
          <line x1={185} y1={147.5} x2={185} y2={100} stroke="#1e293b" strokeWidth={2} />
          <rect
            x={165}
            y={65}
            width={70}
            height={35}
            rx={3}
            fill="#f1f5f9"
            stroke="#475569"
            strokeWidth={1.8}
          />
          <text x={200} y={82} textAnchor="middle" fill="#0f172a" fontSize={11} fontWeight="bold">
            R-Box (R)
          </text>
          <text x={200} y={94} textAnchor="middle" fill="#0369a1" fontSize={10} fontWeight="bold">
            {resistanceR} Ω
          </text>
          <line x1={215} y1={100} x2={215} y2={147.5} stroke="#1e293b" strokeWidth={2} />
          <line x1={215} y1={147.5} x2={230} y2={147.5} stroke="#1e293b" strokeWidth={2} />
        </g>

        <g>
          <line x1={450} y1={147.5} x2={465} y2={147.5} stroke="#1e293b" strokeWidth={2} />
          <line x1={465} y1={147.5} x2={465} y2={100} stroke="#1e293b" strokeWidth={2} />
          <path
            d="M 465 100 Q 475 75 485 100 Q 495 75 505 100"
            fill="none"
            stroke="#7c3aed"
            strokeWidth={2.5}
          />
          <text x={485} y={68} textAnchor="middle" fill="#7c3aed" fontSize={11} fontWeight="bold">
            Unknown Wire (S)
          </text>
          <text x={485} y={82} textAnchor="middle" fill="#7c3aed" fontSize={10} fontWeight="bold">
            {calculatedS.toFixed(2)} Ω
          </text>
          <line x1={505} y1={100} x2={505} y2={147.5} stroke="#1e293b" strokeWidth={2} />
          <line x1={505} y1={147.5} x2={510} y2={147.5} stroke="#1e293b" strokeWidth={2} />
        </g>

        <g>
          <line x1={340} y1={152} x2={340} y2={175} stroke="#1e293b" strokeWidth={2} />
          <circle cx={340} cy={195} r={18} fill="#f8fafc" stroke="#475569" strokeWidth={2} />
          <text x={340} y={200} textAnchor="middle" fill="#475569" fontSize={13} fontWeight="900">
            G
          </text>
          <line x1={340} y1={213} x2={jockeyX} y2={226} stroke="#0f172a" strokeWidth={1.8} />

          <polygon
            points={`${jockeyX - 4},220 ${jockeyX + 4},220 ${jockeyX},232`}
            fill="#dc2626"
            stroke="#991b1b"
            strokeWidth={1}
          />
          <text
            x={jockeyX}
            y={215}
            textAnchor="middle"
            fill="#dc2626"
            fontSize={10}
            fontWeight="bold"
          >
            Jockey (J)
          </text>
        </g>

        <g>
          <path
            d="M 95 242 L 95 340 L 300 340"
            fill="none"
            stroke="#1e293b"
            strokeWidth={2}
          />
          <path
            d="M 370 340 L 585 340 L 585 242"
            fill="none"
            stroke="#1e293b"
            strokeWidth={2}
          />

          <line x1={300} y1={340} x2={320} y2={340} stroke="#1e293b" strokeWidth={2} />
          <line x1={320} y1={326} x2={320} y2={354} stroke="#1e293b" strokeWidth={3} />
          <text x={312} y={322} fill="#dc2626" fontSize={11} fontWeight="bold">+</text>

          <line x1={336} y1={331} x2={336} y2={349} stroke="#1e293b" strokeWidth={5} />
          <text x={342} y={322} fill="#1e293b" fontSize={11} fontWeight="bold">-</text>

          <line x1={336} y1={340} x2={370} y2={340} stroke="#1e293b" strokeWidth={2} />
          <text x={335} y={368} textAnchor="middle" fill="#0f172a" fontSize={11} fontWeight="bold">
            Accumulator ({driverVoltage}V)
          </text>
        </g>

        <g>
          <line
            x1={wireStartX}
            y1={295}
            x2={jockeyX}
            y2={295}
            stroke="#0284c7"
            strokeWidth={1.8}
            markerStart="url(#bridgeDimArrow)"
            markerEnd="url(#bridgeDimArrow)"
          />
          <text
            x={(wireStartX + jockeyX) / 2}
            y={310}
            textAnchor="middle"
            fill="#0284c7"
            fontSize={11}
            fontWeight="bold"
          >
            l = {balanceLengthL} cm
          </text>

          <line
            x1={jockeyX}
            y1={295}
            x2={wireEndX}
            y2={295}
            stroke="#059669"
            strokeWidth={1.8}
          />
          <text
            x={(jockeyX + wireEndX) / 2}
            y={310}
            textAnchor="middle"
            fill="#059669"
            fontSize={11}
            fontWeight="bold"
          >
            (100 - l) = {100 - balanceLengthL} cm
          </text>
        </g>

        {showFormula && (
          <g>
            <rect
              x={180}
              y={395}
              width={320}
              height={42}
              rx={6}
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth={1.5}
            />
            <text x={340} y={421} textAnchor="middle" fill="#0f172a" fontSize={13} fontWeight="bold">
              Formula: S = R × (100 - l) / l = {calculatedS.toFixed(2)} Ω
            </text>
          </g>
        )}

        {showCallouts && (
          <g>
            <text x={200} y={32} textAnchor="middle" fill="#c2410c" fontSize={11} fontWeight="bold">
              Known Resistance Box
            </text>
            <line x1={200} y1={36} x2={200} y2={62} stroke="#c2410c" strokeWidth={1.2} />

            <text x={485} y={32} textAnchor="middle" fill="#c2410c" fontSize={11} fontWeight="bold">
              Unknown Resistance Coil
            </text>
            <line x1={485} y1={36} x2={485} y2={62} stroke="#c2410c" strokeWidth={1.2} />

            <text x={140} y={190} textAnchor="middle" fill="#c2410c" fontSize={11} fontWeight="bold">
              Thick Brass Strips
            </text>
            <line x1={140} y1={175} x2={140} y2={158} stroke="#c2410c" strokeWidth={1.2} />

            <text x={50} y={260} textAnchor="end" fill="#c2410c" fontSize={11} fontWeight="bold">
              1-Meter Manganin Wire
            </text>
            <line x1={55} y1={255} x2={95} y2={235} stroke="#c2410c" strokeWidth={1.2} />
          </g>
        )}
      </svg>
    </div>
  )
}
