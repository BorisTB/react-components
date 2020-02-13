import React, { useEffect, useRef } from 'react'
import { Column, Container, Icon, Item, Title } from './Finder.styles'

export interface DataItem {
  [key: string]: any
  children?: this[] | null
}

export interface RowItemProps {
  disabled?: boolean
  selected?: boolean
  onClick: () => void
  item: DataItem
  title?: string | null
}

const RowItem: React.FC<RowItemProps> = ({ disabled, selected, onClick, item, title }) => (
  <Item selected={selected} disabled={disabled} onClick={onClick}>
    <Title>{title}</Title>
    {item.children && item.children.length ? <Icon>{'>'}</Icon> : null}
  </Item>
)

export interface FinderProps<T extends DataItem> {
  dataSource: T[]
  selectedItems: T[]
  onSelect: (newSelectedItems: T[], item: T, index: number) => any
  isDisabled?: (item: T) => boolean
  keyFieldName: keyof T
  renderItemTitle: (item: T) => string | null | undefined
}

const Finder = <T extends DataItem>({ dataSource, selectedItems, onSelect, isDisabled, keyFieldName, renderItemTitle }: FinderProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.scrollTop = 0
      containerRef.current.scrollLeft += 270
    }
  }, [selectedItems.length])

  const getOnClick = (index: number, item: T) => () => {
    const newSelectedItems = [...selectedItems]
    newSelectedItems.length = index + 1
    newSelectedItems[index] = item

    onSelect(newSelectedItems, item, index)
  }

  return (
    <Container ref={containerRef}>
      <Column>
        {dataSource.map(item => (
          <RowItem
            key={item[keyFieldName]}
            selected={selectedItems[0] && selectedItems[0][keyFieldName] === item[keyFieldName]}
            onClick={getOnClick(0, item)}
            item={item}
            title={renderItemTitle(item)}
            disabled={isDisabled && isDisabled(item)}
          />
        ))}
      </Column>
      {selectedItems.map((parentItem, index) =>
        parentItem.children && parentItem.children.length ? (
          <Column key={`col-${parentItem[keyFieldName]}`}>
            {parentItem.children.map(item => (
              <RowItem
                key={`row-${item[keyFieldName]}`}
                selected={selectedItems[index + 1] && selectedItems[index + 1][keyFieldName] === item[keyFieldName]}
                onClick={getOnClick(index + 1, item)}
                item={item}
                title={renderItemTitle(item)}
                disabled={isDisabled && isDisabled(item)}
              />
            ))}
          </Column>
        ) : null
      )}
    </Container>
  )
}

Finder.defaultProps = {
  keyFieldName: 'id',
  renderItemTitle: (item: DataItem) => item && item.title
}

export default Finder
