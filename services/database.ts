import { HistoryOrdersProps } from '@/app/(tabs)/history';
import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import { CartItem, Order, OrderItem } from './database.model';

let db: SQLiteDatabase;

export const setupDatabase = async () => {
	db = await openDatabaseAsync('geckocart.db');

	await db.withTransactionAsync(async () => {
		await db.execAsync(`CREATE TABLE IF NOT EXISTS cart_items (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
			symbol TEXT NOT NULL,
            amount REAL NOT NULL,
            price_usd REAL NOT NULL,
			old_price_usd REAL NOT NULL,
			image TEXT NOT NULL,
            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);

		await db.execAsync(`CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            total_usd REAL NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);

		await db.execAsync(`CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            coin_id TEXT NOT NULL,
			name TEXT NOT NULL,
			symbol TEXT NOT NULL,
            amount REAL NOT NULL,
            price_usd REAL NOT NULL,
			image TEXT NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (coin_id) REFERENCES coins(id)
        );`);
	});
};

export const insertCartItemDb = async (
	coin_id: string,
	name: string,
	symbol: string,
	amount: number,
	price_usd: number,
	image: string
) => {
	const stmt = await db.prepareAsync(
		'INSERT INTO cart_items (id, name, symbol, amount, price_usd, old_price_usd, image) VALUES (?, ?, ?, ?, ?, ?, ?);'
	);
	await stmt.executeAsync([coin_id, name, symbol, amount, price_usd, price_usd, image]);
	await stmt.finalizeAsync();
};

export const updateCartItemDb = async (id: string, amount?: number, price_usd?: number) => {
	const params = [];
	const sqlParams = [];

	if (amount) {
		params.push(amount);
		sqlParams.push(`amount = ?`);
	}

	if (price_usd) {
		params.push(price_usd);
		sqlParams.push(`price_usd = ?`);
	}

	params.push(id);

	if (params.length === 1) {
		return;
	}

	const stmt = await db.prepareAsync(`UPDATE cart_items SET ${sqlParams.join(', ')} WHERE id = ?;`);
	await stmt.executeAsync(params);
	await stmt.finalizeAsync();
};

export const deleteCartItemDb = async (id: string) => {
	const stmt = await db.prepareAsync('DELETE FROM cart_items WHERE id = ?;');
	await stmt.executeAsync([id]);
	await stmt.finalizeAsync();
};

export const getCartItemsDb = async (): Promise<CartItem[]> => {
	return await db.getAllAsync('SELECT * FROM cart_items;');
};

export const clearCartDb = async () => {
	await db.execAsync('DELETE FROM cart_items;');
};

export const insertOrderDb = async (total_usd: number): Promise<number> => {
	const result = await db.runAsync('INSERT INTO orders (total_usd) VALUES (?);', [total_usd]);
	return result.lastInsertRowId;
};

export const getOrdersDb = async (): Promise<Order[]> => {
	return await db.getAllAsync('SELECT * FROM orders ORDER BY created_at DESC;');
};

export const getHistoryOrdersDb = async (): Promise<HistoryOrdersProps[]> => {
	const ordersAndItems: HistoryOrdersProps[] = [];
	const orders = await getOrdersDb();

	for (const order of orders) {
		const items = await getOrderItemsDb(order.id);
		ordersAndItems.push({ id: order.id, total_usd: order.total_usd, items });
	}

	return ordersAndItems;
};

export const insertOrderItemDb = async (
	order_id: number,
	coin_id: string,
	name: string,
	symbol: string,
	amount: number,
	price_usd: number,
	image: string
) => {
	const stmt = await db.prepareAsync(
		'INSERT INTO order_items (order_id, coin_id, name, symbol, amount, price_usd, image) VALUES (?, ?, ?, ?, ?, ?, ?);'
	);
	await stmt.executeAsync([order_id, coin_id, name, symbol, amount, price_usd, image]);
	await stmt.finalizeAsync();
};

export const getOrderItemsDb = async (order_id: number): Promise<OrderItem[]> => {
	return await db.getAllAsync('SELECT * FROM order_items WHERE order_id = ?;', [order_id]);
};
