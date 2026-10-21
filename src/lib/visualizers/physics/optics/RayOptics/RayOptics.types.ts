export interface RayOpticsProps {
  lensType?: 'convex' | 'concave'
  focalLength?: number
  objectDistance?: number
  objectHeight?: number
  showRays?: boolean
  showLabels?: boolean
  showCallouts?: boolean
  showFormula?: boolean
  width?: number | string
  height?: number | string
  className?: string
}
