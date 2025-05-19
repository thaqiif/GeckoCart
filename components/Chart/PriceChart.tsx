import { getMarketChart } from '@/api/api';
import { formatToCurrency } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import PriceIndicator from '../Label/PriceIndicator';
import TabSelector from '../TabSelector/TabSelector';
import Text from '../Text/Text';

const timeRangeOptions = [
	{ label: '24H', value: 1 },
	{ label: '7D', value: 7 },
	{ label: '1M', value: 30 },
	{ label: '3M', value: 90 },
	{ label: '1Y', value: 365 },
];

const priceOrMarketCapOptions = [
	{ label: 'PRICE', value: 'price' },
	{ label: 'MARKET CAP', value: 'market_cap' },
];

const SmoothPriceChart = ({ coinId = 'bitcoin', coin }: any) => {
	const [days, setDays] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [priceOrMarketCap, setPriceOrMarketCap] = useState('price');
	const [currentChartsData, setCurrentChartsData] = useState<{ value: number }[]>([]);
	const [prices, setPrices] = useState<{ days: number; data: { value: number }[] }[]>([]);
	const [marketCaps, setMarketCaps] = useState<{ days: number; data: { value: number }[] }[]>([]);

	const fetchData = async (days = 1, priceOrMarketCap = 'price') => {
		setIsLoading(true);

		if (priceOrMarketCap === 'price') {
			if (prices.some((item) => item.days === days)) {
				setCurrentChartsData(prices.find((item) => item.days === days)?.data ?? []);
				setIsLoading(false);
				return;
			}
		} else if (priceOrMarketCap === 'market_cap') {
			if (marketCaps.some((item) => item.days === days)) {
				setCurrentChartsData(marketCaps.find((item) => item.days === days)?.data ?? []);
				setIsLoading(false);
				return;
			}
		}

		try {
			const res = await getMarketChart({
				id: coinId,
				days,
				vs_currency: 'usd',
			});

			const formattedPrices = res.prices.map((point: number[]) => ({
				value: point[1],
			}));

			const formattedMarketCaps = res.market_caps.map((point: number[]) => ({
				value: point[1],
			}));

			if (formattedPrices.length > 0) {
				setCurrentChartsData(formattedPrices);
				setPrices((prevState) => [...prevState, { days, data: formattedPrices }]);
			}

			if (formattedMarketCaps.length > 0) {
				setCurrentChartsData(formattedMarketCaps);
				setMarketCaps((prevState) => [...prevState, { days, data: formattedMarketCaps }]);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData(days, priceOrMarketCap);
	}, [coinId, days, priceOrMarketCap]);

	if (prices.length === 0) {
		return null;
	}

	return (
		<View>
			<TabSelector
				options={priceOrMarketCapOptions.map((item) => item.label)}
				defaultSelected={priceOrMarketCapOptions.find((item) => item.value === priceOrMarketCap)?.label ?? 'PRICE'}
				containerStyle={{ marginBottom: 50 }}
				onTabSelected={(label) => {
					setPriceOrMarketCap(priceOrMarketCapOptions.find((item) => item.label === label)?.value ?? 'price');
				}}
			/>

			<View style={styles.priceContainer}>
				<Text
					size={40}
					family="semiBold">
					{formatToCurrency(coin?.market_data?.current_price?.usd ?? 0)}
				</Text>

				<View style={styles.indicatorsContainer}>
					<PriceIndicator valueChange={coin?.market_data?.price_change_percentage_24h_in_currency?.usd ?? 0} />
					<PriceIndicator
						typeChange="price"
						valueChange={+(coin?.market_data?.price_change_24h_in_currency?.usd ?? 0)?.toFixed(6)}
					/>
				</View>
			</View>
			<View style={{ height: 170, paddingTop: 30 }}>
				{isLoading ? (
					<ActivityIndicator
						size="small"
						color="#fff"
					/>
				) : (
					<LineChart
						curved
						hideRules
						areaChart
						isAnimated
						thickness={5}
						disableScroll
						hideYAxisText
						hideDataPoints
						color="#357B5D"
						initialSpacing={0}
						animateOnDataChange
						yAxisLabelWidth={0}
						adjustToWidth={true}
						endFillColor="#314158"
						startFillColor="#5E8677"
						yAxisColor="transparent"
						xAxisColor="transparent"
						data={currentChartsData}
						animationDuration={1000}
						width={Dimensions.get('window').width}
					/>
				)}
			</View>
			<TabSelector
				options={timeRangeOptions.map((item) => item.label)}
				defaultSelected={timeRangeOptions.find((item) => item.value === days)?.label ?? '24H'}
				containerStyle={{}}
				onTabSelected={(label) => {
					const days = timeRangeOptions.find((item) => item.label === label)?.value ?? 1;
					setDays(days);
				}}
			/>
		</View>
	);
};

export default SmoothPriceChart;

const styles = StyleSheet.create({
	priceContainer: {
		gap: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	indicatorsContainer: {
		gap: 8,
		alignItems: 'center',
		flexDirection: 'row',
	},
});
