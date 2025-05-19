# 🦎 GeckoCart

GeckoCart is a React Native cryptocurrency shopping cart app inspired by the simplicity of e-commerce shopping experiences. It utilizes the [CoinGecko Public API](https://www.coingecko.com/en/api) to let users explore crypto data, simulate purchases, and track order history.

> ✅ Built with Expo • Redux • SQLite • TypeScript

## ✨ Features

### 📊 Browse Coins

- View top cryptocurrencies with current price, symbol, and 24hr price change
- Tap into a coin for details like circulating supply, total supply, ATH, ATL, and more
- Search coins by name or symbol
- View list of Trending coins

### 🛒 Shopping Cart

- Add coins with custom amounts (e.g., 0.05 BTC, 2 ETH)
- Edit quantity within cart
- See running USD total (pull down to refresh!)
- Persist cart state using SQLite (even after app close)
- Simulated checkout experience

### 🧾 Order History

- After checkout, see past orders
- Each order includes coin info, amounts, and total paid in USD

## ⚙️ Installation

### 1\. Clone the repo

```bash
git clone https://gitlab.com/thaqiif/react-native-engineer-shopping-cart.git
cd geckocart
```

### 2\. Install dependencies

```bash
npm install

```

### 3\. Start the app

```bash
npx expo start

```

## 📁 Project Structure

```javascript
/src
  ├── api                # All CoinGecko Public API
  ├── app                # App screens (Home, Details, Cart, Orders)
  ├── assets             # Icons, images, etc.
  ├── components         # Reusable UI components
  ├── constants          # Constants used across the codebase
  ├── entities           # Typescript model for CoinGecko API
  ├── hooks              # Custom hooks (styling)
  ├── services           # SQLite setup & helpers
  ├── store              # Redux slices and store config
  └── utils              # Utility functions

```

## 🧩 Dependencies

- **Expo SDK**
- **React Native**
- **TypeScript**
- **Redux Toolkit** for state management
- **expo-sqlite** for cart/order persistence
- **expo-router** for screen transitions
- **expo-status-bar** for status bar theme
- **expo-blur** for blurred background in StatusBar
- **react-native-gifted-charts** for displaying charts
- **Axios** for API calls
- **CoinGecko V3 API** for coin data

## 📂 Persistent Storage

Cart and order data is stored locally using `expo-sqlite`, utilizing the latest API with:

- `prepareAsync`
- `getAllAsync`
- `withTransactionAsync`

## 🔄 Reusable Components

All reusable components are grouped under the `components/` folder.

- **AnimatedScrollViewWithBlur** - Used in Discover, Search, Cart and History screen.
- **Card/** - Various cards to present quick-glance info of a coin (Discover, Search, Cart and History).
- **Background** - The most helpful of all. Used as a wrapper for consistent styling across TextInput, Checkbox, Button, and more.
- **Grid** - Used in Discover and Search to help compacting the UI for nice view.
- **... and many more.**

## Redux Slices

All redux slices synced with SQLite. That's why the data is persistent!

- `cartSlice` – manages items added to cart
- `historyOrderSlice` – stores order history

## 🔐 Notes

- Discover supports pagination. Scroll down for more!
- Cart state persists across sessions
- Cart shows percentage different since last added
- Clean UI tested on iPhone 16 Pro Max simulator

## 🏞️ App Preview

> Screenshots available in the `/screenshots/` folder for preview.

## 📱 Live Preview on Expo Go

Want to try GeckoCart yourself?

Scan this QR code with the **Expo Go** app 📲

[![Open in Expo Go](https://qr.expo.dev/eas-update?slug=exp&projectId=cb237b22-2904-47c6-8fde-04bdbca6363b&groupId=13f03d25-9861-425a-92f2-8032de1225aa&host=u.expo.dev)](https://qr.expo.dev/eas-update?slug=exp&projectId=cb237b22-2904-47c6-8fde-04bdbca6363b&groupId=13f03d25-9861-425a-92f2-8032de1225aa&host=u.expo.dev)

> Make sure you have [Expo Go](https://expo.dev/client) installed on your device.

## 🤝 Acknowledgements

Thanks to [CoinGecko](https://www.coingecko.com) for the awesome API 💛
