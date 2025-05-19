import Icon from '@/components/Icon/Icon';
import { useThemeColor } from '@/components/Themed';
import { useAppSelector } from '@/store/hooks';
import { router } from 'expo-router';
import { hexToRGBA } from '@/utils/utils';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

export default function TabLayout() {
	const { items } = useAppSelector((state) => state.cart);
	return (
		<Tabs
			screenOptions={({ route }: any) => ({
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarActiveTintColor: useThemeColor('primaryText'),
				tabBarStyle: { backgroundColor: useThemeColor('primaryBackground') },
				tabBarInactiveTintColor: hexToRGBA(useThemeColor('primaryText'), 0.5),
				tabBarButton: (props: any) => {
					if (route.name === 'cart') {
						return (
							<Pressable
								{...props}
								onPress={() => {
									router.navigate('/cart/cart');
								}}
							/>
						);
					}
					return <Pressable {...props} />;
				},
			})}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Discover',
					tabBarIcon: ({ color }: any) => (
						<Icon
							name="compass"
							iconColor={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: 'Search',
					tabBarIcon: ({ color }: any) => (
						<Icon
							name="search"
							iconColor={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="cart"
				options={{
					title: 'My Cart',
					tabBarIcon: ({ color }: any) => (
						<Icon
							iconColor={color}
							name="shopping-cart"
						/>
					),
					tabBarBadge: items.length > 0 ? items.length : undefined,
					tabBarBadgeStyle: {
						fontSize: 12,
						color: useThemeColor('primaryText'),
						backgroundColor: useThemeColor('success'),
					},
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: 'History',
					tabBarIcon: ({ color }: any) => (
						<Icon
							name="receipt"
							iconColor={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
