import { white } from '@/constants/Colors';
import { BlurView } from 'expo-blur';
import React, { useRef } from 'react';
import { Animated, RefreshControl, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedScrollViewWithBlur = ({
	style,
	children,
	setScrollEnded,
	onScrollToRefresh,
	blurTint = 'default',
	contentContainerStyle,
	maxBlurIntensity = 50,
	scrollMultiplier = 0.5,
	initialBlurIntensity = 0,
	showsVerticalScrollIndicator = true,
	...scrollViewProps
}: any) => {
	const insets = useSafeAreaInsets();
	const scrollY = useRef(new Animated.Value(0)).current;

	const [currentBlurIntensity, setCurrentBlurIntensity] = React.useState(initialBlurIntensity);
	const [refreshing, setRefreshing] = React.useState(false);

	const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
		useNativeDriver: false,
		listener: (event: any) => {
			const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

			const scrollPosition = contentOffset.y;
			const newIntensity = Math.min(maxBlurIntensity, initialBlurIntensity + scrollPosition * scrollMultiplier);
			setCurrentBlurIntensity(newIntensity >= 0 ? newIntensity : initialBlurIntensity);

			const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
			setScrollEnded?.(isAtBottom);
		},
	});

	const handleRefresh = async () => {
		if (!onScrollToRefresh) return;
		setRefreshing(true);
		await onScrollToRefresh();
		setRefreshing(false);
	};

	return (
		<View style={styles.container}>
			<View style={[styles.statusBarBlur, { height: insets.top > 0 ? insets.top : 20 }]}>
				<BlurView
					tint={blurTint}
					intensity={currentBlurIntensity}
					style={StyleSheet.absoluteFill}
				/>
			</View>

			<Animated.ScrollView
				onScroll={handleScroll}
				scrollEventThrottle={16}
				style={[styles.container, style]}
				contentContainerStyle={contentContainerStyle}
				showsVerticalScrollIndicator={showsVerticalScrollIndicator}
				refreshControl={
					onScrollToRefresh ? (
						<RefreshControl
							colors={[white]}
							tintColor={white}
							refreshing={refreshing}
							onRefresh={handleRefresh}
							progressViewOffset={insets.top + 10}
						/>
					) : undefined
				}
				{...scrollViewProps}>
				{children}
			</Animated.ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	statusBarBlur: {
		top: 0,
		left: 0,
		right: 0,
		zIndex: 999,
		position: 'absolute',
	},
});

export default AnimatedScrollViewWithBlur;
