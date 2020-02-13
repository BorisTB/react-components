import React from 'react'
import { CellContent, CellHeader, Col, Sorter, Table, Tbody, Td, Th, Thead, Tr, Wrapper } from './DataGrid.styles'
import Placeholder from '../Placeholder'

export interface ColumnConfig<DataT extends object> {
  Header: string
  Cell: (dataItem: DataT) => React.ReactNode
  sortKey?: keyof DataT
  truncate?: boolean
  width?: number
  maxWidth?: string
  headerAlign?: 'left' | 'center' | 'right'
  cellAlign?: 'left' | 'center' | 'right'
  align?: 'left' | 'center' | 'right'
}

export interface DataGridProps<DataT extends object> {
  columns: ColumnConfig<DataT>[]
  data: DataT[]
  dataIdField?: keyof DataT
  loading?: boolean
  NoData?: React.ReactNode
  sortBy?: keyof DataT
  order?: 'asc' | 'desc'
  onSortChange?: (columnSortKey?: keyof DataT) => any
}

const DataGrid = <DataT extends object>({
  columns,
  data,
  dataIdField = 'id',
  loading,
  NoData = 'No items found.',
  sortBy,
  order,
  onSortChange
}: DataGridProps<DataT>) => {
  const cols: React.ReactNodeArray = []
  const ths: React.ReactNodeArray = []

  columns.forEach((column, i) => {
    cols.push(<Col key={`col-${i}`} width={column.width} />)
    ths.push(
      <Th key={i} align={column.headerAlign || column.align} sortable={!!column.sortKey}>
        {column.sortKey ? (
          <Sorter active={sortBy === column.sortKey} asc={order === 'asc'} onClick={() => onSortChange && onSortChange(column.sortKey)}>
            <span>{column.Header}</span>
          </Sorter>
        ) : (
            <span>{column.Header}</span>
          )}
      </Th>
    )
  })

  return (
    <Wrapper>
      <Table>
        <colgroup>{cols}</colgroup>
        <Thead>
          <Tr>{ths}</Tr>
        </Thead>
        <Tbody>
          {data && data.length ? (
            data.map(dataItem => (
              <Tr key={dataItem[dataIdField]} loading={loading}>
                {columns.map((column, colIndex) => (
                  <Td
                    key={`${dataItem[dataIdField]}-${colIndex}`}
                    align={column.cellAlign || column.align}
                    maxWidth={column.maxWidth}
                  >
                    <CellHeader>{column.Header}</CellHeader>
                    <CellContent truncate={column.truncate}>{column.Cell(dataItem)}</CellContent>
                  </Td>
                ))}
              </Tr>
            ))
          ) : loading ? (
            Array(10)
              .fill(null)
              .map((item, i) => (
                <Tr key={`row-${i}-loading`}>
                  {columns.map((column, colIndex) => (
                    <Td
                      key={`row-${i}-col-${colIndex}-loading`}
                      align={column.cellAlign || column.align}
                      maxWidth={column.maxWidth}
                    >
                      <Placeholder />
                    </Td>
                  ))}
                </Tr>
              ))
          ) : (
                <Tr>
                  <Td align='center' colSpan={columns.length}>
                    {NoData}
                  </Td>
                </Tr>
              )}
        </Tbody>
      </Table>
    </Wrapper>
  )
}

export default DataGrid
