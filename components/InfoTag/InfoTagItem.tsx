import { Background } from '../Background';
import Text from '../Text/Text';

type InfoTagItemProps = {
	text: string;
};

export default function InfoTagItem({ text }: InfoTagItemProps) {
	return (
		<Background
			theme="white"
			opacity={0.8}
			style={{ flex: 0, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 2 }}>
			<Text
				size={12}
				theme="black"
				numberOfLines={1}
				ellipsizeMode="tail">
				{text}
			</Text>
		</Background>
	);
}
