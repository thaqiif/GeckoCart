import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useMemo } from 'react';
import { useThemeColor } from '../Themed';

type IconType = {
	iconSize?: number;
	iconColor?: string;
	name: React.ComponentProps<typeof FontAwesome5>['name'];
};

export default function Icon(props: IconType) {
	let { iconSize, iconColor, name } = props;

	const primaryColor = useThemeColor('primaryText');
	const size = useMemo(() => iconSize ?? 24, [iconSize]);
	const color = useMemo(() => iconColor ?? primaryColor, [iconColor]);

	return (
		<FontAwesome5
			name={name}
			size={size}
			color={color}
		/>
	);
}
