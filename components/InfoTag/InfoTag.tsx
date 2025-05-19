import { useMemo } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import InfoTagItem from './InfoTagItem';

type InfoTagProps = {
	title: string;
	items: string[];
	numberOfItemsToDisplay?: number | `all`;
    onPress?: () => void;
};

export default function InfoTag(props: InfoTagProps & View['props']) {
	const { title, items, numberOfItemsToDisplay = 'all', onPress, style } = props;
	const showFull = numberOfItemsToDisplay === `all`;

	const itemsToDisplay = showFull ? items : items.slice(0, numberOfItemsToDisplay);

	if (!showFull && items.length > 2) {
		itemsToDisplay.push(`+${items.length - numberOfItemsToDisplay} more`);
	}

	const containerStyle: ViewStyle = useMemo(() => {
		if (showFull) {
			return {};
		}

		return styles.rowContainer;
	}, [showFull]);

	const tagContainerStyle: ViewStyle = useMemo(() => {
		if (showFull) {
			return styles.fullTagContainer;
		}

		return styles.compactTagContainer;
	}, [showFull]);

	return (
		<Pressable style={[styles.container, containerStyle, style]} onPress={onPress}>
			<Text
				size={14}
				style={styles.titleText}>
				{title}
			</Text>
			<View style={[styles.tagsContainer, tagContainerStyle]}>
				{itemsToDisplay.map((item, index) => (
					<InfoTagItem
						key={index}
						text={item}
					/>
				))}
			</View>
			{!showFull && (
				<View style={styles.iconContainer}>
					<Icon
						iconSize={8}
						name="chevron-right"
					/>
				</View>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 6,
	},
	rowContainer: {
		flexDirection: 'row',
	},
	titleText: {
		flex: 0.4,
	},
	tagsContainer: {
		flex: 1,
		flexDirection: 'row',
		gap: 4,
		flexWrap: 'wrap',
	},
	fullTagContainer: {
		marginTop: 2,
	},
	compactTagContainer: {
		justifyContent: 'flex-end',
	},
	iconContainer: {
		marginTop: 2,
	},
});
