import { Background } from '@/components/Background';
import Text from '@/components/Text/Text';
import { OrderItem } from '@/services/database.model';
import { formatToCurrency } from '@/utils/utils';
import { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

type CryptoCardHistoryItemProps = {} & OrderItem;

export default function CryptoCardHistoryItem({ name, symbol, amount, price_usd, image }: CryptoCardHistoryItemProps) {
	const total = useMemo(() => amount * price_usd, [amount, price_usd]);

	return (
		<Background
			theme="secondary"
			style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					width={30}
					height={30}
					source={{ uri: image }}
				/>
			</View>
			<View style={styles.infoContainer}>
				<Text size={16}>{name}</Text>
				<View style={styles.priceContainer}>
					<Text
						size={14}
						family="semiBold">
						{formatToCurrency(price_usd)}
					</Text>
					<Text size={12}>per unit</Text>
				</View>
			</View>
			<View style={styles.totalContainer}>
				<Text size={12}>
					{amount} {symbol.toUpperCase()}
				</Text>
				<Text size={14}>{formatToCurrency(total)}</Text>
			</View>
		</Background>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 12,
		borderRadius: 8,
		flexDirection: 'row',
	},
	imageContainer: {
		flex: 0,
	},
	infoContainer: {
		gap: 2,
		flex: 1,
	},
	priceContainer: {
		gap: 4,
		alignItems: 'center',
		flexDirection: 'row',
	},
	totalContainer: {
		gap: 2,
		flex: 0,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
});
