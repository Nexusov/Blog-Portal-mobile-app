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
	KeyboardAvoidingView,
} from 'react-native';
import Loader from '../../components/Loader/Loader';
import api from '../../apiClient';

import styled from 'styled-components';

const EditPost = ({ navigation, route }) => {
	const { id } = route.params;

	const [loading, setLoading] = React.useState(true);
	const [title, setTitle] = React.useState('');
	const [text, setText] = React.useState('');
	const [imageUrl, setImageUrl] = React.useState('');
	const [tags, setTags] = React.useState('');

	React.useEffect(() => {
		const post = async () => {
         setLoading(true);

			try {
            const postResponse = await api({
               url: `/posts/${id}`,
               method: 'GET',
            });
   
            setTitle(postResponse.data.title);
            setText(postResponse.data.text);
            setImageUrl(postResponse.data.imageUrl);
            setTags(postResponse.data.tags.join(', '));
         } catch(e) {
            console.error(e);
         } finally {
            setLoading(false);
         }
		};

		post().catch(console.error);
	}, [id]);

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
				url: `/posts/${id}`,
				method: 'PATCH',
				data: body,
			});
			navigation.navigate("FullPost", {id});
		} catch (e) {
			console.error(e?.response?.data);
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView behavior='height'>
			{/* <Title>Создание статьи</Title> */}

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
				<Text style={s.buttonText}>Изменить</Text>
			</TouchableOpacity>
			{loading && <Loader />}
		</KeyboardAvoidingView>
	);
};

export default EditPost;

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
