import React, { useEffect } from 'react';
import { GalvanicCellProps } from './GalvanicCell.types';
import { computeGalvanicCellState } from './galvanicMath';
import { HalfCell } from './parts/HalfCell';
import { SaltBridge } from '@/lib/core/primitives/SaltBridge';
import { Voltmeter } from '@/lib/core/primitives/Voltmeter';

export const GalvanicCell: React.FC<GalvanicCellProps> = ({
  details,
  anodeMetal = 'Zn',
  cathodeMetal = 'Cu',
  anodeConcentration = 1.0,
  cathodeConcentration = 1.0,
  temperatureKelvin = 298.15,
  showVoltmeter = true,
  showVoltmeterLabel,
  showCallouts,
  showElectronFlow,
  showWireFlow,
  showSaltBridgeLabel,
  showSaltBridgeIons,
  showReactionArrows,
  showLabels = true,
  width = '100%',
  height = 'auto',
  className = '',
  style,
  onVoltageChange
}) => {
  const isVoltmeterLabelVisible = showVoltmeterLabel ?? showLabels;
  const isCalloutsVisible = showCallouts ?? showLabels;
  const isElectronFlowVisible = showElectronFlow ?? showLabels;
  const isWireFlowVisible = showWireFlow ?? showLabels;
  const isSaltBridgeLabelVisible = showSaltBridgeLabel ?? showLabels;
  const isSaltBridgeIonsVisible = showSaltBridgeIons ?? showLabels;
  const isReactionArrowsVisible = showReactionArrows ?? showLabels;

  const cellState = computeGalvanicCellState({
    anode: {
      metal: details?.anode?.metal ?? anodeMetal,
      concentration: details?.anode?.concentration ?? anodeConcentration,
      ...details?.anode
    },
    cathode: {
      metal: details?.cathode?.metal ?? cathodeMetal,
      concentration: details?.cathode?.concentration ?? cathodeConcentration,
      ...details?.cathode
    },
    temperatureKelvin: details?.temperatureKelvin ?? temperatureKelvin,
    saltBridgeElectrolyte: details?.saltBridgeElectrolyte ?? 'KNO₃(aq)'
  });

  const { anode, cathode, nernst } = cellState;

  useEffect(() => {
    if (onVoltageChange) {
      onVoltageChange(nernst.cellPotential);
    }
  }, [nernst.cellPotential, onVoltageChange]);

  const svgWidth = 760;
  const svgHeight = isElectronFlowVisible ? 450 : 400;

  const voltmeterCenterX = 380;
  const voltmeterY = 26;
  const voltmeterWidth = 112;
  const voltmeterHeight = 44;

  const leftBeakerX = 110;
  const rightBeakerX = 450;
  const beakerY = 175;
  const beakerWidth = 200;
  const beakerHeight = 180;

  const leftElectrodeX = 150;
  const leftElectrodeWidth = 36;
  const leftElectrodeY = 155;
  const leftElectrodeHeight = 155;
  const leftElectrodeCenterX = leftElectrodeX + leftElectrodeWidth / 2;

  const rightElectrodeX = 574;
  const rightElectrodeWidth = 36;
  const rightElectrodeY = 155;
  const rightElectrodeHeight = 155;
  const rightElectrodeCenterX = rightElectrodeX + rightElectrodeWidth / 2;

  const saltBridgeStartX = 230;
  const saltBridgeEndX = 530;
  const saltBridgeTopY = 114;
  const saltBridgeDepthY = 295;
  const saltBridgeThickness = 34;

  const voltmeterLeftTerminal = voltmeterCenterX - voltmeterWidth / 2;
  const voltmeterRightTerminal = voltmeterCenterX + voltmeterWidth / 2;
  const wireY = voltmeterY + voltmeterHeight / 2;

  const leftWirePath = `
    M ${leftElectrodeCenterX} ${leftElectrodeY}
    L ${leftElectrodeCenterX} ${wireY + 12}
    Q ${leftElectrodeCenterX} ${wireY} ${leftElectrodeCenterX + 16} ${wireY}
    L ${voltmeterLeftTerminal} ${wireY}
  `;

  const rightWirePath = `
    M ${voltmeterRightTerminal} ${wireY}
    L ${rightElectrodeCenterX - 16} ${wireY}
    Q ${rightElectrodeCenterX} ${wireY} ${rightElectrodeCenterX} ${wireY + 12}
    L ${rightElectrodeCenterX} ${rightElectrodeY}
  `;

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      style={{ width, ...style }}
      role="img"
      aria-label="Galvanic Cell Diagram"
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <defs>
          <marker
            id="wire-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#0f172a" />
          </marker>

          <marker
            id="callout-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#c2410c" />
          </marker>

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

        <path
          d={leftWirePath}
          fill="none"
          stroke="#0f172a"
          strokeWidth={2.2}
          strokeLinecap="round"
        />

        <path
          d={rightWirePath}
          fill="none"
          stroke="#0f172a"
          strokeWidth={2.2}
          strokeLinecap="round"
        />

        {isWireFlowVisible && (
          <g>
            <path
              d={`M ${leftElectrodeCenterX - 8} ${wireY - 8} Q ${leftElectrodeCenterX + 25} ${wireY - 26} ${voltmeterLeftTerminal - 15} ${wireY - 26}`}
              fill="none"
              stroke="#0f172a"
              strokeWidth={1.8}
              markerEnd="url(#wire-arrow)"
            />
            <text
              x={leftElectrodeCenterX - 14}
              y={leftElectrodeY - 35}
              fill="#0f172a"
              fontSize={13}
              fontWeight="bold"
            >
              e⁻
            </text>

            <path
              d={`M ${voltmeterRightTerminal + 15} ${wireY - 26} Q ${rightElectrodeCenterX - 25} ${wireY - 26} ${rightElectrodeCenterX + 8} ${wireY - 8}`}
              fill="none"
              stroke="#0f172a"
              strokeWidth={1.8}
              markerEnd="url(#wire-arrow)"
            />
            <text
              x={rightElectrodeCenterX + 8}
              y={rightElectrodeY - 35}
              fill="#0f172a"
              fontSize={13}
              fontWeight="bold"
            >
              e⁻
            </text>
          </g>
        )}

        {showVoltmeter && (
          <Voltmeter
            x={voltmeterCenterX}
            y={voltmeterY}
            width={voltmeterWidth}
            height={voltmeterHeight}
            voltage={nernst.cellPotential}
            showLabel={isVoltmeterLabelVisible}
          />
        )}

        <SaltBridge
          startX={saltBridgeStartX}
          endX={saltBridgeEndX}
          topY={saltBridgeTopY}
          depthY={saltBridgeDepthY}
          tubeThickness={saltBridgeThickness}
          label={`Salt Bridge [${details?.saltBridgeElectrolyte ?? 'KNO₃(aq)'}]`}
          showLabel={isSaltBridgeLabelVisible}
          showIons={isSaltBridgeIonsVisible}
        />

        <HalfCell
          x={leftBeakerX}
          y={beakerY}
          width={beakerWidth}
          height={beakerHeight}
          electrodeX={leftElectrodeX}
          electrodeY={leftElectrodeY}
          electrodeWidth={leftElectrodeWidth}
          electrodeHeight={leftElectrodeHeight}
          electrodeMetal={anode.metal}
          couple={anode.couple}
          type="anode"
          showReactionArrows={isReactionArrowsVisible}
        />

        <HalfCell
          x={rightBeakerX}
          y={beakerY}
          width={beakerWidth}
          height={beakerHeight}
          electrodeX={rightElectrodeX}
          electrodeY={rightElectrodeY}
          electrodeWidth={rightElectrodeWidth}
          electrodeHeight={rightElectrodeHeight}
          electrodeMetal={cathode.metal}
          couple={cathode.couple}
          type="cathode"
          showReactionArrows={isReactionArrowsVisible}
        />

        {isCalloutsVisible && (
          <g>
            <text
              x={40}
              y={wireY + 5}
              fill="#c2410c"
              fontSize={13}
              fontWeight="bold"
            >
              Wire
            </text>
            <line
              x1={78}
              y1={wireY}
              x2={leftElectrodeCenterX}
              y2={wireY}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text
              x={35}
              y={leftElectrodeY + 75}
              fill="#c2410c"
              fontSize={14}
              fontWeight="bold"
            >
              Anode
            </text>
            <line
              x1={86}
              y1={leftElectrodeY + 70}
              x2={leftElectrodeX}
              y2={leftElectrodeY + 70}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text
              x={670}
              y={saltBridgeTopY + 45}
              fill="#c2410c"
              fontSize={13}
              fontWeight="bold"
            >
              Salt Bridge
            </text>
            <line
              x1={665}
              y1={saltBridgeTopY + 40}
              x2={saltBridgeEndX}
              y2={saltBridgeTopY + 40}
              stroke="#c2410c"
              strokeWidth={1.5}
            />

            <text
              x={670}
              y={rightElectrodeY + 75}
              fill="#c2410c"
              fontSize={14}
              fontWeight="bold"
            >
              Cathode
            </text>
            <line
              x1={665}
              y1={rightElectrodeY + 70}
              x2={rightElectrodeX + rightElectrodeWidth}
              y2={rightElectrodeY + 70}
              stroke="#c2410c"
              strokeWidth={1.5}
            />
          </g>
        )}

        {isElectronFlowVisible && (
          <g>
            <line
              x1={270}
              y1={410}
              x2={490}
              y2={410}
              stroke="#c2410c"
              strokeWidth={2}
              markerEnd="url(#callout-arrow)"
            />
            <text
              x={380}
              y={432}
              fill="#c2410c"
              fontSize={13}
              fontWeight="bold"
              textAnchor="middle"
            >
              Flow of Electrons
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
