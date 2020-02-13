import styled from '@emotion/styled'

const Container = styled('div')`
  display: flex;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  overflow-y: hidden;
`

const Column = styled('div')`
  display: flex;
  flex-direction: column;
  width: 210px;
  min-width: 210px;
  max-width: 210px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
  overflow-y: auto;
`

export interface ItemProps {
  disabled?: boolean
  selected?: boolean
}

const Item = styled('div')<ItemProps>`
  display: flex;
  align-items: center;
  height: 24px;
  padding: 6px 4px;
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 0.8rem;
  background: ${({ selected }) => (selected ? '#00bcd4' : 'transparent')};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background: ${({ selected }) =>
      selected ? '#0097a7' : 'rgba(0, 0, 0, .1)'};
  }

  ${({ selected }) =>
    selected
      ? {
          position: 'sticky',
          top: 0,
          bottom: 0
        }
      : {}}

  ${({ disabled }) =>
    disabled
      ? {
          opacity: '.6',
          pointerEvents: 'none'
        }
      : {}}
`

const Title = styled('div')`
  display: flex;
  align-items: center;
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Icon = styled('div')`
  display: flex;
  align-items: center;
`

export { Column, Container, Icon, Item, Title }
