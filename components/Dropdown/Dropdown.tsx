import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';
import { Background } from '../Background';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import { useThemeColor } from '../Themed';

interface Option {
	label: string;
	value: string;
}

interface SelectDropdownProps {
	label?: string;
	value: string;
	options: Option[];
	onChange: (value: string) => void;
}

const SelectDropdown = ({ label = 'Order by:', value, options, onChange }: SelectDropdownProps) => {
	const [open, setOpen] = useState(false);
	const primaryTextColor = useThemeColor('primaryText');
	const selectedLabel = options.find((opt) => opt.value === value)?.label ?? 'Select';

	return (
		<View style={styles.container}>
			<Pressable onPress={() => setOpen(true)}>
				<Background
					theme="secondary"
					style={styles.dropdownButton}>
					<Text>
						<Text
							size={14}
							family="bold">
							{label}:
						</Text>{' '}
						<Text size={14}>{selectedLabel}</Text>
					</Text>
					<Icon
						name="sort"
						iconSize={12}
					/>
				</Background>
			</Pressable>

			<Modal
				transparent
				visible={open}
				animationType="fade">
				<Pressable
					style={styles.backdrop}
					onPress={() => setOpen(false)}>
					<View style={styles.modalContainer}>
						<FlatList
							data={options}
							keyExtractor={(item) => item.value}
							renderItem={({ item }) => (
								<Pressable
									style={styles.optionItem}
									onPress={() => {
										onChange(item.value);
										setOpen(false);
									}}>
									<Text size={16}>{item.label}</Text>
									{selectedLabel === item.label && (
										<Icon
											name="check"
											iconSize={12}
											iconColor={primaryTextColor}
										/>
									)}
								</Pressable>
							)}
						/>
					</View>
				</Pressable>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	dropdownButton: {
		flex: 1,
		borderRadius: 8,
		paddingVertical: 10,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 12,
		justifyContent: 'space-between',
	},
	backdrop: {
		flex: 1,
		paddingHorizontal: 24,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	modalContainer: {
		borderRadius: 10,
		backgroundColor: '#1e1e1e',
	},
	optionItem: {
		padding: 12,
		borderBottomWidth: 1,
		alignItems: 'center',
		flexDirection: 'row',
		borderBottomColor: '#333',
		justifyContent: 'space-between',
	},
});

export default SelectDropdown;
