import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from '@/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		RethinkSansBold: require('../assets/fonts/RethinkSans-Bold.ttf'),
		RethinkSansMedium: require('../assets/fonts/RethinkSans-Medium.ttf'),
		RethinkSansRegular: require('../assets/fonts/RethinkSans-Regular.ttf'),
		RethinkSansSemiBold: require('../assets/fonts/RethinkSans-SemiBold.ttf'),
		RethinkSansExtraBold: require('../assets/fonts/RethinkSans-ExtraBold.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<ThemeProvider
			value={{
				...DarkTheme,
				colors: {
					...DarkTheme.colors,
					border: 'transparent',
				},
			}}>
			<Provider store={store}>
				<StatusBar
					style={'light'}
					translucent={true}
				/>
				<Stack
					screenOptions={{
						headerShown: false,
					}}>
					<Stack.Screen name="(tabs)" />
					<Stack.Screen
						name="modal"
						options={{ presentation: 'modal' }}
					/>
				</Stack>
			</Provider>
		</ThemeProvider>
	);
}
