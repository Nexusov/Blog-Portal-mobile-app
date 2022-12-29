import React from 'react';
import {
	Linking,
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView
} from 'react-native';
import Loader from '../../components/Loader/Loader';
import api from '../../apiClient';

import styled from 'styled-components';

const AddPost = ({ navigation }) => {
	const [loading, setLoading] = React.useState(false);
	const [title, setTitle] = React.useState('');
	const [text, setText] = React.useState('');
	const [imageUrl, setImageUrl] = React.useState('');
	const [tags, setTags] = React.useState('');

	const publish = async () => {
		setLoading(true);

		const body = {
			title,
			text,
			imageUrl,
			tags: tags
				.split(',')
				.map((tag) => tag.trim())
				.join(','),
		};
		console.log(body);

		try {
			await api({
				url: '/posts',
				method: 'POST',
				data: body,
			});

			setTitle('');
			setImageUrl('');
			setText('');
			setTags('');

			navigation.navigate('Home');
		} catch (e) {
			console.error(e?.response?.data);
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView behavior="height">
			<Input
				placeholder='Заголовок'
				onChangeText={setTitle}
				value={title}
			/>
         
			<Input
				placeholder='Ссылка на картинку'
				onChangeText={setImageUrl}
				value={imageUrl}
			/>

			<LongInput
				placeholder='Текст статьи'
				onChangeText={setText}
				value={text}
				multiline
				numberOfLines={5}
			/>

			<Input
				placeholder='Теги (через запятую)'
				onChangeText={setTags}
				value={tags}
			/>

			<TouchableOpacity
				onPress={publish}
				style={s.buttonContainer}
				activeOpacity={0.7}
			>
				<Text style={s.buttonText}>Опубликовать</Text>
			</TouchableOpacity>
			{loading && <Loader />}
		</KeyboardAvoidingView>
	);
};

export default AddPost;


const Input = styled.TextInput`
   margin-bottom: 20px;
   height: 35px;
   font-size: 20px;
   border-bottom-width: 1px
   border-bottom-color: #cfcfc4
`;

const LongInput = styled(Input)`
   height: 150px;
   font-size: 20px;
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
