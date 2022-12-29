import { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Button,
	Image,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from 'react-native';
import Loader from '../../components/Loader/Loader';
import AuthContext from '../../contexts/AuthContext';


import styled from 'styled-components';

export default function Login({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	return (
		<AuthContext.Consumer>
			{({ signIn }) => (
				<View>
					<Title>Вход в аккаунт</Title>
					<Input placeholder='E-Mail' onChangeText={setEmail} />
					<Input placeholder='Пароль' onChangeText={setPassword} secureTextEntry />

					<TouchableOpacity
						onPress={() => signIn({ email, password })}
						style={s.buttonContainer}
						activeOpacity={0.7}
					>
						<Text style={s.buttonText}>Войти</Text>
					</TouchableOpacity>

					{isLoading && <Loader />}
				</View>
			)}
		</AuthContext.Consumer>
	);
}

const Input = styled.TextInput`
   margin-bottom: 20px;
   height: 50px;
   font-size: 20px;
   border-bottom-width: 1px
   border-bottom-color: #cfcfc4
`;

const Title = styled.Text`
   font-size: 20px;
   font-weight: bold
   margin: auto;
   margin-top: 10px
`;

const s = StyleSheet.create({
	buttonContainer: {
		elevation: 8,
		backgroundColor: '#4285f4',
		borderRadius: 15,
		paddingVertical: 20,
		paddingHorizontal: 20,
	},

	buttonText: {
		fontSize: 18,
		color: '#fff',
		fontWeight: 'bold',
		alignSelf: 'center',
		textTransform: 'uppercase',
	},
});
