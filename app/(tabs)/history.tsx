import { StyleSheet, View } from 'react-native';

import AnimatedScrollViewWithBlur from '@/components/AnimatedScrollViewWithBlur';
import { Background } from '@/components/Background';
import CryptoCardHistoryGroupItem from '@/components/Card/History/CryptoCardHistoryGroupItem';
import Header from '@/components/Header/Header';
import Text from '@/components/Text/Text';
import { getHistoryOrdersDb } from '@/services/database';
import { OrderItem } from '@/services/database.model';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setOrderHistory } from '@/store/orderSlice';
import { useCallback, useEffect } from 'react';

export type HistoryOrdersProps = {
	id: number;
	total_usd: number;
	items: OrderItem[];
};

export default function HistoryScreen() {
	const { historyOrder: orders } = useAppSelector((state) => state.historyOrder);
	const dispatch = useAppDispatch();

	const onRefreshList = useCallback(async () => {
		dispatch(setOrderHistory(await getHistoryOrdersDb()));
	}, []);

	useEffect(() => {
		onRefreshList();
	}, []);

	return (
		<Background style={styles.container}>
			<AnimatedScrollViewWithBlur
				style={styles.container}
				onScrollToRefresh={onRefreshList}
				contentContainerStyle={styles.scrollViewContent}>
				<Header
					title="History"
					rightComponentType="none"
				/>

				{!!orders.length ? (
					<View style={styles.historyGroupItem}>
						{orders.map((item) => (
							<CryptoCardHistoryGroupItem
								id={item.id}
								key={item.id}
								items={item.items}
								total_usd={item.total_usd}
							/>
						))}
					</View>
				) : (
					<View style={styles.emptyContainer}>
						<Text
							size={16}
							family="bold">
							No history found
						</Text>
					</View>
				)}
			</AnimatedScrollViewWithBlur>
		</Background>
	);
}

const styles = StyleSheet.create({
	scrollViewContent: {
		paddingBottom: 100,
	},
	container: {
		flex: 1,
	},
	historyGroupItem: {
		flex: 1,
		gap: 12,
		paddingTop: 10,
		paddingHorizontal: 16,
	},
	emptyContainer: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 16,
		justifyContent: 'center',
	},
});
