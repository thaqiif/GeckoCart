import { Image as ExpoImage } from 'expo-image';
import React from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';

interface CryptoLogoProps {
	dim?: boolean;
	size?: number;
	backgroundColor?: string;
	withoutBackground?: boolean;
	icon: ImageSourcePropType | string;
}

const CryptoLogo = ({
	icon,
	size = 40,
	dim = true,
	withoutBackground = false,
	backgroundColor = 'rgba(255, 255, 255, 0.05)',
}: CryptoLogoProps) => {
	const isRemote = typeof icon === 'string';
	const imageSource = isRemote ? { uri: icon } : icon;
	const imageSize = size * (withoutBackground ? 0.8 : 0.7);

	const image = (
		<ExpoImage
			source={imageSource}
			contentFit="contain"
			cachePolicy={isRemote ? 'memory-disk' : 'none'}
			style={{ width: imageSize, height: imageSize, opacity: dim ? 0.8 : 1 }}
		/>
	);

	return (
		<View style={[styles.iconWrapper, { width: size, height: size }]}>
			{withoutBackground ? (
				image
			) : (
				<View
					style={[
						styles.iconWrapper,
						{
							width: size,
							height: size,
							backgroundColor,
							borderRadius: size / 2,
						},
					]}>
					{image}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	iconWrapper: {
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default CryptoLogo;
