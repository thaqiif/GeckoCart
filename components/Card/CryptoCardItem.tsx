import { formatToCurrency } from '@/utils/utils';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Background } from '../Background';
import CryptoLogo from '../Image/CryptoLogo';
import PriceIndicator from '../Label/PriceIndicator';
import Text from '../Text/Text';

type CryptoCardItemProps = {
	coinId: string;
	symbol: string;
	name: string;
	current_price: number;
	price_change_percentage_24h: number;
	image: string;
};

export default function CryptoCardItem({
	coinId,
	symbol,
	name,
	current_price,
	price_change_percentage_24h,
	image,
}: CryptoCardItemProps) {
	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: '/detail/CryptoDetail',
					params: { coinId },
				})
			}>
			<Background
				theme="secondary"
				style={styles.container}>
				<View style={styles.topRow}>
					<View>
						<CryptoLogo
							dim={true}
							icon={{ uri: image }}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Text
							size={16}
							family="bold"
							style={{ textTransform: 'uppercase' }}>
							{symbol}
						</Text>
						<Text
							size={14}
							numberOfLines={2}
							style={styles.coinNameText}
							adjustsFontSizeToFit>
							{name}
						</Text>
					</View>
				</View>
				<View style={styles.bottomRow}>
					<View style={styles.indicatorRow}>
						<PriceIndicator valueChange={price_change_percentage_24h} />
					</View>
					<Text
						size={14}
						family="bold"
						theme="primary"
						numberOfLines={1}
						adjustsFontSizeToFit={true}>
						{formatToCurrency(current_price)}
					</Text>
				</View>
			</Background>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 10,
		flexDirection: 'column',
	},
	topRow: {
		gap: 8,
		flex: 1,
		flexDirection: 'row',
	},
	coinImage: {
		marginRight: 8,
	},
	indicatorRow: {
		flex: 0,
		flexDirection: 'row',
	},
	bottomRow: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	coinNameText: {
		opacity: 0.5,
	},
});
