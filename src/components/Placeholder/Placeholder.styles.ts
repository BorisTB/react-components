import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'

const loadingAnimation = keyframes`
  0% {
    left: -500px
  }
  100% {
    left: 100%
  }
`

export interface LoaderProps {
  width?: string | number | null
  height?: string | number | null
  color: string
}

const Loader = styled('span')<LoaderProps>`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '1rem')};
  background-color: ${({ color }) => color};
  border-radius: 4px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 500px;
    top: 0;
    left: -500px;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0)
    );
    animation: ${loadingAnimation} 1.2s ease-in-out infinite;
  }
`

export { Loader }
