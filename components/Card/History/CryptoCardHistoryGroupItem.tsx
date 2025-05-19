import { Background } from '@/components/Background';
import Icon from '@/components/Icon/Icon';
import Text from '@/components/Text/Text';
import { useThemeColor } from '@/components/Themed';
import { OrderItem } from '@/services/database.model';
import { formatToCurrency, hexToRGBA } from '@/utils/utils';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import CryptoCardHistoryItem from './CryptoCardHistoryItem';

type CryptoCardHistoryGroupItemProps = {
	id: number;
	total_usd: number;
	items: OrderItem[];
};

export default function CryptoCardHistoryGroupItem({ id, total_usd, items }: CryptoCardHistoryGroupItemProps) {
	const primaryTextColor = useThemeColor('primaryText');

	const [isViewMore, setIsViewMore] = useState(false);

	const displayItems = useMemo(() => {
		if (isViewMore) {
			return items;
		}

		return items.slice(0, 2);
	}, [isViewMore, items]);

	return (
		<Background
			theme="secondary"
			style={styles.container}>
			<View style={styles.headerRow}>
				<Text
					family="semiBold"
					size={14}>
					#ODR-{id}
				</Text>
				<Text
					family="extraBold"
					size={12}
					style={{ letterSpacing: 1 }}>
					COMPLETED
				</Text>
			</View>
			<View style={[styles.divider, { borderColor: primaryTextColor }]} />

			<View style={styles.itemsContainer}>
				{displayItems.map((item) => (
					<CryptoCardHistoryItem
						key={item.id}
						{...item}
					/>
				))}
			</View>

			{!isViewMore && items.length > 2 && (
				<Pressable
					onPress={() => setIsViewMore(true)}
					style={styles.viewMoreContainer}>
					<Text size={14}>View More</Text>
					<Icon
						name="chevron-down"
						iconSize={10}
						iconColor={hexToRGBA(primaryTextColor, 0.8)}
					/>
				</Pressable>
			)}

			<View style={[styles.divider, { borderColor: primaryTextColor }]} />

			<View style={styles.totalRow}>
				<Text
					family="medium"
					size={14}>
					Total {items.length} item{items.length > 1 ? 's' : ''}:
				</Text>
				<Text size={14}>{formatToCurrency(total_usd)}</Text>
			</View>
		</Background>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 12,
		borderRadius: 8,
	},
	headerRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	divider: {
		flex: 1,
		opacity: 0.2,
		borderWidth: 0.5,
		marginVertical: 8,
	},
	itemsContainer: {
		gap: 12,
	},
	viewMoreContainer: {
		gap: 2,
		flex: 1,
		marginTop: 20,
		marginBottom: 6,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	totalRow: {
		flex: 1,
		gap: 8,
		marginTop: 4,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
});
