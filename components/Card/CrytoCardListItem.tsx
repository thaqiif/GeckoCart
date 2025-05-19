import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Background } from '../Background';
import CryptoLogo from '../Image/CryptoLogo';
import Text from '../Text/Text';

interface CryptoCardListItemProps {
	coinId: string;
	symbol: string;
	name: string;
	image: string;
	geckoRank: number;
}

export default function CryptoCardListItem({ coinId, symbol, name, image, geckoRank }: CryptoCardListItemProps) {
	return (
		<Pressable onPress={() => router.push({ pathname: '/detail/CryptoDetail', params: { coinId } })}>
			<Background
				theme="secondary"
				style={styles.container}>
				<View style={styles.rankContainer}>
					<Text
						size={10}
						numberOfLines={1}
						style={styles.rankText}
						adjustsFontSizeToFit={true}>
						{geckoRank}
					</Text>
				</View>
				<View style={styles.contentContainer}>
					<View style={styles.coinInfoContainer}>
						<CryptoLogo
							icon={{ uri: image }}
							withoutBackground={true}
						/>
						<View style={styles.textContainer}>
							<Text
								size={16}
								family="bold"
								numberOfLines={1}>
								{symbol}
							</Text>
							<Text
								size={14}
								numberOfLines={1}
								style={styles.nameText}
								adjustsFontSizeToFit={true}>
								{name}
							</Text>
						</View>
					</View>
				</View>
			</Background>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 8,
		paddingVertical: 14,
		flexDirection: 'row',
		paddingHorizontal: 8,
	},
	rankContainer: {
		flex: 0.1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rankText: {
		opacity: 0.6,
	},
	contentContainer: {
		gap: 8,
		flex: 0.9,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 8,
		justifyContent: 'space-between',
	},
	coinInfoContainer: {
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center',
	},
	textContainer: {
		marginHorizontal: 6,
	},
	nameText: {
		opacity: 0.5,
	},
});
