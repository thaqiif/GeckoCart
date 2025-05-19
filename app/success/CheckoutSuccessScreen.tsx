import { Background } from '@/components/Background';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Text from '@/components/Text/Text';
import { getHistoryOrdersDb, insertOrderDb, insertOrderItemDb } from '@/services/database';
import { deleteCartItem } from '@/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setOrderHistory } from '@/store/orderSlice';
import { router } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function CheckoutSuccessScreen() {
	const { selectedItemIds } = useRoute().params as any;

	const { items } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	const [isOrderCreating, setIsOrderCreating] = useState(true);

	useEffect(() => {
		const onOrderCreated = async () => {
			const orderItems = items.filter((item) => selectedItemIds.includes(item.id));
			if (orderItems.length > 0) {
				const total = orderItems.reduce((acc, item) => acc + item.price_usd * item.amount, 0);
				const orderId = await insertOrderDb(total);

				orderItems.forEach(async (item) => {
					await insertOrderItemDb(orderId, item.id, item.name, item.symbol, item.amount, item.price_usd, item.image);
				});

				// Get all History for Redux
				dispatch(setOrderHistory(await getHistoryOrdersDb()));

				// Clear Cart
				orderItems.forEach((item) => dispatch(deleteCartItem(item.id)));

				setIsOrderCreating(false);
			}
		};

		onOrderCreated();
	}, [items, selectedItemIds]);

	return (
		<Background style={styles.container}>
			<View style={styles.content}>
				<View style={styles.iconWrapper}>
					{!isOrderCreating ? (
						<Icon
							name="check-circle"
							iconSize={60}
						/>
					) : (
						<ActivityIndicator
							size="large"
							color="#fff"
						/>
					)}
				</View>
				<Text
					size={22}
					family="bold"
					style={styles.title}>
					{isOrderCreating ? 'Creating Order...' : 'Checkout Successful!'}
				</Text>
				{!isOrderCreating && (
					<Text
						size={14}
						style={styles.subtitle}>
						Your crypto purchase has been completed successfully.
					</Text>
				)}

				{!isOrderCreating && (
					<Button
						text="Continue Shopping"
						onPress={() => router.back()}
						style={styles.button}
					/>
				)}
			</View>
		</Background>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 20,
		justifyContent: 'center',
	},
	content: {
		gap: 12,
		alignItems: 'center',
	},
	iconWrapper: {
		marginBottom: 10,
	},
	title: {
		marginTop: 4,
	},
	subtitle: {
		opacity: 0.6,
		textAlign: 'center',
	},
	button: {
		marginTop: 24,
	},
});
