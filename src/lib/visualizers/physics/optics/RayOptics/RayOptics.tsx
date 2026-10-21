import React from 'react'
import type { RayOpticsProps } from './RayOptics.types'

export const RayOptics: React.FC<RayOpticsProps> = ({
  lensType = 'convex',
  focalLength = 50,
  objectDistance = 80,
  objectHeight = 40,
  showRays = true,
  showLabels = true,
  showCallouts = true,
  showFormula = true,
  width = '100%',
  height = 'auto',
  className = '',
}) => {
  const scale = 2.4
  const centerX = 340
  const axisY = 240

  const fSign = lensType === 'convex' ? focalLength : -focalLength
  const fPx = Math.abs(focalLength) * scale
  const doPx = objectDistance * scale
  const hoPx = objectHeight * scale

  const di = (fSign * objectDistance) / (objectDistance - fSign)
  const diPx = di * scale
  const hiPx = -hoPx * (di / objectDistance)

  const objX = centerX - doPx
  const objTipY = axisY - hoPx

  const imgX = centerX + diPx
  const imgTipY = axisY + hiPx

  const isReal = di > 0

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

        <line x1={20} y1={axisY} x2={660} y2={axisY} stroke="#94a3b8" strokeWidth={1.5} />

        <line
          x1={centerX}
          y1={60}
          x2={centerX}
          y2={420}
          stroke="#0284c7"
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />

        {lensType === 'convex' ? (
          <path
            d={`
              M ${centerX} 70
              Q ${centerX + 18} ${axisY} ${centerX} 410
              Q ${centerX - 18} ${axisY} ${centerX} 70
              Z
            `}
            fill="#e0f2fe"
            fillOpacity={0.65}
            stroke="#0284c7"
            strokeWidth={2.2}
          />
        ) : (
          <path
            d={`
              M ${centerX - 14} 70
              L ${centerX + 14} 70
              Q ${centerX + 3} ${axisY} ${centerX + 14} 410
              L ${centerX - 14} 410
              Q ${centerX - 3} ${axisY} ${centerX - 14} 70
              Z
            `}
            fill="#e0f2fe"
            fillOpacity={0.65}
            stroke="#0284c7"
            strokeWidth={2.2}
          />
        )}

        <circle cx={centerX} cy={axisY} r={3.5} fill="#0369a1" />
        <text x={centerX - 12} y={axisY + 16} fill="#0369a1" fontSize={12} fontWeight="bold">
          O
        </text>

        <circle cx={centerX - fPx} cy={axisY} r={3} fill="#0f172a" />
        <text x={centerX - fPx} y={axisY + 18} textAnchor="middle" fill="#0f172a" fontSize={11} fontWeight="bold">
          F₁
        </text>

        <circle cx={centerX - 2 * fPx} cy={axisY} r={3} fill="#0f172a" />
        <text x={centerX - 2 * fPx} y={axisY + 18} textAnchor="middle" fill="#0f172a" fontSize={11} fontWeight="bold">
          2F₁
        </text>

        <circle cx={centerX + fPx} cy={axisY} r={3} fill="#0f172a" />
        <text x={centerX + fPx} y={axisY + 18} textAnchor="middle" fill="#0f172a" fontSize={11} fontWeight="bold">
          F₂
        </text>

        <circle cx={centerX + 2 * fPx} cy={axisY} r={3} fill="#0f172a" />
        <text x={centerX + 2 * fPx} y={axisY + 18} textAnchor="middle" fill="#0f172a" fontSize={11} fontWeight="bold">
          2F₂
        </text>

        <g>
          <line x1={objX} y1={axisY} x2={objX} y2={objTipY} stroke="#1e293b" strokeWidth={3} />
          <polygon
            points={`${objX - 5},${objTipY + 8} ${objX + 5},${objTipY + 8} ${objX},${objTipY}`}
            fill="#1e293b"
          />
          {showLabels && (
            <text x={objX} y={objTipY - 8} textAnchor="middle" fill="#1e293b" fontSize={12} fontWeight="bold">
              Object
            </text>
          )}
        </g>

        {showRays && lensType === 'convex' && isReal && (
          <g>
            <path
              d={`
                M ${objX} ${objTipY}
                L ${centerX} ${objTipY}
                L ${imgX} ${imgTipY}
              `}
              fill="none"
              stroke="#ef4444"
              strokeWidth={1.8}
            />

            <line
              x1={objX}
              y1={objTipY}
              x2={imgX}
              y2={imgTipY}
              stroke="#2563eb"
              strokeWidth={1.8}
            />

            <path
              d={`
                M ${objX} ${objTipY}
                L ${centerX - fPx} ${axisY}
                L ${centerX} ${imgTipY}
                L ${imgX} ${imgTipY}
              `}
              fill="none"
              stroke="#059669"
              strokeWidth={1.8}
            />
          </g>
        )}

        {isReal && (
          <g>
            <line
              x1={imgX}
              y1={axisY}
              x2={imgX}
              y2={imgTipY}
              stroke="#7c3aed"
              strokeWidth={3}
              strokeDasharray={isReal ? undefined : '4 4'}
            />
            <polygon
              points={`${imgX - 5},${imgTipY - 8} ${imgX + 5},${imgTipY - 8} ${imgX},${imgTipY}`}
              fill="#7c3aed"
            />
            {showLabels && (
              <text x={imgX} y={imgTipY + 18} textAnchor="middle" fill="#7c3aed" fontSize={12} fontWeight="bold">
                Image (Real & Inverted)
              </text>
            )}
          </g>
        )}

        <g>
          <line x1={objX} y1={axisY + 38} x2={centerX} y2={axisY + 38} stroke="#475569" strokeWidth={1.2} />
          <line x1={objX} y1={axisY + 32} x2={objX} y2={axisY + 44} stroke="#475569" strokeWidth={1.2} />
          <line x1={centerX} y1={axisY + 32} x2={centerX} y2={axisY + 44} stroke="#475569" strokeWidth={1.2} />
          <text
            x={(objX + centerX) / 2}
            y={axisY + 52}
            textAnchor="middle"
            fill="#475569"
            fontSize={11}
            fontWeight="bold"
          >
            d_o = {objectDistance} cm
          </text>

          {isReal && (
            <g>
              <line x1={centerX} y1={axisY + 38} x2={imgX} y2={axisY + 38} stroke="#475569" strokeWidth={1.2} />
              <line x1={imgX} y1={axisY + 32} x2={imgX} y2={axisY + 44} stroke="#475569" strokeWidth={1.2} />
              <text
                x={(centerX + imgX) / 2}
                y={axisY + 52}
                textAnchor="middle"
                fill="#475569"
                fontSize={11}
                fontWeight="bold"
              >
                d_i = {di.toFixed(1)} cm
              </text>
            </g>
          )}
        </g>

        {showFormula && (
          <g>
            <rect
              x={150}
              y={415}
              width={380}
              height={45}
              rx={6}
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth={1.5}
            />
            <text x={340} y={434} textAnchor="middle" fill="#0f172a" fontSize={12} fontWeight="bold">
              Thin Lens Equation: 1/f = 1/d_o + 1/d_i | f = {focalLength} cm
            </text>
            <text x={340} y={450} textAnchor="middle" fill="#475569" fontSize={11}>
              Magnification m = -d_i / d_o = {(-di / objectDistance).toFixed(2)}×
            </text>
          </g>
        )}

        {showCallouts && (
          <g>
            <text x={340} y={45} textAnchor="middle" fill="#c2410c" fontSize={12} fontWeight="bold">
              Biconvex Thin Lens
            </text>
            <line x1={340} y1={48} x2={340} y2={65} stroke="#c2410c" strokeWidth={1.2} />

            <text x={640} y={230} textAnchor="end" fill="#c2410c" fontSize={11} fontWeight="bold">
              Principal Axis
            </text>

            <text x={235} y={120} textAnchor="end" fill="#ef4444" fontSize={10} fontWeight="bold">
              Ray 1 (Parallel)
            </text>
            <text x={315} y={215} textAnchor="end" fill="#2563eb" fontSize={10} fontWeight="bold">
              Ray 2 (Central)
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}
