import { Linking, StyleSheet, Text, View, Image } from 'react-native';
import Loader from '../Loader/Loader';
import UserInfo from '../UserInfo/UserInfo';
import api from '../../apiClient';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/AuthContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Post = ({
	_id,
	title,
	createdAt,
	imageUrl,
	user: creator,
	viewsCount,
	commentsCount,
	tags,
   text,
	children,
	isFullPost,
	isEditable,
	isLoading,
}) => {
	const navigation = useNavigation();
	if (isLoading) {
		return <Loader />;
	}

	const onClickRemove = async () => {
		await api.delete(`/posts/${_id}`);
		navigation.navigate('Home');
	}; 
	return (
		<View>
			{isEditable && isFullPost && (
				<View>
					<TouchableOpacity
						onPress={onClickRemove}
						style={s.buttonContainer}
						activeOpacity={0.7}
					>
						<Text style={s.buttonText}>Удалить пост</Text>
					</TouchableOpacity>
				</View>
			)}

			{imageUrl && (
				<Image
					source={{
						uri: imageUrl,
					}}
				/>
			)}

			<View /* className={styles.wrapper} */>
				<UserInfo {...creator} additionalText={createdAt} />
				<View /* className={styles.indention} */>
					<Text>{title}</Text>
					<Text /* className={styles.tags} */>
						{tags.map((name) => `#${name}`).join(' ')}
					</Text>
               <Text>{text}</Text>
					{children && (
						<View /* className={styles.content} */>{children}</View>
					)}
					<View /* className={styles.postDetails} */>
						<Text /* className={styles.tags} */>
							Просмотры: {viewsCount}
						</Text>
						<Text /* className={styles.tags} */>
							Комментарии: {commentsCount}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};
// const Post = ({
// 	_id,
// 	title,
// 	createdAt,
// 	imageUrl,
// 	user: creator,
// 	viewsCount,
// 	commentsCount,
// 	tags,
// 	children,
// 	isFullPost,
// 	isEditable,
// 	isLoading,
// }) => {
// 	// const navigation = useNavigation();

// 	if (isLoading) {
// 		return <Loader />;
// 	}

// 	const onClickRemove = async () => {
// 		await api.delete(`/posts/${_id}`);
// 		navigation.navigate('Home');
// 	};

// 	return (
// 		<View>
// 			{isEditable && isFullPost && (
// 				<View>
// 					<TouchableOpacity
// 						onPress={onClickRemove}
// 						style={s.buttonContainer}
// 						activeOpacity={0.7}
// 					>
// 						<Text style={s.buttonText}>Удалить пост</Text>
// 					</TouchableOpacity>
// 				</View>
// 			)}

// 			{imageUrl && (
// 				<Image
// 					source={{
// 						uri: imageUrl,
// 					}}
// 				/>
// 			)}

// 			<View /* className={styles.wrapper} */>
// 				<UserInfo {...creator} additionalText={createdAt} />
// 				<View /* className={styles.indention} */>
// 					<Text>{title}</Text>

// 					<Text /* className={styles.tags} */>
// 						{tags.map((name) => `#${name}`).join(' ')}
// 					</Text>

// 					{children && (
// 						<View /* className={styles.content} */>{children}</View>
// 					)}

// 					<View /* className={styles.postDetails} */>
// 						<Text /* className={styles.tags} */>
// 							Просмотры: {viewsCount}
// 						</Text>

// 						<Text /* className={styles.tags} */>
// 							Количество комментариев: {commentsCount}
// 						</Text>
// 					</View>
// 				</View>
// 			</View>
// 		</View>
// 	);
// };

export default Post;
