import { getCoinsMarkets } from '@/api/api';
import { SORT_BY_OPTIONS, SORT_ORDER_BY_OPTIONS } from '@/constants/Constants';
import { CoinListItem } from '@/entities/model';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import CryptoCardItem from '../Card/CryptoCardItem';
import SelectDropdown from '../Dropdown/Dropdown';
import { Grid } from '../Grid/Grid';
import SectionText from '../Text/SectionText';

interface DiscoverProps {
	sortBy: string;
	sortOrder: string;
	setSortBy: (sortBy: string) => void;
	setSortOrder: (sortOrder: string) => void;
	scrollEnded: boolean;
	setScrollEnded: (val: boolean) => void;
	shouldResetList?: boolean;
	onCompleteResetList?: () => void;
}

export default function Discover({
	sortBy,
	sortOrder,
	setSortBy,
	setSortOrder,
	scrollEnded,
	setScrollEnded,
	shouldResetList,
	onCompleteResetList,
}: DiscoverProps) {
	const [firstLoad, setFirstLoad] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);
	const [noMoreData, setNoMoreData] = useState(false);
	const [isNextPageLoading, setIsNextPageLoading] = useState(false);
	const [discoverCoins, setDiscoverCoins] = useState<CoinListItem[]>([]);

	const onRefreshDiscoverCoins = useCallback(() => {
		getCoinsMarkets({
			per_page: 20,
			vs_currency: 'usd',
			page: currentPage + 1,
			order: `${sortBy}_${sortOrder}`,
		})
			.then((response) => {
				if (response.length === 0) {
					setNoMoreData(true);
					return;
				}

				setFirstLoad(false);
				setScrollEnded(false);
				setCurrentPage(currentPage + 1);
				setDiscoverCoins((prevState) => [...prevState, ...response]);
			})
			.finally(() => {
				setIsNextPageLoading(false);
			});
	}, [currentPage, sortBy, sortOrder]);

	const onResetList = useCallback(() => {
		setCurrentPage(0);
		setFirstLoad(true);
		setNoMoreData(false);
		setDiscoverCoins([]);
	}, []);

	useEffect(() => {
		if ((firstLoad || scrollEnded) && !isNextPageLoading && !noMoreData) {
			onRefreshDiscoverCoins();
			setIsNextPageLoading(true);
		}
	}, [firstLoad, scrollEnded, isNextPageLoading, noMoreData, onRefreshDiscoverCoins]);

	useEffect(() => {
		onResetList();
	}, [sortBy, sortOrder]);

	useEffect(() => {
		if (shouldResetList) {
			onResetList();
			onCompleteResetList?.();
		}
	}, [shouldResetList]);

	return (
		<View style={{ flex: 1, paddingBottom: 50 }}>
			<SectionText iconName="compass">Discover</SectionText>

			<SortSearch
				sortBy={sortBy}
				sortOrder={sortOrder}
				setSortBy={setSortBy}
				setSortOrder={setSortOrder}
			/>

			<Grid
				numberOfColumns={2}
				items={discoverCoins}
				renderItem={(item: CoinListItem, index: number) => (
					<CryptoCardItem
						key={item.id}
						coinId={item.id}
						name={item.name}
						image={item.image}
						symbol={item.symbol}
						current_price={item.current_price}
						price_change_percentage_24h={item.price_change_percentage_24h}
					/>
				)}
			/>

			{isNextPageLoading && (
				<ActivityIndicator
					size="small"
					color="white"
					style={{ marginVertical: 10 }}
				/>
			)}
		</View>
	);
}

interface SortSearchProps {
	sortBy: string;
	sortOrder: string;
	setSortBy: (sortBy: string) => void;
	setSortOrder: (sortOrder: string) => void;
}

function SortSearch({ sortBy, sortOrder, setSortBy, setSortOrder }: SortSearchProps) {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
			<SelectDropdown
				label="Sort by"
				value={sortBy}
				onChange={(val) => setSortBy(val)}
				options={SORT_BY_OPTIONS}
			/>
			<SelectDropdown
				label="Order By"
				value={sortOrder}
				onChange={(val) => setSortOrder(val)}
				options={SORT_ORDER_BY_OPTIONS}
			/>
		</View>
	);
}
