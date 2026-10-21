import React from 'react';

export interface SaltBridgeProps {
  startX: number;
  endX: number;
  topY: number;
  depthY: number;
  tubeThickness?: number;
  fill?: string;
  stroke?: string;
  label?: string;
  showLabel?: boolean;
  showIons?: boolean;
  className?: string;
}

export const SaltBridge: React.FC<SaltBridgeProps> = ({
  startX,
  endX,
  topY,
  depthY,
  tubeThickness = 32,
  fill = '#f8fafc',
  stroke = '#475569',
  label = 'Salt Bridge [KNO₃(aq)]',
  showLabel = true,
  showIons = true,
  className = ''
}) => {
  const midX = (startX + endX) / 2;
  const plugHeight = 26;
  const cornerRadius = 14;

  const outerLeft = startX;
  const outerRight = endX;
  const innerLeft = startX + tubeThickness;
  const innerRight = endX - tubeThickness;
  const innerTop = topY + tubeThickness;

  const pathD = `
    M ${outerLeft} ${depthY}
    L ${outerLeft} ${topY + cornerRadius}
    Q ${outerLeft} ${topY} ${outerLeft + cornerRadius} ${topY}
    L ${outerRight - cornerRadius} ${topY}
    Q ${outerRight} ${topY} ${outerRight} ${topY + cornerRadius}
    L ${outerRight} ${depthY}
    L ${innerRight} ${depthY}
    L ${innerRight} ${innerTop + cornerRadius}
    Q ${innerRight} ${innerTop} ${innerRight - cornerRadius} ${innerTop}
    L ${innerLeft + cornerRadius} ${innerTop}
    Q ${innerLeft} ${innerTop} ${innerLeft} ${innerTop + cornerRadius}
    L ${innerLeft} ${depthY}
    Z
  `;

  return (
    <g className={className}>
      <defs>
        <marker
          id="salt-arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#0f172a" />
        </marker>
      </defs>

      {showLabel && label && (
        <text
          x={midX}
          y={topY - 12}
          fill="currentColor"
          fontSize={12.5}
          fontWeight="bold"
          textAnchor="middle"
        >
          {label}
        </text>
      )}

      <path
        d={pathD}
        fill={fill}
        fillOpacity={0.85}
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      <rect
        x={outerLeft + 1}
        y={depthY - plugHeight}
        width={tubeThickness - 2}
        height={plugHeight}
        fill="#cbd5e1"
        stroke="#64748b"
        strokeWidth={1.5}
      />

      <rect
        x={innerRight + 1}
        y={depthY - plugHeight}
        width={tubeThickness - 2}
        height={plugHeight}
        fill="#cbd5e1"
        stroke="#64748b"
        strokeWidth={1.5}
      />

      {showIons && (
        <g>
          <text
            x={midX - 42}
            y={innerTop - 8}
            fill="#0f172a"
            fontSize={12}
            fontWeight="bold"
            textAnchor="middle"
          >
            NO₃⁻
          </text>
          <path
            d={`M ${midX - 58} ${innerTop - 12} L ${outerLeft + tubeThickness / 2} ${innerTop - 12} L ${outerLeft + tubeThickness / 2} ${depthY - plugHeight - 8}`}
            fill="none"
            stroke="#0f172a"
            strokeWidth={1.8}
            markerEnd="url(#salt-arrow)"
          />

          <text
            x={midX + 42}
            y={innerTop - 8}
            fill="#0f172a"
            fontSize={12}
            fontWeight="bold"
            textAnchor="middle"
          >
            K⁺
          </text>
          <path
            d={`M ${midX + 58} ${innerTop - 12} L ${outerRight - tubeThickness / 2} ${innerTop - 12} L ${outerRight - tubeThickness / 2} ${depthY - plugHeight - 8}`}
            fill="none"
            stroke="#0f172a"
            strokeWidth={1.8}
            markerEnd="url(#salt-arrow)"
          />
        </g>
      )}
    </g>
  );
};
