import AnimatedScrollViewWithBlur from '@/components/AnimatedScrollViewWithBlur';
import { Background } from '@/components/Background';
import Discover from '@/components/Discover/Discover';
import Header from '@/components/Header/Header';
import { getCartItemsDb, setupDatabase } from '@/services/database';
import { setCartItems } from '@/store/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
	const [sortBy, setSortBy] = useState('market_cap');
	const [sortOrder, setSortOrder] = useState('desc');
	const [scrollEnded, setScrollEnded] = useState(false);
	const [shouldResetList, setShouldResetList] = useState(false);

	const dispatch = useAppDispatch();

	const init = useCallback(async () => {
		await setupDatabase();
		dispatch(setCartItems(await getCartItemsDb()));
	}, []);

	useEffect(() => {
		init();
	}, []);

	return (
		<Background style={styles.container}>
			<AnimatedScrollViewWithBlur
				style={styles.container}
				scrollEventThrottle={16}
				setScrollEnded={setScrollEnded}
				contentContainerStyle={styles.scrollViewContent}
				onScrollToRefresh={() => setShouldResetList(true)}>
				<Header
					title="GeckoCart"
					miniTitle="Powered by CoinGecko API"
					rightComponentType="none"
				/>

				<View style={styles.discoverContainer}>
					<Discover
						sortBy={sortBy}
						sortOrder={sortOrder}
						setSortBy={setSortBy}
						scrollEnded={scrollEnded}
						setSortOrder={setSortOrder}
						setScrollEnded={setScrollEnded}
						shouldResetList={shouldResetList}
						onCompleteResetList={() => setShouldResetList(false)}
					/>
				</View>
			</AnimatedScrollViewWithBlur>
		</Background>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	discoverContainer: {
		flex: 1,
		paddingHorizontal: 16,
	},
	scrollViewContent: {
		paddingBottom: 30,
	},
});
