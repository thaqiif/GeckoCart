import { TrendingCoinItem } from '@/entities/model';
import { formatToCurrency } from '@/utils/utils';
import { Link } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';
import { Background } from '../../Background';
import PriceIndicator from '../../Label/PriceIndicator';
import Text from '../../Text/Text';

type TrendingCoinItemProps = {
	item: TrendingCoinItem;
};

export default function CryptoVerticalCardItem({ item }: TrendingCoinItemProps) {
	return (
		<Link
			screen="detail/CryptoDetail"
			params={{ coinId: item.id }}>
			<Background
				theme="secondary"
				style={styles.container}>
				<Image
					width={32}
					height={32}
					style={styles.coinImage}
					source={{ uri: item.large }}
				/>
				<Text
					size={18}
					family="bold">
					{item.symbol}
				</Text>
				<Text
					size={14}
					numberOfLines={1}
					style={styles.coinName}>
					{item.name}
				</Text>

				<View style={styles.indicatorContainer}>
					<PriceIndicator valueChange={+(item.data?.price_change_percentage_24h?.usd ?? 0)?.toFixed(1)} />
				</View>

				<Text
					size={18}
					theme="primary"
					family="semiBold"
					style={styles.priceText}>
					{formatToCurrency(item.data?.price ?? 0) ?? '$0.00'}
				</Text>
			</Background>
		</Link>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 0,
		width: 140,
		height: 170,
		padding: 12,
		borderRadius: 12,
		justifyContent: 'flex-start',
	},
	coinImage: {
		marginBottom: 12,
	},
	coinName: {
		opacity: 0.6,
		width: '100%',
		marginTop: -2,
	},
	indicatorContainer: {
		paddingTop: 8,
		marginTop: 'auto',
		flexDirection: 'row',
	},
	priceText: {
		marginTop: 8,
	},
});
