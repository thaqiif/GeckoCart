//
// 1. Basic coin info as returned by /coins/list
//
export interface CoinListItem {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	price_change_24h: number;
	price_change_percentage_24h: number;
}

//
// 2. Response from /coins/markets
//
export interface MarketCoin {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	market_cap: number;
	market_cap_rank: number;
	fully_diluted_valuation: number | null;
	total_volume: number;
	high_24h: number;
	low_24h: number;
	price_change_24h: number;
	price_change_percentage_24h: number;
	market_cap_change_24h: number;
	market_cap_change_percentage_24h: number;
	circulating_supply: number;
	total_supply: number | null;
	max_supply: number | null;
	ath: number;
	ath_change_percentage: number;
	ath_date: string;
	atl: number;
	atl_change_percentage: number;
	atl_date: string;
	roi?: {
		times: number;
		currency: string;
		percentage: number;
	};
	last_updated: string;
}

//
// 3. Full coin detail from /coins/{id}
//
export interface CoinDetail {
	id: string;
	symbol: string;
	name: string;
	asset_platform_id: string | null;
	platforms: Record<string, string>;
	detail_platforms: {
		[key: string]: {
			decimal_place: number;
			contract_address: string;
		};
	};
	block_time_in_minutes?: number;
	hashing_algorithm: string | null;
	categories?: string[];
	description?: {
		en: string;
		[key: string]: string;
	};
	localization?: {
		[key: string]: string;
	};
	links?: {
		homepage: string[];
		whitepaper?: string;
		blockchain_site: string[];
		official_forum_url: string[];
		twitter_screen_name?: string;
		telegram_channel_identifier?: string;
		facebook_username?: string;
		subreddit_url?: string;
		repos_url?: {
			github: string[];
			bitbucket: string[];
		};
	};
	image?: {
		thumb: string;
		small: string;
		large: string;
	};
	genesis_date?: string | null;
	country_origin?: string;
	sentiment_votes_up_percentage?: number;
	sentiment_votes_down_percentage?: number;
	watchlist_portfolio_users?: number;
	market_cap_rank?: number;
	preview_listing?: boolean;
	market_data?: {
		current_price: Record<string, number>;
		market_cap?: Record<string, number>;
		total_volume?: Record<string, number>;
		ath?: Record<string, number>;
		ath_change_percentage?: Record<string, number>;
		ath_date?: Record<string, string>;
		atl?: Record<string, number>;
		atl_change_percentage?: Record<string, number>;
		atl_date?: Record<string, string>;
		market_cap_rank?: number;
		fully_diluted_valuation?: Record<string, number>;
		market_cap_fdv_ratio?: number;
		total_value_locked?: number | null;
		mcap_to_tvl_ratio?: number | null;
		fdv_to_tvl_ratio?: number | null;
		roi?: any;
		high_24h?: Record<string, number>;
		low_24h?: Record<string, number>;
		price_change_24h?: number;
		price_change_percentage_24h?: number;
		price_change_percentage_7d?: number;
		price_change_percentage_14d?: number;
		price_change_percentage_30d?: number;
		price_change_percentage_60d?: number;
		price_change_percentage_200d?: number;
		price_change_percentage_1y?: number;
		market_cap_change_24h?: number;
		market_cap_change_percentage_24h?: number;
		price_change_24h_in_currency?: Record<string, number>;
		price_change_percentage_1h_in_currency?: Record<string, number>;
		price_change_percentage_24h_in_currency?: Record<string, number>;
		price_change_percentage_7d_in_currency?: Record<string, number>;
		price_change_percentage_14d_in_currency?: Record<string, number>;
		price_change_percentage_30d_in_currency?: Record<string, number>;
		total_supply: number;
		max_supply: number;
		max_supply_infinite: boolean;
		circulating_supply?: number;
	};
	last_updated?: string;
}

//
// 4. Simple price response from /simple/price
//    The response is shaped like: { [coinId: string]: { [vsCurrency: string]: number } }
//
export interface SimplePriceResponse {
	[coinId: string]: {
		[vsCurrency: string]: number | undefined;
	};
}

//
// 5. Example for /ping
//
export interface PingResponse {
	gecko_says: string;
}

// Response from GET /search/trending
export interface TrendingResponse {
	coins: Array<{
		item: TrendingCoinItem;
	}>;
}

export interface TrendingCoinData {
	price: number;
	price_btc: string;
	price_change_percentage_24h: {
		[currencyCode: string]: number;
	};
	market_cap: string;
	market_cap_btc: string;
	total_volume: string;
	total_volume_btc: string;
	sparkline: string;
	content: {
		title: string;
		description: string;
	};
}

export interface TrendingCoinItem {
	id: string;
	coin_id: number;
	name: string;
	symbol: string;
	market_cap_rank: number;
	thumb: string;
	small: string;
	large: string;
	slug: string;
	price_btc: number;
	score: number;

	// Transient
	data?: TrendingCoinData;
}

export interface SearchResponse {
	coins: TrendingCoinItem[];
}

export interface MarketChartData {
	prices: Array<[number, number]>;
	market_caps: Array<[number, number]>;
	total_volumes: Array<[number, number]>;
}
