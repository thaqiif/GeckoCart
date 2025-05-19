import { hexToRGBA } from '@/utils/utils';
import { Pressable, View } from 'react-native';
import Icon from '../Icon/Icon';
import PriceIndicator, { PriceIndicatorProps } from '../Label/PriceIndicator';
import Text from '../Text/Text';
import { useThemeColor } from '../Themed';

export type InfoDetailItemProps = {
	title: string;
	value: string;
	onClickInfo?: () => void;
	hide?: boolean;
} & PriceIndicatorProps;

export default function InfoDetailItem({ title, value, valueChange, typeChange, onClickInfo }: InfoDetailItemProps) {
	const iconColor = useThemeColor('primaryText');
	return (
		<Pressable
			onPress={onClickInfo}
			style={{ flex: 1 }}>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
				<Text
					size={10}
					family="regular">
					{title}
				</Text>
				{!!onClickInfo && (
					<Icon
						name="info-circle"
						iconSize={10}
						iconColor={hexToRGBA(iconColor, 0.5)}
					/>
				)}
			</View>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
				<Text
					size={16}
					family="semiBold"
					numberOfLines={1}
					adjustsFontSizeToFit={true}
					style={{ letterSpacing: -0.2 }}>
					{value}
				</Text>
				{!!valueChange && (
					<PriceIndicator
						typeChange={typeChange}
						valueChange={valueChange}
					/>
				)}
			</View>
		</Pressable>
	);
}
