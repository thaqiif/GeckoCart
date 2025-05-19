import React from 'react';
import { StyleSheet, View } from 'react-native';

interface GridProps<T> {
	items: T[];
	numberOfColumns: number;
	renderItem: (item: T, index: number) => React.ReactNode;
	gap?: number;
}

export function Grid<T>({ items, numberOfColumns, renderItem, gap = 8 }: GridProps<T>) {
	const rows = [];

	for (let i = 0; i < items.length; i += numberOfColumns) {
		const rowItems = items.slice(i, i + numberOfColumns);
		rows.push(
			<View
				key={`row-${i}`}
				style={[styles.row, { gap, marginBottom: gap }]}>
				{rowItems.map((item, index) => (
					<View
						style={{ flex: 1 }}
						key={index}>
						{renderItem(item, i + index)}
					</View>
				))}
				{rowItems.length < numberOfColumns &&
					Array.from({ length: numberOfColumns - rowItems.length }).map((_, idx) => (
						<View
							key={`spacer-${idx}`}
							style={{ flex: 1 }}
						/>
					))}
			</View>
		);
	}

	return <View>{rows}</View>;
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
	},
});
