import {
	Paper,
	Table as MuiTable,
	TableBody as MuiTableBody,
	TableCell as MuiTableCell,
	TableContainer as MuiTableContainer,
	TableHead as MuiTableHead,
	TablePagination as MuiTablePagination,
	TableRow as MuiTableRow,
	TableSortLabel as MuiTableSortLabel
} from '@mui/material';
import { isNullish, isNullishOrEmpty, NonNullObject } from '@sapphire/utilities';
import clsx from 'clsx';
import sort from 'lodash/orderBy';
import { ChangeEvent, Fragment, MouseEvent, ReactElement, ReactNode, useEffect, useState } from 'react';

import { isSortableTableHeaderCell, SortDirection, TableProps } from './TableTypes';

function objectEntries<T extends NonNullObject>(obj: T): [keyof T, T[keyof T]][] {
	return Object.entries(obj) as [keyof T, T[keyof T]][];
}

const Table = <T extends NonNullObject>({
	defaultRowsPerPage = 10,
	defaultRowsPerPageOptions = [10, 25, 50, 100],
	defaultPage = 0,
	data,
	defaultSorting,
	headers,
	cellRenderStrategy,
	collGroups = [],
	ContentToRenderAboveRowCells = () => <></>,
	ContentToRenderBelowRowCells = () => <></>,
	PaperProps,
	TableContainerProps,
	TableProps,
	TableHeadProps,
	TableBodyProps,
	TableBodyRowProps,
	TableHeadRowProps,
	TableHeadCellProps,
	TablePaginationProps
}: TableProps<T>): ReactElement<TableProps<T>> | null => {
	// State for keeping track of the ordering and pagination
	const [page, setPage] = useState(defaultPage);
	const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
	const [sorting, setSorting] = useState(defaultSorting);

	// Update the rows per page state when defaultRowsPerPage prop changes
	useEffect(() => {
		setRowsPerPage(defaultRowsPerPage);
	}, [defaultRowsPerPage]);

	// Update the current page state when defaultPage prop changes, or when the data changes
	useEffect(() => {
		setPage(defaultPage);
	}, [defaultPage, data]);

	const getNewSortingDirection = (currentValue: SortDirection | undefined): SortDirection => {
		switch (currentValue) {
			case 'desc':
				return 'unsorted';
			case 'unsorted':
				return 'asc';
			case 'asc':
			default:
				return 'desc';
		}
	};

	/**
	 * Changes the order of sorting.
	 *
	 * This will iterate over the entire key/value pairs of the state
	 * and when the key matches the clicked column then it will delete
	 * that key from the object, resolve the new sort direction, and
	 * finally assign it back to the top of the state and return that
	 * as the new state object.
	 *
	 * If no key is matched with the currently clicked column then the state is not modified.
	 * @param clickedColumn
	 */
	const changeOrder = (clickedColumn: keyof T) => {
		setSorting((currentState) => ({
			...currentState,
			[clickedColumn]: getNewSortingDirection(currentState[clickedColumn])
		}));
	};

	const handleClickTableSort = (newColumnToOrderBy: keyof T) => (_: MouseEvent<unknown>) => changeOrder(newColumnToOrderBy);

	/**
	 * This sorts the provided data using {@link sort} which is
	 * an alias for [lodash/orderBy](https://lodash.com/docs/4.17.15#orderBy)
	 *
	 * The key and values to use for the sorting are resolved
	 * from their respective key/value pairs as stored in {@link sortingStrategy}
	 */
	const getSortedData = (): T[] => {
		const keys: (keyof T)[] = [];
		const values: Exclude<SortDirection, 'unsorted'>[] = [];

		for (const [key, value] of objectEntries(sorting)) {
			if (value && value !== 'unsorted') {
				keys.push(key);
				values.push(value);
			}
		}

		return sort(data, keys, values);
	};

	const handleChangePage = (_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	if (isNullishOrEmpty(data)) {
		return null;
	}

	return (
		<Paper elevation={3} {...PaperProps}>
			<MuiTableContainer
				{...TableContainerProps}
				classes={{
					...TableContainerProps?.classes,
					root: clsx(TableContainerProps?.classes?.root)
				}}
			>
				<MuiTable {...TableProps} stickyHeader={true}>
					{isNullishOrEmpty(collGroups) ? null : (
						<colgroup>
							{collGroups.map((groupWidth, colgroupIndex) => (
								<col key={colgroupIndex} style={{ width: groupWidth }} />
							))}
						</colgroup>
					)}
					<MuiTableHead {...TableHeadProps}>
						<MuiTableRow {...TableHeadRowProps}>
							{objectEntries(headers).map<ReactNode>(([key, header], headerIndex) => {
								if (isNullish(header)) {
									return null;
								}

								if (header.conditionalShouldRender ?? true) {
									const headerCellIsSortable = isSortableTableHeaderCell(key, Object.keys(data[0]));
									let HeaderCell: JSX.Element;

									if (headerCellIsSortable) {
										const sortingKeyAsKeyofT = sorting[key as keyof T];

										HeaderCell = (
											<MuiTableCell
												{...TableHeadCellProps}
												key={headerIndex}
												variant="head"
												sortDirection={
													sortingKeyAsKeyofT === 'unsorted'
														? false
														: (sortingKeyAsKeyofT as Exclude<SortDirection, 'unsorted'>)
												}
												sx={{
													...TableHeadCellProps?.sx,
													fontWeight: 'bold',
													pr: 1
												}}
											>
												<MuiTableSortLabel
													id={`table_sort_${String(key as keyof T)}`}
													active={sortingKeyAsKeyofT !== 'unsorted'}
													direction={
														sortingKeyAsKeyofT === 'unsorted'
															? undefined
															: (sortingKeyAsKeyofT as Exclude<SortDirection, 'unsorted'>)
													}
													onClick={handleClickTableSort(key as keyof T)}
												>
													{header.label}
												</MuiTableSortLabel>
											</MuiTableCell>
										);
									} else {
										HeaderCell = (
											<MuiTableCell
												{...TableHeadCellProps}
												key={headerIndex}
												variant="head"
												sortDirection={false}
												sx={{
													...TableHeadCellProps?.sx,
													fontWeight: 'bold',
													pr: 1
												}}
											>
												{header.label}
											</MuiTableCell>
										);
									}

									return HeaderCell;
								}

								if (header.conditionalFallback) {
									return header.conditionalFallback;
								}

								return null;
							})}
						</MuiTableRow>
					</MuiTableHead>
					<MuiTableBody {...TableBodyProps}>
						{getSortedData()
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((dataEntry, rowIndex) => (
								<Fragment key={rowIndex}>
									<MuiTableRow {...(isNullish(TableBodyRowProps) ? null : TableBodyRowProps(dataEntry))} key={rowIndex}>
										{ContentToRenderAboveRowCells ? ContentToRenderAboveRowCells(dataEntry) : null}
										{objectEntries(cellRenderStrategy).map<ReactNode>(([cellRenderKey, cellRenderValue], dataKeyIndex) => {
											if (isNullish(cellRenderValue)) {
												return null;
											}

											const dataValueAtKey = Reflect.get(dataEntry, cellRenderKey);

											if (cellRenderValue.conditionalShouldRender ?? true) {
												return (
													<MuiTableCell
														{...(cellRenderValue.TableCellProps ? cellRenderValue.TableCellProps(dataEntry) : null)}
														key={dataKeyIndex}
														variant="body"
														sx={{
															...(cellRenderValue.sticky && {
																position: 'sticky',
																top: 0,
																left: 0
															})
														}}
													>
														{cellRenderValue.render({ value: dataValueAtKey, rowIndex, object: dataEntry })}
													</MuiTableCell>
												);
											}

											if (cellRenderValue.conditionalFallback) {
												return cellRenderValue.conditionalFallback;
											}

											return null;
										})}
										{ContentToRenderBelowRowCells ? ContentToRenderBelowRowCells(dataEntry) : null}
									</MuiTableRow>
								</Fragment>
							))}
					</MuiTableBody>
				</MuiTable>
			</MuiTableContainer>
			<MuiTablePagination
				{...TablePaginationProps}
				component="div"
				count={data.length}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={defaultRowsPerPageOptions}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				backIconButtonProps={{ ...TablePaginationProps?.backIconButtonProps, id: 'table_previous_page_button' }}
				nextIconButtonProps={{ ...TablePaginationProps?.nextIconButtonProps, id: 'table_next_page_button' }}
			/>
		</Paper>
	);
};

export default Table;
