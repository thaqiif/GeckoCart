import React, { useState } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { Background } from '../Background';
import Text from '../Text/Text';

type TabSelectorProps = {
	options: string[];
	defaultSelected: string;
	onTabSelected?: (option: string) => void;
	containerStyle?: ViewStyle;
};

const TabSelector = ({ options, defaultSelected, onTabSelected, containerStyle }: TabSelectorProps) => {
	const [selectedRange, setSelectedRange] = useState(defaultSelected);

	const handleSelection = (option: string) => {
		setSelectedRange(option);
		onTabSelected?.(option);
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<View style={styles.optionsContainer}>
				{options.map((option, index) => {
					const isSelected = option === selectedRange;

					return (
						<Pressable
							key={index}
							onPress={() => handleSelection(option)}
							style={styles.optionWrapper}>
							{isSelected && (
								<Background
									theme="secondary"
									style={styles.selectedBackground}
								/>
							)}

							<Text
								size={12}
								family="extraBold"
								style={[styles.optionText, { opacity: isSelected ? 1 : 0.8 }]}>
								{option}
							</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		marginVertical: 15,
	},
	optionsContainer: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	optionWrapper: {
		paddingVertical: 8,
		marginHorizontal: 5,
		alignItems: 'center',
		position: 'relative',
		paddingHorizontal: 15,
		justifyContent: 'center',
	},
	selectedBackground: {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: 8,
		position: 'absolute',
	},
	optionText: {
		zIndex: 2,
		letterSpacing: 1,
	},
});

export default TabSelector;
