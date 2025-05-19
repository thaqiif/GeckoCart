import { Background } from '@/components/Background';
import Text from '@/components/Text/Text';
import { useMemo } from 'react';
import { View } from 'react-native';
import Icon from '../Icon/Icon';

export type PriceIndicatorProps = {
	valueChange?: number;
	typeChange?: 'percent' | 'price';
};

export default function PriceIndicator({ valueChange, typeChange = 'percent' }: PriceIndicatorProps) {
	if (!valueChange) {
		return null;
	}

	const theme = useMemo(() => {
		if (valueChange > 0) {
			return 'success';
		}
		return 'danger';
	}, [valueChange]);

	const iconName = useMemo(() => {
		if (valueChange > 0) {
			return 'caret-up';
		}
		return 'caret-down';
	}, [valueChange]);

	const value = useMemo(() => {
		if (typeChange === 'percent') {
			return `${Math.abs(valueChange)}%`;
		}
		if (typeChange === 'price') {
			return `$${Math.abs(valueChange)}`;
		}
		return '';
	}, [valueChange]);

	if (!value) {
		return null;
	}

	return (
		<Background
			theme={theme}
			style={{
				maxWidth: 80,
				borderRadius: 4,
				overflow: 'hidden',
			}}>
			<View
				style={{
					gap: 2,
					marginVertical: 4,
					flexDirection: 'row',
					alignItems: 'center',
					marginHorizontal: 8,
				}}>
				<Icon
					iconSize={12}
					name={iconName}
				/>
				<Text
					size={12}
					family="semiBold"
					numberOfLines={1}
					adjustsFontSizeToFit={true}>
					{value}
				</Text>
			</View>
		</Background>
	);
}
