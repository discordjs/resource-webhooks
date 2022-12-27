import type {
	PaperProps as MPaperProps,
	SortDirection as MSortDirection,
	TableBodyProps as MTableBodyProps,
	TableCellProps as MTableCellProps,
	TableContainerProps as MTableContainerProps,
	TableHeadProps as MTableHeadProps,
	TablePaginationProps as MuiTablePaginationProps,
	TableProps as MTableProps,
	TableRowProps as MTableRowProps
} from '@mui/material';
import type { NonNullObject } from '@sapphire/utilities';
import type { ReactElement, ReactNode } from 'react';

export function isSortableTableHeaderCell(key: string | number | symbol, sortableHeaders: (string | number | symbol)[]) {
	return sortableHeaders.includes(key);
}

/** The props for the {@link Table} component */
export interface TableProps<T extends NonNullObject> {
	/** The data to render */
	data: T[];

	/** The default sorting data for this table */
	defaultSorting: Partial<Sorting<T>>;

	/** The headers of the table */
	headers: Partial<TableHeader<T>> & UnsortableTableHeader;

	/** The strategy data for rendering each row */
	cellRenderStrategy: Partial<CellRenderStrategy<T>> & UnsortableCellRenderStrategy<T>;

	/** Optional widths to specify for each column through the `colgroup` element */
	collGroups?: string[];

	/**
	 * The page to start at
	 * @default 0
	 */
	defaultPage?: number;

	/**
	 * The default amount of rows to show per page
	 * @default 10
	 */
	defaultRowsPerPage?: number;

	/**
	 * The default amount of rows per page options
	 * @default [10, 25, 50, 100]
	 */
	defaultRowsPerPageOptions?: number[];

	/**
	 * Additional content to render directly above the opening tag of {@link MuiTableRow}
	 * An example use-case for this is a {@link LoadingProgress} component
	 *
	 * @default Empty fragment
	 */
	ContentToRenderAboveRowCells?: (dataEntry: T) => ReactElement;

	/**
	 * Additional content to render directly below the closing tag of {@link MuiTableRow}
	 * An example use-case for this is dialogs that render independent of rows.
	 *
	 * @default Empty fragment
	 */
	ContentToRenderBelowRowCells?: (dataEntry: T) => ReactElement;

	/** Additional properties to pass to the {@link Paper} component */
	PaperProps?: MPaperProps;

	/** Additional properties to pass to the {@link MuiTableContainer} component */
	TableContainerProps?: MTableContainerProps;

	/** Additional properties to pass to the {@link MuiTable} component */
	TableProps?: MTableProps;

	/** Additional properties to pass to the {@link MuiTableHead} component */
	TableHeadProps?: MTableHeadProps;

	/** Additional properties to pass to the {@link MuiTableBody} component */
	TableBodyProps?: MTableBodyProps;

	/** Additional properties to pass to the {@link MuiTableRow} component for the {@link MuiTableHead} */
	TableHeadRowProps?: MTableRowProps;

	/** Additional properties to pass to the {@link MTableCellProps} component for the {@link MuiTableHead} */
	TableHeadCellProps?: MTableCellProps;

	/** Additional properties to pass to the {@link MuiTableRow} component for each of those in the {@link MuiTableBody} */
	TableBodyRowProps?: (dataEntry: T) => MTableRowProps;

	/** additional properties to pass to the {@link MuiTablePagination} component */
	TablePaginationProps?: OverridableMuiTablePaginationProps;
}

export type SortDirection = Exclude<MSortDirection, false> | 'unsorted';

type Sorting<T extends NonNullObject> = {
	[K in keyof T]: SortDirection;
};

/** Describes how each key in object T should have its label displayed in the header, rendered atop the {@link MuiTable} */
type TableHeader<T extends NonNullObject> = {
	[K in keyof T]: TableHeaderProps;
};

type UnsortableTableHeader = Record<string, TableHeaderProps>;

type UnsortableCellRenderStrategy<T extends NonNullObject> = Record<any, UnsortableCellRenderProps<T>>;

/** Describes how each key in object T should be rendered */
type CellRenderStrategy<T extends NonNullObject> = {
	[K in keyof T]: SortableCellRenderProps<T, K>;
};

/** Properties that can be applied to each {@link CellRenderStrategy} for sortable columns */
interface SortableCellRenderProps<T extends NonNullObject, K extends keyof T> extends GeneralCellRenderProps<T> {
	/** The render strategy for this key */
	render: (parameters: SortableCellRenderCallbackParameters<T, K>) => ReactNode;
}

/** Properties that can be applied to each {@link CellRenderStrategy} for unsortable columns */
interface UnsortableCellRenderProps<T extends NonNullObject> extends GeneralCellRenderProps<T> {
	/** The render strategy for this key */
	render: (parameters: UnsortableCellRenderCallbackParameters<T>) => ReactNode;
}

/** Properties that can be applied to each {@link CellRenderStrategy} */
interface GeneralCellRenderProps<T extends NonNullObject> {
	/** Additional properties to pass to the {@link MuiTableCell} component for this key */
	TableCellProps?: (dataEntry: T) => MTableCellProps;

	/**
	 * This property can be used to skip rendering an {@link HTMLAnchorElement} on the current cell
	 * even if {@link TableProps.TableBodyRowLinkTo} has been provided for the table as a whole
	 * @default false
	 */
	conditionalShouldNotRenderLink?: boolean;

	/**
	 * An optional conditional that should be taken into account before a cell is rendered.
	 * When this is true, the cell will render.
	 * @default true
	 */
	conditionalShouldRender?: boolean;

	/**
	 * When `conditionShouldRender` resolves to false, render this instead
	 */
	conditionalFallback?: ReactElement;

	/**
	 * Whether this table cell should be sticky (always shown when horizontally scrolling)
	 * @default false
	 */
	sticky?: boolean;
}

/** The parameters passed into the render callback for a cell in a sortable column */
interface SortableCellRenderCallbackParameters<T extends NonNullObject, K extends keyof T> extends GeneralCellRenderCallbackParameters<T> {
	/** The value that goes along with the header for this cell */
	value: T[K];
}

/** The parameters passed into the render callback for a cell in an unsortable column */
interface UnsortableCellRenderCallbackParameters<T extends NonNullObject> extends GeneralCellRenderCallbackParameters<T> {
	/** The value that goes along with the header for this cell */
	value: never;
}

/** The general parameters passed into the render callback for a cell */
interface GeneralCellRenderCallbackParameters<T extends NonNullObject> {
	/** The index of the row for this cell */
	rowIndex: number;
	/**
	 * The original object for this entire row.
	 * You can use this to access other properties on `T`.
	 */
	object: T;
}

/** Properties that can be applied to each {@link TableHeader} */
interface TableHeaderProps {
	/** The label that should be rendered for this column. */
	label: string;

	/**
	 * An optional conditional that should be taken into account before a header is rendered.
	 * When this is true, the header will render.
	 * @default true
	 */
	conditionalShouldRender?: boolean;

	/**
	 * When {@link TableHeader.conditionalShouldRender} resolves to false, render this instead
	 */
	conditionalFallback?: ReactElement;
}

/** The properties that can be applied to the {@link MuiTablePagination} component as overrides */
type OverridableMuiTablePaginationProps = Pick<
	MuiTablePaginationProps,
	| 'backIconButtonProps'
	| 'classes'
	| 'labelDisplayedRows'
	| 'labelRowsPerPage'
	| 'nextIconButtonProps'
	| 'SelectProps'
	| 'align'
	| 'padding'
	| 'scope'
	| 'size'
	| 'sortDirection'
	| 'variant'
>;
