import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Text, View, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';

import AuthContext from './src/contexts/AuthContext';
import Login from './src/pages/Login/Login';
import Registration from './src/pages/Registration/Registration';
import { Home } from './src/pages/Home/Home';
import Loader from './src/components/Loader/Loader';
import api from './src/apiClient';
import Profile from './src/pages/Profile/Profile';
import FullPost from './src/pages/FullPost/FullPost';
import AddPost from './src/pages/AddPost/AddPost';
import EditPost from './src/pages/EditPost/EditPost';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
	return (
		<AuthContext.Consumer>
			{({ signOut, isAuth }) => (
				<DrawerContentScrollView {...props}>
					<DrawerItemList {...props} />
					{isAuth && (
						<DrawerItem
							label={() => <Text style={{ color: 'red' }}>Выйти</Text>}
							onPress={() => signOut().catch(console.error)}
						/>
					)}
				</DrawerContentScrollView>
			)}
		</AuthContext.Consumer>
	);
};

export default function App() {
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

	const [user, setUser] = React.useState({});

	React.useEffect(() => {
		const saveToken = async () => {
			let userToken = null;

			try {
				userToken = await SecureStore.getItemAsync('userToken');
				api.defaults.headers.common['authorization'] = `Bearer ${userToken}`;
			} catch (e) {}

			if (userToken !== null) {
				try {
					const userInfo = await api({
						method: 'GET',
						url: '/auth/me',
					});

					setUser(userInfo);
				} catch (e) {
					console.error(e.request);
					await SecureStore.deleteItemAsync('userToken');
					userToken = null;
				}
			}

			dispatch({ type: 'RESTORE_TOKEN', token: userToken });
		};

		saveToken().catch(console.error);
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
					console.log(loginResponse.data);

					const { token, ...user } = loginResponse.data;

					api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

					setUser(user);
					await SecureStore.setItemAsync('userToken', token);

					Alert.alert('Success', 'You are in!');

					dispatch({
						type: 'SIGN_IN',
						token,
					});
				} catch (error) {
					api.defaults.headers.common['Authorization'] = null;

					Alert.alert('Error', "Couldn't log in");

					console.error(error);

					dispatch({ type: 'SIGN_OUT' });
				}
			},

			signOut: async () => {
				api.defaults.headers.common['Authorization'] = null;

				await SecureStore.deleteItemAsync('userToken');

				dispatch({ type: 'SIGN_OUT' });
			},

			signUp: async ({ fullName, email, password, avatarUrl }) => {
				dispatch({ type: 'LOADING' });
				console.log(fullName, email, password, avatarUrl);

				try {
					const regResponse = await api.post('auth/register', {
						fullName,
						email,
						password,
						avatarUrl,
					});
					console.log(regResponse.data);

					const { token, ...user } = regResponse.data;

					api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

					setUser(user);
					await SecureStore.setItemAsync('userToken', token);

					Alert.alert('Success', 'You are registered!');

					dispatch({
						type: 'SIGN_IN',
						token,
					});
				} catch (error) {
					api.defaults.headers.common['Authorization'] = null;

					console.error(error.response.data);

					Alert.alert('Error', "Couldn't create an account");

					dispatch({ type: 'SIGN_OUT' });
				}
			},
		}), []
	);

	return (
		<AuthContext.Provider value={{ ...authContext, isAuth: state.userToken !== null, user }} >
			<NavigationContainer>
				<Drawer.Navigator
					isAuth={state.userTOken !== null}
					drawerContent={(props) => (
						<CustomDrawerContent {...props} />
					)}
				>
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
								component={AddPost}
								options={{ title: 'Написать статью' }}
							/>
							<Drawer.Screen
								name='Profile'
								component={Profile}
								options={{ title: 'Профиль' }}
							/>
							<Drawer.Screen
								name='FullPost'
								getComponent={() => FullPost}
								options={{
									title: 'Пост',
									drawerItemStyle: {height: 0},
								}}
								getId={({ params }) => params.id}
							/>
							<Drawer.Screen
								name='EditPost'
								getComponent={() => EditPost}
								options={{
									title: 'Изменить пост',
									drawerItemStyle: { height: 0 },
								}}
								getId={({ params }) => params.id}
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
