import { getCoinById } from '@/api/api';
import AnimatedScrollViewWithBlur from '@/components/AnimatedScrollViewWithBlur';
import { Background } from '@/components/Background';
import Button from '@/components/Button/Button';
import PriceChart from '@/components/Chart/PriceChart';
import Icon from '@/components/Icon/Icon';
import CryptoLogo from '@/components/Image/CryptoLogo';
import InfoDetail from '@/components/InfoDetail/InfoDetail';
import InfoTag from '@/components/InfoTag/InfoTag';
import TextInput from '@/components/Input/TextInput';
import SectionText from '@/components/Text/SectionText';
import Text from '@/components/Text/Text';
import { CoinDetail } from '@/entities/model';
import { addCartItem, updateCartItem } from '@/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { router } from 'expo-router';
import { formatNumber, formatToCurrency, isValidQuantity } from '@/utils/utils';
import { useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';

export default function CryptoDetail(props: any) {
	const route = useRoute();
	const coinId = (route.params as any)?.coinId as string;

	const dispatch = useAppDispatch();
	const { items } = useAppSelector((state) => state.cart);

	const [quantity, setQuantity] = useState<string>('1');
	const [coin, setCoin] = useState<CoinDetail>(undefined!);
	const [quantityError, setQuantityError] = useState<string>('');
	const [expandDescription, setExpandDescription] = useState(false);

	const canAddToCard = useMemo(() => !!coin?.market_data?.current_price?.usd, [coin]);

	const addToCart = useCallback(() => {
		if (!coin?.market_data?.current_price.usd || !isValidQuantity(quantity)) {
			return;
		}

		const parsedQty = parseFloat(quantity);

		if (!!items.find((item) => item.id === coinId)) {
			const item = items.find((item) => item.id === coinId);
			dispatch(
				updateCartItem({
					id: coinId,
					amount: (item?.amount ?? 0) + parsedQty,
					price_usd: coin.market_data.current_price.usd,
				})
			);
			return;
		}

		dispatch(
			addCartItem({
				id: coinId,
				name: coin.name,
				amount: parsedQty,
				symbol: coin.symbol,
				image: coin?.image?.large ?? '',
				price_usd: coin.market_data.current_price.usd,
				old_price_usd: coin.market_data.current_price.usd,
			})
		);
	}, [items, coin, quantity]);

	useEffect(() => {
		getCoinById({ id: coinId }).then((response) => {
			setCoin(response);
		});
	}, [coinId]);

	if (!coin) {
		return null;
	}

	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={0}
			style={styles.keyboardAvoidingView}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<Background style={styles.container}>
				<AnimatedScrollViewWithBlur
					style={styles.container}
					contentContainerStyle={styles.scrollViewContent}>
					<View style={styles.header}>
						<Pressable
							onPress={() => router.back()}
							style={styles.backButton}>
							<Icon
								name="chevron-left"
								iconSize={14}
							/>
							<CryptoLogo
								size={30}
								withoutBackground={true}
								icon={coin.image?.thumb ?? ''}
							/>
						</Pressable>
						<Pressable
							onPress={() => router.navigate('/cart/cart')}
							style={styles.backButton}>
							<Background
								theme="secondary"
								style={styles.cartButtonBadge}>
								<Icon
									name="shopping-cart"
									iconSize={10}
								/>
								<Text size={13}>{items.length}</Text>
							</Background>
						</Pressable>
					</View>

					<PriceChart
						days={7}
						coin={coin}
						coinId={coin.id}
					/>

					<View style={styles.contentContainer}>
						<View style={styles.coinProfileContainer}>
							<Background
								theme="secondary"
								style={styles.coinImageContainer}>
								<CryptoLogo
									size={40}
									withoutBackground={true}
									icon={coin.image?.large ?? ''}
								/>
							</Background>
							<View>
								<Text
									size={16}
									family="bold">
									{coin.name}
								</Text>
								<View style={styles.coinSymbolContainer}>
									<Text
										size={12}
										style={styles.coinSymbol}>
										{coin.symbol}
									</Text>
									<Text
										size={11}
										family="bold">
										#{coin.market_cap_rank}
									</Text>
								</View>
							</View>
						</View>

						<InfoDetail
							containerStyles={styles.marketInfoContainer}
							items={[
								{
									title: 'Market Cap',
									value: formatToCurrency(coin?.market_data?.market_cap?.usd ?? 0),
								},
								{
									title: 'Fully Diluted Valuation',
									value: formatToCurrency(coin?.market_data?.fully_diluted_valuation?.usd ?? 0),
								},
								{
									title: 'Circulating Supply',
									value: `${formatNumber(coin?.market_data?.circulating_supply ?? 0)}`,
									hide: !!!coin?.market_data?.circulating_supply,
								},
								{
									title: 'Total Supply',
									value: `${formatNumber(coin?.market_data?.total_supply ?? 0)}`,
									hide: !!!coin?.market_data?.total_supply,
								},
								{
									title: 'Max Supply',
									value: `${formatNumber(coin?.market_data?.max_supply ?? 0)}`,
									hide: !!!coin?.market_data?.max_supply,
								},
							]}
						/>

						<SectionText>Historical Price</SectionText>

						<InfoDetail
							containerStyles={styles.priceRangeContainer}
							numberOfColumns={1}
							items={[
								{
									title: '24H Range',
									value: `${coin?.market_data?.low_24h?.usd ?? 0} – ${coin?.market_data?.high_24h?.usd ?? 0}`,
								},
							]}
						/>

						<InfoDetail
							items={[
								{
									title: 'All-Time High',
									value: `${formatToCurrency(coin?.market_data?.ath?.usd ?? 0)}`,
									valueChange: +(coin?.market_data?.ath_change_percentage?.usd ?? 0)?.toFixed(2),
								},
								{
									title: 'All-Time Low',
									value: `${formatToCurrency(coin?.market_data?.atl?.usd ?? 0)}`,
									valueChange: +(coin?.market_data?.atl_change_percentage?.usd ?? 0)?.toFixed(2),
								},
							]}
						/>

						<SectionText>More info</SectionText>

						{!!coin.description?.en && (
							<Pressable onPress={() => setExpandDescription((prevState) => !prevState)}>
								<Text numberOfLines={expandDescription ? undefined : 3}>{coin.description?.en ?? ''}</Text>
							</Pressable>
						)}

						{!!coin.categories && coin.categories?.length > 0 && (
							<InfoTag
								title="Categories"
								style={styles.infoTag}
								items={coin.categories}
							/>
						)}
						{!!coin?.links && coin?.links?.homepage?.length > 0 && (
							<InfoTag
								title="Website"
								style={styles.infoTag}
								numberOfItemsToDisplay={2}
								items={coin.links.homepage}
							/>
						)}
						{!!coin.links && (
							<InfoTag
								style={styles.infoTag}
								title="Blockchain Sites"
								numberOfItemsToDisplay={2}
								items={coin.links.blockchain_site}
							/>
						)}
						{!!coin?.links && coin?.links?.official_forum_url?.[0] && (
							<InfoTag
								title="Official Forum"
								style={styles.infoTag}
								items={['bitcointalk']}
								numberOfItemsToDisplay={2}
							/>
						)}
						{coin?.links && coin.links?.repos_url?.github?.[0] && (
							<InfoTag
								title="Source Code"
								style={styles.infoTag}
								numberOfItemsToDisplay={2}
								items={[coin.links.repos_url.github[0]]}
							/>
						)}
					</View>
				</AnimatedScrollViewWithBlur>

				<View style={styles.buttonContainer}>
					<View>
						{quantityError ? (
							<Text
								size={10}
								style={styles.quantityErrorText}>
								{quantityError}
							</Text>
						) : null}
						<View style={styles.quantityControlContainer}>
							<Button
								text="-1"
								onPress={() => {
									if (parseFloat(quantity) > 1) {
										setQuantity((parseFloat(quantity) - 1).toString());
									} else {
										setQuantity('1');
									}
								}}
								style={{ opacity: canAddToCard ? 1 : 0.5 }}
							/>
							<TextInput
								placeholder="Qty"
								value={quantity}
								keyboardType="decimal-pad"
								style={styles.quantityInput}
								onChangeText={(text) => {
									if (text === '') {
										setQuantity(text);
										setQuantityError('');
										return;
									}

									if (isValidQuantity(text)) {
										setQuantity(text);
										setQuantityError('');
									} else {
										setQuantity(text);
										setQuantityError('Invalid quantity (max 5 decimals, must be > 0)');
									}
								}}
							/>
							<Button
								text="+1"
								style={{ opacity: canAddToCard ? 1 : 0.5 }}
								onPress={() => {
									if (parseFloat(quantity) < 100) {
										setQuantity((parseFloat(quantity) + 1).toString());
									} else {
										setQuantity('100');
									}
								}}
							/>
						</View>
					</View>
					<View style={styles.addToCartButtonContainer}>
						<Button
							text="Add to Cart"
							disabled={!canAddToCard || !isValidQuantity(quantity)}
							onPress={addToCart}
							flashText="Added!"
							flashDuration={2000}
						/>
					</View>
				</View>
			</Background>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	keyboardAvoidingView: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
	scrollViewContent: {
		paddingTop: 45,
		paddingBottom: 30,
	},
	header: {
		paddingVertical: 20,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 16,
		justifyContent: 'space-between',
	},
	backButton: {
		gap: 12,
		paddingVertical: 8,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 12,
	},
	cartButtonBadge: {
		gap: 8,
		borderRadius: 999,
		paddingVertical: 4,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 12,
	},
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
	timeframeTabSelector: {
		marginTop: -55,
	},
	contentContainer: {
		marginTop: 30,
		paddingHorizontal: 16,
	},
	coinProfileContainer: {
		gap: 10,
		alignItems: 'center',
		flexDirection: 'row',
	},
	coinImageContainer: {
		padding: 6,
		borderRadius: 8,
	},
	coinSymbolContainer: {
		gap: 4,
		alignItems: 'center',
		flexDirection: 'row',
	},
	coinSymbol: {
		opacity: 0.6,
		textTransform: 'uppercase',
	},
	marketInfoContainer: {
		marginTop: 16,
	},
	priceRangeContainer: {
		marginTop: -10,
	},
	infoTag: {
		marginTop: 12,
	},
	buttonContainer: {
		gap: 8,
		paddingTop: 12,
		paddingBottom: 30,
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingHorizontal: 20,
	},
	quantityErrorText: {
		color: 'red',
		opacity: 0.8,
		marginBottom: 4,
		textAlign: 'center',
	},
	quantityControlContainer: {
		flex: 0,
		gap: 4,
		flexDirection: 'row',
	},
	quantityInput: {
		width: 80,
		textAlign: 'center',
	},
	addToCartButtonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
});
