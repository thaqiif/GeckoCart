export interface CartItem {
	id: string;
	name: string;
	symbol: string;
	amount: number;
	price_usd: number;
	old_price_usd: number;
	image: string;
}

export interface Order {
	id: number;
	total_usd: number;
	created_at: string;
}

export interface OrderItem {
	id: number;
	order_id: number;
	coin_id: string;
	name: string;
	symbol: string;
	amount: number;
	price_usd: number;
	image: string;
}
