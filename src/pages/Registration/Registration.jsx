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

const Registration = ({ onPress }) => {
	const [fullName, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [avatarUrl, setAvatarUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png');
	const [isLoading, setIsLoading] = useState(false);

	return (
		<AuthContext.Consumer>
			{({ signUp }) => (
				<View>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flexDirection: 'column' }}>
							<Avatar source={{ uri: 'https://ionicframework.com/docs/icons/logo-react-icon.png' }}/>
							<InputURL placeholder='Ссылка на картинку' onChangeText={setAvatarUrl} />
						</View>
						<Title>Создание аккаунта</Title>
					</View>

					<Input placeholder='Имя' onChangeText={setName} />
					<Input placeholder='E-Mail' onChangeText={setEmail} />
					<Input placeholder='Пароль' onChangeText={setPassword} secureTextEntry />

					<TouchableOpacity
						onPress={() =>
							signUp({ fullName, email, password, avatarUrl })
						}
						style={s.buttonContainer}
						activeOpacity={0.7}
					>
						<Text style={s.buttonText}>Зарегистрироваться</Text>
					</TouchableOpacity>

					{isLoading && <Loader />}
				</View>
			)}
		</AuthContext.Consumer>
	);
};

const InputURL = styled.TextInput`
   margin-top: -30px;
   width: 125px
   margin-bottom: 20px;
   height: 30px;
   font-size: 13px;
   border-bottom-width: 1px
   border-bottom-color: #cfcfc4
`;

const Input = styled.TextInput`
   margin-bottom: 20px;
   height: 35px;
   font-size: 20px;
   border-bottom-width: 1px
   border-bottom-color: #cfcfc4
`;

const Avatar = styled.Image`
   display: flex;
   justify-content: center;
   margin-bottom: 30px;
   width: 100px;
   height: 100px
   border-radius: 30px
`;

const Title = styled.Text`
   font-size: 20px;
   font-weight: bold
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

export default Registration;