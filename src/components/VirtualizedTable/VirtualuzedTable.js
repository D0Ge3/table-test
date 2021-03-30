import React from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
// eslint-disable-next-line
import { AutoSizer, Column, Table, CellMeasurerCache, CellMeasurer } from 'react-virtualized'

const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    },
  },
  tableRow: {
    cursor: 'pointer',
    border: '1px solid rgb(224, 224, 224)',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
    borderBottom: 'none',
  },
  noClick: {
    cursor: 'initial',
  },
})
const MIN_TABLE_WIDTH = 2500
class MuiVirtualizedTable extends React.PureComponent {
  // eslint-disable-next-line
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  }
  cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 48,
  })

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    })
  }

  cellRenderer = ({ cellData, columnIndex, parent, rowIndex }) => {
    const { columns, classes, onRowClick } = this.props

    if (columns[columnIndex].image) {
      return (
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, {
            [classes.noClick]: onRowClick == null,
          })}
          variant="body"
          align={
            (columnIndex != null && columns[columnIndex].numeric) || false ?'right' : 'left'
          }
        >
          <img width="150" src={cellData} alt="лого" />
        </TableCell>
      )
    }
    if (columns[columnIndex].link) {
      return (
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, {
            [classes.noClick]: onRowClick == null,
          })}
          variant="body"
          align={
            (columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'
          }
        >
          <a href={cellData}>{cellData}</a>
        </TableCell>
      )
    }
    if (columns[columnIndex].numbering) {
      return (
        <CellMeasurer
          // key={undefined}
          cache={this.cache}
          parent={parent}
          columnIndex={columnIndex}
          rowIndex={rowIndex}
        >
          <TableCell
            component="div"
            className={clsx(classes.tableCell, classes.flexContainer, {
              [classes.noClick]: onRowClick == null,
            })}
            variant="body"
            align={
              (columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'
            }
          >
            {rowIndex + 1}
          </TableCell>
        </CellMeasurer>
      )
    }
    return (
      <CellMeasurer
        // key={undefined}
        cache={this.cache}
        parent={parent}
        columnIndex={columnIndex}
        rowIndex={rowIndex}
      >
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, {
            [classes.noClick]: onRowClick == null,
          })}
          variant="body"
          align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
        >
          {cellData}
        </TableCell>
      </CellMeasurer>
    )
  }

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    )
  }

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width < MIN_TABLE_WIDTH ? MIN_TABLE_WIDTH : width}
            rowHeight={this.cache.rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            deferredMeasurementCache={this.cache}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              )
            })}
          </Table>
        )}
      </AutoSizer>
    )
  }
}

export const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable)