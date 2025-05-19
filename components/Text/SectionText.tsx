import { hexToRGBA } from '@/utils/utils';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { View, StyleSheet } from 'react-native';
import { useThemeColor } from '../Themed';
import Text, { TextProps } from './Text';

type CustomProps = {
	iconName?: React.ComponentProps<typeof FontAwesome5>['name'];
	iconColor?: string;
};

type SectionTextProps = CustomProps & TextProps;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
	},
	text: {
		opacity: 0.8,
		textTransform: 'uppercase',
		letterSpacing: 1,
	},
	icon: {
		opacity: 0.8,
		marginLeft: 4,
	},
});

export default function SectionText(props: SectionTextProps) {
	const { style, iconName, iconColor, ...otherProps } = props;

	const colorForIcon = iconColor ?? useThemeColor('primaryText');
	const colorForText = hexToRGBA(useThemeColor('secondaryText'));

	return (
		<View style={styles.container}>
			<Text
				size={12}
				family="extraBold"
				style={[styles.text, { color: colorForText }, style]}
				{...otherProps}
			/>
			{!!iconName && (
				<FontAwesome5
					size={10}
					name={iconName}
					color={colorForIcon}
					style={styles.icon}
				/>
			)}
		</View>
	);
}
