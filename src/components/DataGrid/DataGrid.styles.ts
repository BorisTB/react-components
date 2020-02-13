import styled from '@emotion/styled'
import { css } from '@emotion/core'

const isFunction = (val: any): val is Function => typeof val === 'function'

const breakpoint = '@media screen and (max-width: 800px)'

const cellStyles = css`
  display: table-cell;
  padding: 1px 10px;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.9rem;
  font-weight: 400;
  vertical-align: inherit;
  white-space: nowrap;
  border-bottom: 1px solid rgba(224, 224, 224, 1);

  &:last-of-type {
    padding-right: 24px;
  }
`

export interface TdProps {
  align?: 'left' | 'center' | 'right'
  maxWidth?: string
}

const Td = styled('td')<TdProps>`
  ${cellStyles}
  max-width: ${({ maxWidth = 'unset' }) => maxWidth};
  text-align: ${({ align = 'left' }) => align};

`

export interface ThProps {
  sortable: boolean
}

const Th = styled('th')<ThProps>`
  ${cellStyles}

  ${breakpoint} {
    display: ${({ sortable }) => (sortable ? 'table-cell' : 'none')};
  }
`

export interface SorterProps {
  active: boolean
  asc: boolean
}

const sorterActiveStyles = ({ active, asc }: SorterProps) =>
  active
    ? css`
  span {
    &:before {
      content: "${asc ? '▲' : '▼'}  ";
    }
  }
`
    : css``

const Sorter = styled('div')<SorterProps>`
  color: #2196f3;
  font-weight: bolder;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  ${sorterActiveStyles}
`

const Col = styled('col')(({ width }) => ({
  width
}))

export interface TrProps {
  loading?: boolean
  hover?: boolean
  onClick?: (...args: any[]) => any
}

const Tr = styled('tr')<TrProps>`
  display: table-row;
  height: 48px;
  color: inherit;
  vertical-align: middle;
  outline: none;
  opacity: ${({ loading }) => (loading ? '.6' : 1)};
  transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);

  ${({ onClick }) => (isFunction(onClick) ? 'cursor: pointer;' : null)} :hover {
    background-color: ${({ hover }) =>
      hover ? 'rgba(0, 0, 0, 0.08)' : 'transparent'};
  }
`

const Tbody = styled('tbody')`
  display: table-row-group;
`

const Thead = styled('thead')``

const Wrapper = styled('div')`
  overflow: auto;
`

export interface CellContentProps {
  truncate?: boolean
}

const CellContent = styled('div')<CellContentProps>`
  ${({ truncate }) =>
    truncate
      ? css`
          overflow: hidden;
          text-overflow: ellipsis;
        `
      : css``}
`

const CellHeader = styled('div')`
  display: none;
  font-weight: bolder;
`

const Table = styled('table')`
  display: table;
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;

  ${breakpoint} {
    ${Thead} {
      ${Tr} {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;

        ${Th} {
          padding: 0;
          border: none;
        }

        ${Sorter} {
          padding: 10px;
        }
      }
    }

    ${Tbody} {
      display: flex;
      flex-direction: column;
      padding: 16px;
    }

    ${Tr} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      height: 100%;
      background: #fff;
      border: 1px solid rgba(0, 0, 0, 0.12);

      & + ${Tr} {
        margin-top: 40px;
      }
    }

    ${Td} {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 100%;
      padding: 10px;
      text-align: right;
      white-space: pre-line;

      &:last-of-type {
        padding: 10px;
      }
    }

    ${CellHeader} {
      display: block;
      flex: 1;
      text-align: left;
    }

    ${CellContent} {
      flex: 2;
      text-align: right;
    }
  }
`

export {
  CellContent,
  CellHeader,
  Col,
  Sorter,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Wrapper
}
