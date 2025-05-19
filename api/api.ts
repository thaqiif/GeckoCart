import { SortByOrderBy } from '@/constants/Constants';
import {
	CoinDetail,
	CoinListItem,
	MarketChartData,
	MarketCoin,
	PingResponse,
	SearchResponse,
	SimplePriceResponse,
	TrendingResponse,
} from '@/entities/model';
import axios, { AxiosResponse } from 'axios';

const coingeckoClient = axios.create({
	baseURL: 'https://api.coingecko.com/api/v3',
	timeout: 10000,
	headers: {
		'x-cg-demo-api-key': 'demo-api-key-here',
	},
});

/**
 * GET /ping
 * Check API server status.
 */
export async function ping(): Promise<PingResponse> {
	const response: AxiosResponse<PingResponse> = await coingeckoClient.get('/ping');
	return response.data;
}

/**
 * GET /coins/list
 * List all supported coins id, name and symbol (no pagination required).
 * Optionally pass { include_platform: true } to get contract addresses in the response.
 */
export async function getCoinList(includePlatform = false): Promise<CoinListItem[]> {
	const response: AxiosResponse<CoinListItem[]> = await coingeckoClient.get('/coins/list', {
		params: { include_platform: includePlatform },
	});
	return response.data;
}

/**
 * GET /coins/markets
 * List price, market cap, volume, etc. for (optionally) a list of coin ids.
 * Example of vsCurrency: 'usd' (required).
 */
export interface GetCoinsMarketsParams {
	vs_currency: string;
	ids?: string; // comma-separated list of coin IDs (e.g. 'bitcoin,ethereum')
	order?: SortByOrderBy;
	per_page?: number; // up to 250
	page?: number;
	sparkline?: boolean;
	price_change_percentage?: string; // e.g. '1h,24h,7d'
	locale?: string;
}

export async function getCoinsMarkets(params: GetCoinsMarketsParams): Promise<MarketCoin[]> {
	const response: AxiosResponse<MarketCoin[]> = await coingeckoClient.get('/coins/markets', {
		params,
	});
	return response.data;
}

/**
 * GET /coins/{id}
 * Get current data (name, price, market, etc.) for a coin.
 */
export interface GetCoinByIdParams {
	id: string; // e.g. 'bitcoin'
	localization?: boolean;
	tickers?: boolean;
	market_data?: boolean;
	community_data?: boolean;
	developer_data?: boolean;
	sparkline?: boolean;
}

export async function getCoinById(params: GetCoinByIdParams): Promise<CoinDetail> {
	const { id, ...rest } = params;
	const response: AxiosResponse<CoinDetail> = await coingeckoClient.get(`/coins/${id}`, {
		params: rest,
	});
	return response.data;
}

/**
 * GET /simple/price
 * Get the current price of any cryptocurrencies in any other supported currencies.
 */
export interface GetSimplePriceParams {
	ids: string; // e.g. 'bitcoin,ethereum'
	vs_currencies: string; // e.g. 'usd,eth'
	include_market_cap?: boolean;
	include_24hr_vol?: boolean;
	include_24hr_change?: boolean;
	include_last_updated_at?: boolean;
	precision?: 'full' | number;
}

export async function getSimplePrice(params: GetSimplePriceParams): Promise<SimplePriceResponse> {
	const response: AxiosResponse<SimplePriceResponse> = await coingeckoClient.get('/simple/price', {
		params,
	});
	return response.data;
}

/**
 * GET /search/trending
 * Returns the top-7 trending coins on CoinGecko as searched by users in the last 24 hours.
 */
export async function getTrendingCoins(): Promise<TrendingResponse> {
	const response: AxiosResponse<TrendingResponse> = await coingeckoClient.get('/search/trending');
	return response.data;
}

/**
 * GET /search
 *
 */
export async function getSearchCoinsByNameOrSymbol(query: string): Promise<SearchResponse> {
	const response: AxiosResponse<SearchResponse> = await coingeckoClient.get('/search', {
		params: {
			query,
		},
	});
	return response.data;
}

/**
 * GET /coins/{id}/market_chart
 * Get historical market data (price, market cap, 24h volume) for a coin.
 *
 * Data granularity is automatically adjusted:
 * - 1 day from current time => 5-minute interval
 * - 2–90 days => hourly data
 * - Above 90 days => daily data (00:00 UTC)
 */
export interface GetMarketChartParams {
	// The coin’s ID, e.g. "bitcoin" or "ethereum".
	id: string;

	// The target currency of market data, e.g. "usd" or "eur".
	vs_currency: string;

	// Data up to number of days ago (e.g. 1, 7, 14, 30, 90, 365, or "max").
	days: string | number;

	// [Optional] Data interval. E.g. "daily".
	// This is available only for certain paid tiers,
	// but including it won't hurt if your plan supports it.
	interval?: 'daily';

	// [Optional] "full" or 0-18 to specify decimal places for currency price value.
	precision?: 'full' | number;
}

export async function getMarketChart(params: GetMarketChartParams): Promise<MarketChartData> {
	const { id, vs_currency, days, interval, precision } = params;

	const response: AxiosResponse<MarketChartData> = await coingeckoClient.get(`/coins/${id}/market_chart`, {
		params: {
			vs_currency,
			days,
			interval,
			precision,
		},
	});

	return response.data;
}
