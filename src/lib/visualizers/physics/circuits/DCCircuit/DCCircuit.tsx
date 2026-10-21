import React from 'react'
import type { DCCircuitProps } from './DCCircuit.types'

export const DCCircuit: React.FC<DCCircuitProps> = ({
  voltage = 12,
  resistance = 10,
  switchClosed = true,
  showVoltmeter = true,
  showAmmeter = true,
  showBulb = true,
  showCallouts = true,
  showCurrentFlow = true,
  animated = true,
  width = '100%',
  height = 'auto',
  className = '',
}) => {
  const current = switchClosed && resistance > 0 ? voltage / resistance : 0
  const isLightOn = switchClosed && current > 0

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
          <filter id="dcBulbGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="bulbRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#eab308" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
          </radialGradient>

          <marker
            id="dcCurrentArrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
          </marker>
        </defs>

        <rect width="680" height="480" fill="#ffffff" rx={8} />

        <g>
          <line x1={120} y1={90} x2={190} y2={90} stroke="#1e293b" strokeWidth={2.5} />
          
          <path
            d="M 190 90 L 200 78 L 210 102 L 220 78 L 230 102 L 240 78 L 250 102 L 260 78 L 270 102 L 280 90"
            fill="none"
            stroke="#b45309"
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <text
            x={235}
            y={62}
            textAnchor="middle"
            fill="#b45309"
            fontSize={13}
            fontWeight="bold"
          >
            R = {resistance} Ω
          </text>

          <line x1={280} y1={90} x2={showBulb ? 360 : 540} y2={90} stroke="#1e293b" strokeWidth={2.5} />

          {showBulb && (
            <g>
              <line x1={400} y1={90} x2={540} y2={90} stroke="#1e293b" strokeWidth={2.5} />

              {isLightOn && (
                <circle
                  cx={380}
                  cy={90}
                  r={32}
                  fill="url(#bulbRadial)"
                  filter="url(#dcBulbGlow)"
                  className={animated ? 'animate-pulse' : ''}
                />
              )}

              <circle
                cx={380}
                cy={90}
                r={18}
                fill={isLightOn ? '#fef9c3' : '#f8fafc'}
                stroke={isLightOn ? '#ca8a04' : '#64748b'}
                strokeWidth={2}
              />
              <path
                d="M 370 102 L 380 80 L 390 102"
                fill="none"
                stroke={isLightOn ? '#eab308' : '#94a3b8'}
                strokeWidth={2}
                strokeLinejoin="round"
              />
              <line
                x1={375}
                y1={89}
                x2={385}
                y2={89}
                stroke={isLightOn ? '#eab308' : '#94a3b8'}
                strokeWidth={1.8}
              />
              <text
                x={380}
                y={125}
                textAnchor="middle"
                fill="#475569"
                fontSize={12}
                fontWeight="bold"
              >
                Bulb
              </text>
            </g>
          )}

          <line x1={540} y1={90} x2={540} y2={showAmmeter ? 200 : 370} stroke="#1e293b" strokeWidth={2.5} />

          {showAmmeter && (
            <g>
              <circle
                cx={540}
                cy={235}
                r={24}
                fill="#f0fdf4"
                stroke="#15803d"
                strokeWidth={2.2}
              />
              <text
                x={540}
                y={241}
                textAnchor="middle"
                fill="#15803d"
                fontSize={17}
                fontWeight="900"
              >
                A
              </text>
              <text
                x={540}
                y={278}
                textAnchor="middle"
                fill="#15803d"
                fontSize={12}
                fontWeight="bold"
              >
                {current.toFixed(2)} A
              </text>
              <line x1={540} y1={259} x2={540} y2={370} stroke="#1e293b" strokeWidth={2.5} />
            </g>
          )}

          <line x1={540} y1={370} x2={365} y2={370} stroke="#1e293b" strokeWidth={2.5} />

          <g>
            <line x1={310} y1={370} x2={325} y2={370} stroke="#1e293b" strokeWidth={2.5} />
            <line x1={325} y1={350} x2={325} y2={390} stroke="#1e293b" strokeWidth={3.5} />
            <text x={316} y={345} fill="#dc2626" fontSize={14} fontWeight="bold">+</text>

            <line x1={345} y1={358} x2={345} y2={382} stroke="#1e293b" strokeWidth={5} />
            <text x={352} y={345} fill="#1e293b" fontSize={14} fontWeight="bold">-</text>

            <line x1={345} y1={370} x2={365} y2={370} stroke="#1e293b" strokeWidth={2.5} />

            <text
              x={335}
              y={412}
              textAnchor="middle"
              fill="#0f172a"
              fontSize={13}
              fontWeight="bold"
            >
              V = {voltage} V
            </text>
          </g>

          <line x1={310} y1={370} x2={120} y2={370} stroke="#1e293b" strokeWidth={2.5} />

          <line x1={120} y1={370} x2={120} y2={260} stroke="#1e293b" strokeWidth={2.5} />

          <g>
            <circle cx={120} cy={260} r={4.5} fill="#1e293b" />
            <circle cx={120} cy={205} r={4.5} fill="#1e293b" />

            {switchClosed ? (
              <line
                x1={120}
                y1={260}
                x2={120}
                y2={205}
                stroke="#2563eb"
                strokeWidth={3}
              />
            ) : (
              <line
                x1={120}
                y1={260}
                x2={95}
                y2={212}
                stroke="#dc2626"
                strokeWidth={3}
              />
            )}

            <text
              x={78}
              y={240}
              textAnchor="end"
              fill={switchClosed ? '#2563eb' : '#dc2626'}
              fontSize={12}
              fontWeight="bold"
            >
              Switch ({switchClosed ? 'ON' : 'OFF'})
            </text>

            <line x1={120} y1={205} x2={120} y2={90} stroke="#1e293b" strokeWidth={2.5} />
          </g>
        </g>

        {showVoltmeter && (
          <g>
            <line x1={185} y1={90} x2={185} y2={160} stroke="#475569" strokeWidth={1.8} strokeDasharray="3 3" />
            <line x1={185} y1={160} x2={215} y2={160} stroke="#475569" strokeWidth={1.8} />

            <circle cx={235} cy={160} r={20} fill="#eff6ff" stroke="#2563eb" strokeWidth={2} />
            <text x={235} y={166} textAnchor="middle" fill="#2563eb" fontSize={15} fontWeight="900">
              V
            </text>
            <text x={235} y={196} textAnchor="middle" fill="#2563eb" fontSize={11} fontWeight="bold">
              {(switchClosed ? voltage : 0).toFixed(1)} V
            </text>

            <line x1={255} y1={160} x2={285} y2={160} stroke="#475569" strokeWidth={1.8} />
            <line x1={285} y1={160} x2={285} y2={90} stroke="#475569" strokeWidth={1.8} strokeDasharray="3 3" />

            <circle cx={185} cy={90} r={3.5} fill="#475569" />
            <circle cx={285} cy={90} r={3.5} fill="#475569" />
          </g>
        )}

        {showCurrentFlow && switchClosed && current > 0 && (
          <g>
            <line x1={150} y1={90} x2={165} y2={90} stroke="#0284c7" strokeWidth={2} markerEnd="url(#dcCurrentArrow)" />
            <line x1={450} y1={90} x2={465} y2={90} stroke="#0284c7" strokeWidth={2} markerEnd="url(#dcCurrentArrow)" />
            <line x1={540} y1={310} x2={540} y2={325} stroke="#0284c7" strokeWidth={2} markerEnd="url(#dcCurrentArrow)" />
            <line x1={220} y1={370} x2={205} y2={370} stroke="#0284c7" strokeWidth={2} markerEnd="url(#dcCurrentArrow)" />
            <line x1={120} y1={145} x2={120} y2={130} stroke="#0284c7" strokeWidth={2} markerEnd="url(#dcCurrentArrow)" />
            <text x={175} y={115} fill="#0284c7" fontSize={11} fontWeight="bold">I →</text>
          </g>
        )}

        {showCallouts && (
          <g>
            <text x={235} y={30} textAnchor="middle" fill="#c2410c" fontSize={12} fontWeight="bold">
              Fixed Resistor
            </text>
            <line x1={235} y1={34} x2={235} y2={50} stroke="#c2410c" strokeWidth={1.2} />

            {showBulb && (
              <g>
                <text x={380} y={30} textAnchor="middle" fill="#c2410c" fontSize={12} fontWeight="bold">
                  Resistive Load (Lamp)
                </text>
                <line x1={380} y1={34} x2={380} y2={68} stroke="#c2410c" strokeWidth={1.2} />
              </g>
            )}

            {showAmmeter && (
              <g>
                <text x={605} y={225} fill="#c2410c" fontSize={12} fontWeight="bold">
                  Series Ammeter
                </text>
                <line x1={600} y1={225} x2={566} y2={235} stroke="#c2410c" strokeWidth={1.2} />
              </g>
            )}

            {showVoltmeter && (
              <g>
                <text x={120} y={165} textAnchor="end" fill="#c2410c" fontSize={12} fontWeight="bold">
                  Parallel Voltmeter
                </text>
                <line x1={125} y1={162} x2={213} y2={160} stroke="#c2410c" strokeWidth={1.2} />
              </g>
            )}

            <text x={335} y={445} textAnchor="middle" fill="#c2410c" fontSize={12} fontWeight="bold">
              DC Voltage Source (Battery)
            </text>
            <line x1={335} y1={432} x2={335} y2={418} stroke="#c2410c" strokeWidth={1.2} />
          </g>
        )}
      </svg>
    </div>
  )
}
