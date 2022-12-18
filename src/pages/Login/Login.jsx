import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

import styled from "styled-components";

export default function Login( { onPress } ) {
   return (
		<View>
         <Title>Вход в аккаунт</Title>
			<Input placeholder='E-Mail' />
			<Input placeholder='Пароль' />
         <TouchableOpacity onPress={onPress} style={s.buttonContainer} activeOpacity={0.7}>
            <Text style={s.buttonText}>Войти</Text>
         </TouchableOpacity>
		</View>
   )
}


const Input = styled.TextInput`
   margin-bottom: 20px;
   height: 50px;
   font-size: 20px;
   border-bottom-width: 1px
   border-bottom-color: #cfcfc4
`

const Title = styled.Text`
   font-size: 20px;
   font-weight: bold
   margin: auto;
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