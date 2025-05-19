import { HistoryOrdersProps } from '@/app/(tabs)/history';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
	historyOrder: HistoryOrdersProps[];
}

const initialState: OrderState = {
	historyOrder: [],
};

const historyOrderSlice = createSlice({
	name: 'historyOrders',
	initialState,
	reducers: {
		setOrderHistory: (state, action: PayloadAction<HistoryOrdersProps[]>) => {
			state.historyOrder = action.payload;
		},
	},
});

export const { setOrderHistory } = historyOrderSlice.actions;

export default historyOrderSlice.reducer;
