import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, Text, View, FlatList } from 'react-native';
import styled from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';

import Navigation from './src/components/Navigation/Navigation';
import AuthContext from './src/contexts/AuthContext';
import Login from './src/pages/Login/Login';
import Registration from './src/pages/Registration/Registration';
import { Home } from './src/pages/Home/Home';
import Loader from './src/components/Loader/Loader';
import api from "./src/apiClient";

const Drawer = createDrawerNavigator();

export default function App({ navigation }) {
	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
					};
				case 'SIGN_IN':
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
						isLoading: false,
					};
				case 'SIGN_OUT':
					return {
						...prevState,
						isSignout: true,
						userToken: null,
						isLoading: false,
					};
				case 'LOADING':
					return {
						...prevState,
						isLoading: true,
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
		}
	);

	React.useEffect(() => {
		const bootstrapAsync = async () => {
			let userToken;

			try {
				userToken = await SecureStore.getItemAsync('userToken');
			} catch (e) {}

			dispatch({ type: 'RESTORE_TOKEN', token: userToken });
		};

		bootstrapAsync();
	}, []);

	const authContext = React.useMemo(
		() => ({
			signIn: async ({ email, password }) => {
            console.log(email, password);
				dispatch({ type: 'LOADING' });
				try {
					const loginResponse = await api.post('auth/login', {
						email,
						password,
					});
					console.log(loginResponse);
					Alert.alert('Success', 'You are in!');
					dispatch({
						type: 'SIGN_IN',
						token: loginResponse.data.token,
					});
				} catch (error) {
					Alert.alert('Error', "Couldn't log in");
					console.error(error);
				}
			},
			signOut: () => dispatch({ type: 'SIGN_OUT' }),
			signUp: async ({ login, password }) => {
				// In a production app, we need to send user data to server and get a token
				// We will also need to handle errors if sign up failed
				// After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
				// In the example, we'll use a dummy token

				dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
			},
		}),
		[]
	);

	return (
		<AuthContext.Provider value={authContext}>
			{/* <FlatList data={items} renderItem={({ item }) => <Post title={item.title} imageUrl={item.imageUrl} createdAt={item.createdAt} /> } />  */}
			<NavigationContainer>
				<Drawer.Navigator>
					{state.isLoading ? (
						<Drawer.Screen
							name='Splash'
							component={Loader}
							options={{ title: 'Ща всё будет...' }}
						/>
					) : state.userToken !== null ? (
						<>
							<Drawer.Screen
								name='Home'
								component={Home}
								options={{ title: 'Главная' }}
							/>
							<Drawer.Screen
								name='CreateArticle'
								component={Registration}
								options={{ title: 'Добавить статью' }}
							/>
							<Drawer.Screen
								name='Logout'
								component={Login}
								options={{ title: 'Выйти' }}
							/>
						</>
					) : (
						<>
							<Drawer.Screen
								name='Login'
								component={Login}
								options={{ title: 'Войти' }}
							/>
							<Drawer.Screen
								name='Register'
								component={Registration}
								options={{ title: 'Регистрация' }}
							/>
						</>
					)}
				</Drawer.Navigator>
				<StatusBar style='auto' />
			</NavigationContainer>
		</AuthContext.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
