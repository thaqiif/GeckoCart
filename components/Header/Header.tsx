import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import { useThemeColor } from '../Themed';

type AvatarHeaderProps = {
	avatarUrl: string;
	rightComponentType: 'avatar';
};

type RightButtonHeaderProps = {
	rightComponentText: string;
	rightComponentType: 'button';
	rightComponentOnPress: () => void;
};

type NoRightComponentHeaderProps = {
	rightComponentType: 'none';
};

type HeaderProps = {
	title: string;
	miniTitle?: string;
	enableBackButton?: boolean;
};

type CustomHeaderProps = HeaderProps & (AvatarHeaderProps | RightButtonHeaderProps | NoRightComponentHeaderProps);

export default function Header(props: CustomHeaderProps) {
	const { title, miniTitle, enableBackButton, rightComponentType } = props;
	return (
		<View style={styles.header}>
			{enableBackButton && (
				<Pressable
					onPress={() => router.back()}
					style={styles.leftContainer}>
					<Icon
						name="chevron-left"
						iconSize={14}
					/>
				</Pressable>
			)}

			<View style={styles.rightContainer}>
				<View style={styles.titleContainer}>
					<Text
						size={24}
						family="bold">
						{title}
					</Text>
					{!!miniTitle && <Text size={12}>{miniTitle}</Text>}
				</View>

				{rightComponentType === 'avatar' && (
					<Image
						source={{ uri: props.avatarUrl }}
						style={[styles.avatar, { borderColor: useThemeColor('hintBackground') }]}
					/>
				)}
				{rightComponentType === 'button' && (
					<Pressable onPress={props.rightComponentOnPress}>
						<Text
							size={12}
							family="bold"
							style={styles.rightComponentText}>
							{props.rightComponentText}
						</Text>
					</Pressable>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		gap: 16,
		marginTop: 70,
		paddingVertical: 14,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 16,
	},
	container: {
		flex: 1,
	},
	titleContainer: {
		flex: 1,
		gap: 2,
	},
	leftContainer: {
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	rightContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	avatar: {
		width: 35,
		height: 35,
		borderWidth: 0.2,
		borderRadius: 35 / 2,
	},
	rightComponentText: {
		opacity: 0.8,
		letterSpacing: 1,
		marginVertical: 8,
		marginHorizontal: 12,
		textTransform: 'uppercase',
	},
});
