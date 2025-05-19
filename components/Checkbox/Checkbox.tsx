import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Background } from '../Background';
import Icon from '../Icon/Icon';

type CheckboxProps = {
	checked: boolean;
	style?: ViewStyle;
	onToggle?: () => void;
};

export default function Checkbox({ checked, onToggle, style }: CheckboxProps) {
	return (
		<Pressable onPress={onToggle}>
			<Background
				theme="white"
				opacity={0.1}
				style={[styles.checkbox, style]}>
				{checked && (
					<Icon
						name="check"
						iconSize={12}
					/>
				)}
			</Background>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	checkbox: {
		width: 20,
		height: 20,
		padding: 4,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
