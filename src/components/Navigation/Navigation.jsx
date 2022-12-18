import { Linking, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { TouchableOpacity } from 'react-native-gesture-handler';

import Login from '../../pages/Login/Login';
import Registration from '../../pages/Registration/Registration';


const Drawer = createDrawerNavigator();

const Navigation = ({ navigation }) => {
	const isAuth = false;

	const onClickLogout = () => {};

	return (
		/* <Drawer.Navigator> */
			/* <Drawer.Screen name='Регистрация' component={Registration} /> */
			<>
				{isAuth ? <AuthorizedMenu /> : <UnauthorizedMenu />} 
			</>

			/* <View style={styles.root}>
				<View>
					<View style={styles.buttons}>
						{isAuth ? (
							<>
								<TouchableOpacity>
									<Text
										style={styles.link}
										onpress={() =>
											Linking.openURL('/posts/create')
										}
									>
										Написать статью
									</Text>
								</TouchableOpacity>
								<TouchableOpacity>
									<Text
										style={styles.error}
										onpress={onClickLogout}
									>
										Выйти
									</Text>
								</TouchableOpacity>
							</>
						) : (
							<>
								<TouchableOpacity>
									<Text style={styles.link} onpress={() => Linking.openURL('/login')} >
									<Text
										style={styles.link}
										onpress={() =>
											navigation.navigate('Login', {
												name: 'Login',
											})
										}
									>
										Войти
									</Text>
								</TouchableOpacity>
								<TouchableOpacity>
									<Text
										style={styles.error}
										onpress={() =>
											Linking.openURL('/register')
										}
									>
										Создать аккаунт
									</Text>
								</TouchableOpacity>
							</>
						)}
					</View>
				</View>
			</View> */
		/* </Drawer.Navigator> */
	);
};

const UnauthorizedMenu = () => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name='Войти' component={Login} /> 
			<Drawer.Screen name='Регистрация' component={Registration} />
		</Drawer.Navigator>
	);
};

const AuthorizedMenu = () => {
   return (
		<Drawer.Navigator>
			<Drawer.Screen name='Написать статью' component={Registration} />
			<Drawer.Screen name='Выйти' component={Login} /> 
		</Drawer.Navigator>
	);
}

const styles = StyleSheet.create({
	buttons: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	root: {
		backgroundColor: 'white',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
		marginBottom: 30,
	},
	link: {
		color: 'blue',
	},
	error: {
		color: 'red',
	},
});

export default Navigation;
