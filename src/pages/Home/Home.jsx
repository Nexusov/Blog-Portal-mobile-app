import {
	View,
	Text,
	TextInput,
	Button,
	Image,
	StyleSheet,
	TouchableOpacity,
	Alert,
	FlatList,
} from 'react-native';
import { useState, useEffect } from 'react';
import api from '../../apiClient';
import Post from '../../components/Post/Post';
import AuthContext from '../../contexts/AuthContext';


export const Home = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	const fetchPosts = async () => {
		setIsLoading(true);

		try {
			const postsResponse = await api.get('/posts');
			setPosts(postsResponse.data);
			console.log(postsResponse.data);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const initialize = async () => {
			await fetchPosts();
		};

		initialize().catch(console.error);
	}, []);

	return (
		<AuthContext.Consumer>
			{({ user }) => (
				<FlatList
					data={posts}
					renderItem={({ item: post }) => (
						<Post
							{...post}
							key={post._id}
							isEditable={user._id === post.user._id}
						/>
					)}
					onRefresh={fetchPosts}
					refreshing={isLoading}
				/>
			)}
		</AuthContext.Consumer>
	);
};
