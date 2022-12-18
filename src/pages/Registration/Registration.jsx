import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';


const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles } = bootstrapStyleSheet; 

const Registration = ( { onPress } ) => {
   console.log(styles)
	return (
		<View>
         <Title>Создание аккаунта</Title>
			<View>
            <Avatar source={{ uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
			</View>
			<Input placeholder='Имя' />
			<Input placeholder='E-Mail' />
			<Input placeholder='Пароль' />
         <TouchableOpacity onPress={onPress} style={s.buttonContainer} activeOpacity={0.7}>
            <Text style={s.buttonText}>Зарегистрироваться</Text>
         </TouchableOpacity>
		</View>
	);
};

const Input = styled.TextInput`
   margin-bottom: 20px;
   height: 50px;
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

