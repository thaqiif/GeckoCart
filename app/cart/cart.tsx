import { getSimplePrice } from '@/api/api';
import AnimatedScrollViewWithBlur from '@/components/AnimatedScrollViewWithBlur';
import { Background } from '@/components/Background';
import Button from '@/components/Button/Button';
import CryptoCardCartItem from '@/components/Card/CryptoCardCartItem';
import Checkbox from '@/components/Checkbox/Checkbox';
import Header from '@/components/Header/Header';
import QuantityEditModal from '@/components/Modal/QuantityEditModal';
import Text from '@/components/Text/Text';
import { CartItem, clearCart, deleteCartItem, updateCartItem } from '@/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formatToCurrency } from '@/utils/utils';
import { router } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export default function CartScreen() {
	const dispatch = useAppDispatch();
	const { items } = useAppSelector((state) => state.cart);

	const [isModalVisible, setModalVisible] = useState(false);
	const [itemForEdit, setItemForEdit] = useState<CartItem>();
	const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

	const total = useMemo(() => {
		const selectedItems = items.filter((item) => selectedItemIds.includes(item.id));
		return selectedItems.reduce((acc, item) => acc + item.price_usd * item.amount, 0);
	}, [items, selectedItemIds]);

	const onEditItem = useCallback((item: CartItem) => {
		setItemForEdit(item);
		setModalVisible(true);
	}, []);

	const onItemSelected = useCallback(
		(id: string) => {
			if (selectedItemIds.includes(id)) {
				setSelectedItemIds(selectedItemIds.filter((item) => item !== id));
			} else {
				setSelectedItemIds([...selectedItemIds, id]);
			}
		},
		[selectedItemIds]
	);

	const onRefreshPrice = useCallback(() => {
		if (items.length === 0) {
			return;
		}

		const refreshBatch = Math.ceil(items.length / 50);
		for (let i = 0; i < refreshBatch; i++) {
			const start = i * 50;
			const end = start + 50;
			const ids = items.slice(start, end).map((item) => item.id) ?? [];
			getSimplePrice({ ids: ids.join(','), vs_currencies: 'usd' }).then((response) => {
				for (const id of ids) {
					const item = response[id];
					if (item) {
						dispatch(updateCartItem({ id, price_usd: item.usd }));
					}
				}
			});
		}
	}, [items]);

	useEffect(() => {
		onRefreshPrice();
	}, []);

	return (
		<Background style={styles.container}>
			<AnimatedScrollViewWithBlur
				style={styles.container}
				contentContainerStyle={styles.scrollViewContent}
				onScrollToRefresh={onRefreshPrice}>
				<Header
					title="Cart"
					enableBackButton={true}
					rightComponentType="button"
					rightComponentText="Clear"
					rightComponentOnPress={() => dispatch(clearCart())}
				/>

				{items.length > 0 ? (
					items.map((item) => (
						<CryptoCardCartItem
							item={item}
							key={item.id}
							onItemSelected={onItemSelected}
							onEditItem={() => onEditItem(item)}
							selected={selectedItemIds.includes(item.id)}
						/>
					))
				) : (
					<View style={styles.emptyContainer}>
						<Text
							size={16}
							family="bold">
							No items in cart
						</Text>
					</View>
				)}
			</AnimatedScrollViewWithBlur>
			<Background
				theme="hint"
				opacity={0.1}
				style={styles.checkoutBar}>
				<Pressable
					onPress={() => {
						if (selectedItemIds.length === items.length) {
							setSelectedItemIds([]);
						} else {
							setSelectedItemIds(items.map((item) => item.id));
						}
					}}
					style={styles.selectAllContainer}>
					<Checkbox checked={!!selectedItemIds.length && selectedItemIds.length === items.length} />
					<Text>All</Text>
				</Pressable>
				<View style={styles.totalContainer}>
					<View style={styles.totalTextContainer}>
						<Text>Total</Text>
						<Text
							family="bold"
							numberOfLines={1}
							adjustsFontSizeToFit>
							{formatToCurrency(total)}
						</Text>
					</View>
					<Button
						text="Check Out"
						disabled={selectedItemIds.length === 0}
						onPress={() =>
							router.push({
								pathname: '/success/CheckoutSuccessScreen',
								params: { selectedItemIds },
							})
						}
					/>
				</View>
			</Background>
			<QuantityEditModal
				visible={isModalVisible}
				initialQuantity={itemForEdit?.amount ?? 1}
				onClose={() => setModalVisible(false)}
				onSubmit={(newQty) => {
					dispatch(updateCartItem({ id: itemForEdit!.id, amount: newQty, price_usd: itemForEdit!.price_usd }));
				}}
				onDelete={() => {
					dispatch(deleteCartItem(itemForEdit!.id));
				}}
			/>
		</Background>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollViewContent: {
		paddingBottom: 30,
	},
	checkoutBar: {
		flex: 0,
		paddingTop: 12,
		paddingBottom: 30,
		flexDirection: 'row',
		paddingHorizontal: 16,
	},
	selectAllContainer: {
		gap: 12,
		flex: 0.4,
		paddingLeft: 8,
		alignItems: 'center',
		flexDirection: 'row',
	},
	totalContainer: {
		flex: 1,
		gap: 8,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	totalTextContainer: {
		gap: 8,
		flex: 0,
		alignItems: 'center',
		flexDirection: 'row',
	},
	emptyContainer: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 16,
		justifyContent: 'center',
	},
});
