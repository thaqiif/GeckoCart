import { hexToRGBA } from '@/utils/utils';
import { useMemo } from 'react';
import { View as DefaultView } from 'react-native';
import { useThemeColor } from './Themed';

type CustomProps = {
	theme?: 'primary' | 'secondary' | 'hint' | 'success' | 'danger' | 'white';
	opacity?: number;
};

export type ViewProps = CustomProps & DefaultView['props'];

export function Background(props: ViewProps) {
	const { style, theme, opacity, ...otherProps } = props;

	const backgroundTheme = useMemo(() => {
		if (theme === 'secondary') {
			return 'secondaryBackground';
		} else if (theme === 'hint') {
			return 'hintBackground';
		} else if (theme === 'success') {
			return 'success';
		} else if (theme === 'danger') {
			return 'danger';
		} else if (theme === 'white') {
			return 'whiteBackground';
		}
		return 'primaryBackground';
	}, [theme]);

	const background = useThemeColor(backgroundTheme as any);
	const backgroundColor = useMemo(() => hexToRGBA(background, opacity), [background, opacity]);

	return (
		<DefaultView
			style={[{ backgroundColor }, style]}
			{...otherProps}
		/>
	);
}
