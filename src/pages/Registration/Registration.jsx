import { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import api from '../../apiClient';
import Loader from '../../components/Loader/Loader';

import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import styled from 'styled-components';

/* const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles } = bootstrapStyleSheet;  */

const Registration = ( { onPress } ) => {
   const [fullName, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [avatarUrl, setAvatarUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png');
	const [isLoading, setIsLoading] = useState(false);

   const handleRegistration = async (e) => {
		setIsLoading(true);
		console.log(fullName);
		console.log(email);
		console.log(password);
		console.log(avatarUrl);
		try {
			const regResponse = await api.post('auth/register', {
            fullName,
				email,
				password,
            avatarUrl
			});
			console.log(regResponse);
			Alert.alert('Success', 'You are registered!');
		} catch (error) {
			console.error(error.response.data);
			Alert.alert('Error', "Couldn't create an account");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View>
			<View style={{ flexDirection: "row"}}>
            <View style={{ flexDirection: "column" }}>
               <Avatar source={{ uri: 'https://ionicframework.com/docs/icons/logo-react-icon.png'}} />
               <InputURL placeholder='Ссылка на картинку' onChangeText={(e) => setAvatarUrl(e)} />
            </View>
            <Title>Создание аккаунта</Title>
			</View>
			<Input placeholder='Имя' onChangeText={(e) => setName(e)} />
			<Input placeholder='E-Mail' onChangeText={(e) => setEmail(e)} />
			<Input placeholder='Пароль' onChangeText={(e) => setPassword(e)} />
         <TouchableOpacity onPress={handleRegistration} style={s.buttonContainer} activeOpacity={0.7}>
            <Text style={s.buttonText}>Зарегистрироваться</Text>
         </TouchableOpacity>
         {isLoading && <Loader />}
		</View>
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
`

const Input = styled.TextInput`
   margin-bottom: 20px;
   height: 35px;
   font-size: 20px;
   border-bottom-width: 1px
   border-bottom-color: #cfcfc4
`

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
      backgroundColor: "#4285f4",
      borderRadius: 15,
      paddingVertical: 20,
      paddingHorizontal: 20,
   },

   buttonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
   }
});

// export const Registration = () => {
//    return (
//    <PaperRoot>
//       <Title variant="h5">
//          Создание аккаунта
//       </Title>
//       <AvatarDiv>
//          <Avatar sx={{ width: 100, height: 100 }} />
//       </AvatarDiv>
//       <CustomField label="Полное имя" fullWidth />
//       <CustomField label="E-Mail" fullWidth />
//       <CustomField label="Пароль" fullWidth />
//       <Button size="large" variant="contained" fullWidth>
//          Зарегистрироваться
//       </Button>
//    </PaperRoot>
//    );
// };

export default Registration;

// const PaperRoot = styled.Paper`
//    width: 400px;
//    padding: 50px;
//    border: 1px solid #dedede;
//    margin: 50px auto;
// `;

// const CustomField = styled.TextField`
//    margin-bottom: 20px !important;
// `;

// const Title = styled.Typography`
//    text-align: center !important;
//    font-weight: bold !important;
//    margin-bottom: 30px !important;
// `;

