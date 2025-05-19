import { CartItem } from '@/store/cartSlice';
import { formatToCurrency } from '@/utils/utils';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Background } from '../Background';
import Checkbox from '../Checkbox/Checkbox';
import Icon from '../Icon/Icon';
import PriceIndicator from '../Label/PriceIndicator';
import Text from '../Text/Text';

type CryptoCardCartItemProps = {
	item: CartItem;
	selected: boolean;
	onItemSelected: (id: string) => void;
	onEditItem: () => void;
};

export default function CryptoCardCartItem({
	item,
	selected,
	onItemSelected,
	onEditItem
}: CryptoCardCartItemProps) {
	const { id, name, symbol, amount, price_usd, old_price_usd, image } = item;
	return (
		<Pressable onPress={() => onItemSelected(id)}>
			<Background
				theme="hint"
				opacity={0.1}
				style={styles.container}>
				<View style={styles.checkboxContainer}>
					<Checkbox
						checked={selected}
						onToggle={() => onItemSelected(id)}
					/>
				</View>
				<View style={styles.contentContainer}>
					<View style={styles.coinContainer}>
						<Image
							style={styles.coinImage}
							source={{ uri: image }}
						/>
						{old_price_usd !== price_usd && (
							<PriceIndicator valueChange={+(((price_usd - old_price_usd) / price_usd) * 100).toFixed(3)} />
						)}
					</View>
					<View style={styles.detailsContainer}>
						<Text style={styles.coinName}>{name}</Text>
						<View style={styles.priceContainer}>
							<Text size={14}>{formatToCurrency(price_usd)}</Text>
							{old_price_usd !== price_usd && (
								<Text
									size={12}
									style={styles.oldPrice}>
									{formatToCurrency(old_price_usd)}
								</Text>
							)}
						</View>
						<Text size={12}>
							{amount} {symbol.toUpperCase()} ({formatToCurrency(amount * price_usd)})
						</Text>
					</View>
				</View>
				<Pressable
					onPress={onEditItem}
					style={styles.editButtonContainer}>
					<Background
						theme="secondary"
						style={styles.editButton}>
						<Icon
							iconSize={12}
							name="pencil-alt"
						/>
					</Background>
				</Pressable>
			</Background>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 8,
		marginVertical: 4,
		flexDirection: 'row',
		paddingVertical: 12,
		paddingHorizontal: 8,
		marginHorizontal: 16,
	},
	checkboxContainer: {
		flex: 0.1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkbox: {
		width: 20,
		height: 20,
		padding: 8,
		borderRadius: 4,
	},
	contentContainer: {
		gap: 16,
		flex: 0.9,
		flexDirection: 'row',
		paddingHorizontal: 8,
	},
	coinContainer: {
		gap: 8,
		flex: 0.25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	detailsContainer: {
		flex: 1,
	},
	coinName: {
		marginBottom: 2,
	},
	priceContainer: {
		gap: 4,
		marginBottom: 8,
		alignItems: 'center',
		flexDirection: 'row',
	},
	oldPrice: {
		opacity: 0.4,
		textDecorationLine: 'line-through',
		textDecorationStyle: 'solid',
	},
	editButtonContainer: {
		flex: 0,
		marginRight: 8,
	},
	editButton: {
		width: 24,
		height: 24,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	coinImage: {
		width: 32,
		height: 32,
	},
});
