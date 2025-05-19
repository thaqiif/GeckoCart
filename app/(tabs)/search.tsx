import { getSearchCoinsByNameOrSymbol } from '@/api/api';
import AnimatedScrollViewWithBlur from '@/components/AnimatedScrollViewWithBlur';
import { Background } from '@/components/Background';
import Trending from '@/components/Card/Carousel/Trending';
import CryptoCardListItem from '@/components/Card/CrytoCardListItem';
import TextInput from '@/components/Input/TextInput';
import SectionText from '@/components/Text/SectionText';
import { TrendingCoinItem } from '@/entities/model';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
	const [searchText, setSearchText] = useState('');
	const [canStartSearch, setCanStartSearch] = useState(false);
	const [shouldResetList, setShouldResetList] = useState(false);
	const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);

	const shouldDisplayResult = searchText.length > 0 || isSearchInputFocused;

	return (
		<Background
			theme="primary"
			style={styles.container}>
			<AnimatedScrollViewWithBlur
				style={styles.scrollView}
				onScrollToRefresh={() => setShouldResetList(true)}>
				<SafeAreaView style={styles.safeArea}>
					<TextInput
						placeholder="Search by Name or Symbol"
						onChangeText={(text) => setSearchText(text)}
						onFocus={() => {
							setCanStartSearch(false);
							setIsSearchInputFocused(true);
						}}
						onBlur={() => setIsSearchInputFocused(false)}
						onSubmitEditing={() => setCanStartSearch(true)}
					/>

					{shouldDisplayResult ? (
						<SearchResult
							query={searchText}
							startSearch={canStartSearch}
						/>
					) : (
						<Trending
							shouldResetList={shouldResetList}
							onCompleteResetList={() => setShouldResetList(false)}
						/>
					)}
				</SafeAreaView>
			</AnimatedScrollViewWithBlur>
		</Background>
	);
}

interface SearchResultProps {
	query: string;
	startSearch: boolean;
}

function SearchResult({ query, startSearch }: SearchResultProps) {
	const [searchResultItems, setSearchResultItems] = useState<TrendingCoinItem[]>([]);
	useEffect(() => {
		if (startSearch) {
			getSearchCoinsByNameOrSymbol(query).then((response) => {
				setSearchResultItems(response?.coins ?? []);
			});
		} else {
			setSearchResultItems([]);
		}
	}, [startSearch, query]);

	if (searchResultItems.length === 0) {
		return null;
	}

	return (
		<View>
			<SectionText>result</SectionText>
			<View style={styles.searchResultList}>
				{searchResultItems.map((item) => (
					<CryptoCardListItem
						key={item.id}
						name={item.name}
						coinId={item.id}
						image={item.large}
						symbol={item.symbol}
						geckoRank={item.market_cap_rank}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 16,
	},
	safeArea: {
		flex: 1,
		paddingTop: 12,
		paddingBottom: 60,
	},
	searchResultList: {
		gap: 8,
	},
});
