import React from 'react';
import {
	Linking,
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	ScrollView,
   StatusBar,
   SafeAreaView
} from 'react-native';

import api from '../../apiClient';
import Post from '../../components/Post/Post';
import AuthContext from '../../contexts/AuthContext';
import Loader from '../../components/Loader/Loader';
import CustomImage from '../../components/CustomImage/CustomImage';
import UserInfo from '../../components/UserInfo/UserInfo';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Eye from '../../icons/Eye/Eye';
import styled from 'styled-components';

const FullPost = ({ route, navigation }) => {
	const { id } = route.params;

	const { user } = React.useContext(AuthContext);
	const [loading, setLoading] = React.useState(true);
	const [post, setPost] = React.useState({
		_id: null,
		title: null,
		createdAt: null,
		imageUrl: null,
		user: null,
		viewsCount: null,
		commentsCount: null,
		tags: null,
		text: null,
	});

	React.useEffect(() => {
		if (!id) {
			navigation.navigate('Home');
			return;
		}

		const initialize = async () => {
			setLoading(true);
			try {
				const post = await api.get(`/posts/${id}`);
				setPost(post.data);
				navigation.setOptions({
					title: post.data.title,
				});
			} catch (e) {
				console.error(e);
				navigation.navigate('Home');
			} finally {
				setLoading(false);
			}
		};

		initialize().catch(console.error);
	}, [id]);

	if (loading) {
		return <Loader />;
	}

	const isEditable = post.user._id === user._id;
	const {
		_id,
		title,
		createdAt,
		imageUrl,
		user: creator,
		viewsCount,
		commentsCount,
		tags,
		text,
	} = post;

	const onClickRemove = async () => {
		await api.delete(`/posts/${_id}`);
		navigation.navigate('Home');
	};

	const onClickEdit = () => {
		navigation.navigate('EditPost', { id });
	};

	return (
				<View style={{ backgroundColor: 'white', padding: 5, borderRadius: 20, elevation: 5, shadowColor: '#171717', margin: 5 }}>
				{imageUrl && (
					<Banner
						source={{ uri: imageUrl }}
						style={{ resizeMode: 'stretch' }}
					/>
				)}
				<Title>{title}</Title>
				<UserInfo
					{...creator}
					additionalText={new Date(createdAt)?.toLocaleDateString(
						'ru'
					)}
				/>
				<Tags style={{ color: '#0000EE' }}>
					{tags.map((name) => `#${name}`).join(' ')}
				</Tags>

				<Text style={{ fontSize: 18, lineHeight: 24, marginBottom: 5 }}>
					{text}
				</Text>

				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Eye />
					<Text style={{ color: 'grey' }}> {viewsCount} </Text>
				</View>

				{isEditable && (
					<View>
						<TouchableOpacity
							onPress={onClickRemove}
							activeOpacity={0.7}
							style={s.deleteButton}
						>
							<Text style={s.buttonText}>Удалить пост</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={onClickEdit}
							activeOpacity={0.7}
							style={s.editButton}
						>
							<Text style={s.buttonText}>Изменить пост</Text>
						</TouchableOpacity>
					</View>
				)}
				</View>
	);
};

export default FullPost;

const Title = styled.Text`
	font-size: 25px;
	font-weight: 700;
	align-self: center;
`;

const Tags = styled.Text`
	color: '#0000EE';
	margin-bottom: 10px;
	font-size: 14px;
`;

const Banner = styled.Image`
	widht: 100%;
	height: 25%;
	border-radius: 20px;
	margin-bottom: 10px;
`;

const s = StyleSheet.create({
	deleteButton: {
		elevation: 5,
		backgroundColor: '#ff4d4d',
		borderRadius: 15,
		paddingVertical: 15,
		paddingHorizontal: 15,
		marginTop: 20,
	},

	editButton: {
		elevation: 5,
		backgroundColor: '#4285f4',
		borderRadius: 15,
		paddingVertical: 15,
		paddingHorizontal: 15,
		marginTop: 20,
	},

	buttonText: {
		fontSize: 17,
		color: 'white',
		fontWeight: 'bold',
		alignSelf: 'center',
		textTransform: 'uppercase',
	},
});
