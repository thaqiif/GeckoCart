import { useMemo } from 'react';
import { Text as DefaultText } from 'react-native';
import { useThemeColor } from '../Themed';

type CustomProps = {
	theme?: 'primary' | 'secondary' | 'black';
	family?: 'regular' | 'medium' | 'bold' | 'extraBold' | 'semiBold';
	size?: number;
};

export type TextProps = CustomProps & DefaultText['props'];

export default function Text(props: TextProps) {
	let { theme, family, size, style, ...otherProps } = props;

	const textTheme = useMemo(() => {
		if (theme === 'black') {
			return 'blackText';
		} else if (theme === 'secondary') {
			return 'secondaryText';
		}
		return 'primaryText';
	}, [theme]);

	const color = useThemeColor(textTheme);
	const fontFamily = useMemo(() => {
		if (family === 'bold') {
			return 'RethinkSansBold';
		}
		if (family === 'semiBold') {
			return 'RethinkSansSemiBold';
		}
		if (family === 'extraBold') {
			return 'RethinkSansExtraBold';
		}
		if (family === 'medium') {
			return 'RethinkSansMedium';
		}
		return 'RethinkSansRegular';
	}, [family]);

	const fontSize = useMemo(() => size ?? 16, [size]);

	return (
		<DefaultText
			{...otherProps}
			style={[{ color, fontFamily, fontSize }, style]}
		/>
	);
}
