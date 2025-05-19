import { getTrendingCoins } from '@/api/api';
import { Grid } from '@/components/Grid/Grid';
import SectionText from '@/components/Text/SectionText';
import { TrendingCoinItem } from '@/entities/model';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import CryptoCardItem from '../CryptoCardItem';

interface TrendingProps {
	shouldResetList?: boolean;
	onCompleteResetList?: () => void;
}

export default function Trending({ shouldResetList, onCompleteResetList }: TrendingProps) {
	const [isRefreshing, setIsRefreshing] = useState(true);
	const [trendingCoins, setTrendingCoins] = useState<TrendingCoinItem[]>([]);

	const onRefreshTrending = useCallback(() => {
		setIsRefreshing(true);
		getTrendingCoins()
			.then((response) => {
				setTrendingCoins(response.coins.map((item) => item.item));
			})
			.finally(() => {
				setIsRefreshing(false);
			});
	}, []);

	useEffect(() => {
		onRefreshTrending();
	}, []);

	useEffect(() => {
		if (shouldResetList) {
			onRefreshTrending();
			onCompleteResetList?.();
		}
	}, [shouldResetList]);

	if (isRefreshing) {
		return (
			<ActivityIndicator
				size="small"
				color="white"
				style={{ marginVertical: 50 }}
			/>
		);
	}

	return (
		<View>
			<SectionText iconName="chart-line">TRENDING</SectionText>
			<Grid
				numberOfColumns={2}
				items={trendingCoins}
				renderItem={(item: TrendingCoinItem, index: number) => (
					<CryptoCardItem
						key={item.id}
						name={item.name}
						coinId={item.id}
						image={item.thumb}
						symbol={item.symbol}
						current_price={item.data?.price ?? 0}
						price_change_percentage_24h={+(item.data?.price_change_percentage_24h?.usd?.toFixed(3) ?? 0)}
					/>
				)}
			/>
		</View>
	);
}
