import { StyleSheet, View, ViewStyle } from 'react-native';
import InfoDetailItem, { InfoDetailItemProps } from './InfoDetailItem';

type InfoDetailProps = {
	items: InfoDetailItemProps[];
	numberOfColumns?: number;
	containerStyles?: ViewStyle;
};

export default function InfoDetail({ items, numberOfColumns = 2, containerStyles }: InfoDetailProps) {
	if (!items || items.length === 0) {
		return null;
	}

	items = items.filter((item) => !item.hide);

	const numberOfRows = Math.ceil(items.length / numberOfColumns);
	const rows = [];

	for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
		const startIndex = rowIndex * numberOfColumns;
		const rowItems = items.slice(startIndex, startIndex + numberOfColumns);

		rows.push(
			<View
				style={styles.row}
				key={`row-${rowIndex}`}>
				{rowItems.map((item, columnIndex) => (
					<InfoDetailItem
						{...item}
						key={`item-${columnIndex}`}
					/>
				))}
			</View>
		);
	}

	return <View style={[styles.container, containerStyles]}>{rows}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	row: {
		flexDirection: 'row',
		marginVertical: 5,
	},
});
