import { Background } from '@/components/Background';
import { useThemeColor } from '@/components/Themed';
import { TextInput as DefaultTextInput } from 'react-native';

type TextInputProps = DefaultTextInput['props'];

export default function TextInput(props: TextInputProps) {
	const { style, ...otherProps } = props;
	return (
		<Background
			opacity={0.8}
			theme="secondary"
			style={{ borderRadius: 8, justifyContent: 'center', paddingHorizontal: 8, paddingVertical: 14 }}>
			<DefaultTextInput
				spellCheck={false}
				autoCorrect={false}
				placeholderTextColor={useThemeColor('secondaryText')}
				style={[{ fontSize: 14, color: useThemeColor('primaryText') }, style]}
				{...otherProps}
			/>
		</Background>
	);
}
