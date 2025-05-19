export const SORT_BY_OPTIONS = [
	{ label: 'Market Cap', value: 'market_cap' },
	{ label: 'Price', value: 'price' },
	{ label: 'Volume (24h)', value: 'volume' },
	{ label: 'Name', value: 'id' },
	{ label: 'Gecko Rank', value: 'gecko' },
];

export const SORT_ORDER_BY_OPTIONS = [
	{ label: 'Ascending', value: 'asc' },
	{ label: 'Descending', value: 'desc' },
];

type SortByOptionValue = typeof SORT_BY_OPTIONS[number]['value'];
type SortOrderByValue = typeof SORT_ORDER_BY_OPTIONS[number]['value'];

export type SortByOrderBy = `${SortByOptionValue}_${SortOrderByValue}`;


