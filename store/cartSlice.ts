import { clearCartDb, deleteCartItemDb, insertCartItemDb, updateCartItemDb } from '@/services/database';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
	id: string;
	name: string;
	symbol: string;
	amount: number;
	price_usd: number;
	old_price_usd: number;
	image: string;
}

interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartItems: (state, action: PayloadAction<CartItem[]>) => {
			state.items = action.payload;
		},
		addCartItem: (state, action: PayloadAction<CartItem>) => {
			state.items.push(action.payload);
			insertCartItemDb(
				action.payload.id,
				action.payload.name,
				action.payload.symbol,
				action.payload.amount,
				action.payload.price_usd,
				action.payload.image
			);
		},
		updateCartItem: (state, action: PayloadAction<{ id: string; amount?: number; price_usd?: number }>) => {
			const item = state.items.find((i) => i.id === action.payload.id);
			if (item) {
				if (action.payload.amount) {
					item.amount = action.payload.amount;
				}
				if (action.payload.price_usd) {
					item.price_usd = action.payload.price_usd;
				}
				updateCartItemDb(action.payload.id, action.payload.amount, action.payload.price_usd);
			}
		},
		deleteCartItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
			deleteCartItemDb(action.payload);
		},
		clearCart: (state) => {
			state.items = [];
			clearCartDb();
		},
	},
});

export const { setCartItems, addCartItem, updateCartItem, deleteCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
