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
import { useState, useEffect } from 'react';
import api from '../../apiClient';
import Post from '../../components/Post/Post';
import Loader from '../../components/Loader/Loader';
import AuthContext from '../../contexts/AuthContext';

export const Home = () => {
	const [isLoading, setIsLoading] = useState([]);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const initialize = async () => {
			setIsLoading(true);

			try {
				const postsResponse = await api.get('/posts');
				setPosts(postsResponse.data);
            console.log(postsResponse.data);
			} finally {
				setIsLoading(false);
			}
		};

		initialize().catch(console.error);
	}, []);

	return (
		<AuthContext.Consumer>
			{({ user }) => (
				<View>
					{isLoading ? (
						<Loader />
					) : (
						posts.map((post) => (
							<Post
								{...post}
								key={post._id}
								isEditable={user._id === post.user._id}
							/>
						))
					)}
				</View>
			)}
		</AuthContext.Consumer>
	);
};
