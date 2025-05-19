import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import historyOrderReducer from './orderSlice';

const store = configureStore({
	reducer: {
		cart: cartReducer,
		historyOrder: historyOrderReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
