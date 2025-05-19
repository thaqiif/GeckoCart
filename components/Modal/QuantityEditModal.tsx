import { isValidQuantity } from '@/utils/utils';
import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Background } from '../Background';
import Button from '../Button/Button';
import TextInput from '../Input/TextInput';
import Text from '../Text/Text';

type Props = {
	visible: boolean;
	onClose: () => void;
	onDelete: () => void;
	initialQuantity: number;
	onSubmit: (quantity: number) => void;
};

export default function QuantityEditModal({ visible, onClose, onSubmit, onDelete, initialQuantity }: Props) {
	const [error, setError] = useState('');
	const [quantity, setQuantity] = useState<string>(initialQuantity.toString());

	const handleSubmit = () => {
		if (!isValidQuantity(quantity)) {
			setError('Enter a valid positive number (max 5 decimals)');
			return;
		}
		onSubmit(parseFloat(quantity));
		onClose();
	};

	const handleDelete = () => {
		onDelete();
		onClose();
	};

	useEffect(() => {
		setQuantity(initialQuantity.toString());
		setError('');
	}, [visible]);

	return (
		<Modal
			transparent
			visible={visible}
			animationType="fade">
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.overlay}>
					<Background
						theme="primary"
						style={styles.modalContent}>
						<Text
							size={14}
							family="bold">
							Edit Quantity
						</Text>
						<TextInput
							value={quantity}
							style={styles.input}
							keyboardType="decimal-pad"
							onChangeText={(text) => {
								setQuantity(text);
								setError('');
							}}
						/>
						{error ? (
							<Text
								size={10}
								style={{ color: 'red', marginTop: 4 }}>
								{error}
							</Text>
						) : null}

						<View style={styles.actions}>
							<View style={{ flexDirection: 'row', gap: 10 }}>
								<Button
									text="Cancel"
									onPress={onClose}
								/>
								<Button
									text="Delete"
									onPress={handleDelete}
								/>
							</View>
							<Button
								text="Update"
								onPress={handleSubmit}
							/>
						</View>
					</Background>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 30,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	modalContent: {
		gap: 10,
		padding: 20,
		width: '100%',
		borderRadius: 12,
	},
	input: {
		textAlign: 'center',
	},
	actions: {
		gap: 10,
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
