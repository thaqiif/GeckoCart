import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Background } from '../Background';
import Text from '../Text/Text';

type ButtonProps = {
	text: string;
	onPress?: () => void;
	disabled?: boolean;
	flashText?: string;
	flashDuration?: number;
} & View['props'];

export default function Button({ text, onPress, style, disabled, flashText, flashDuration }: ButtonProps) {
	const [displayText, setDisplayText] = useState(text);

	useEffect(() => {
		setDisplayText(text);
	}, [text]);

	return (
		<Pressable
			onPress={() => {
				if (onPress) {
					onPress();
					if (flashText) {
						setDisplayText(flashText);
						setTimeout(() => {
							setDisplayText(text);
						}, flashDuration ?? 2000);
					}
				}
			}}
			disabled={disabled}>
			<Background
				theme="secondary"
				style={[styles.buttonContainer, { opacity: !disabled ? 1 : 0.5 }, style]}>
				<Text
					size={16}
					family="bold"
					style={styles.buttonText}>
					{displayText}
				</Text>
			</Background>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		letterSpacing: 1,
	},
});
