import React from 'react'
import { Loader } from './Placeholder.styles'

export interface PlaceholderProps {
  className?: string
  color?: string
  width?: string | number | null
  height?: string | number | null
}

const Placeholder: React.FC<PlaceholderProps> = ({ className, color = '#eee', ...props }) => (
  <span className={className}>
    <Loader color={color} {...props}>&zwnj;</Loader>
  </span>
)

export default Placeholder
