import Colors from '@/constants/Colors';
import { View as DefaultView } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';

export type ViewProps = DefaultView['props'];

export function useThemeColor(key: keyof (typeof Colors)['light']) {
	const theme = useColorScheme() ?? 'light';
	return Colors[theme][key];
}

export function PrimaryView(props: ViewProps) {
	const { style, ...otherProps } = props;
	const backgroundColor = useThemeColor('primaryBackground');

	return (
		<DefaultView
			style={[{ backgroundColor }, style]}
			{...otherProps}
		/>
	);
}
