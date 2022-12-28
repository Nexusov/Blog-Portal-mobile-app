import { Linking, StyleSheet, Text, View, Image, TouchableWithoutFeedback  } from 'react-native';
import Loader from '../Loader/Loader';
import UserInfo from '../UserInfo/UserInfo';
import CustomImage from '../CustomImage/CustomImage';
import api from '../../apiClient';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/AuthContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Eye from '../../icons/Eye/Eye';

import styled from 'styled-components';

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

	const gotoFullPost = () => {
		navigation.navigate('FullPost', {
			id: _id,
		});
	};
   
	return (
		<TouchableWithoutFeedback onPress={gotoFullPost}>
		<PostWrapper style={styles.shadow}>
            {imageUrl && (
               <CustomImage source={{uri: imageUrl}}/>
            )}
				<PostDetails>
					<Title>{title}</Title>
               {/* <UserInfo {...creator} additionalText={new Date(createdAt)?.toLocaleDateString("ru")} /> */}
					
					<Text style={{ fontSize: 16}}>{isFullPost ? text : text.slice(0, 100)}</Text>
					{children && (
						<View>{children}</View>
					)}

               <View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                     <Eye />
				         <Text style={{ color: 'grey' }}> {viewsCount} </Text>
                  </View>
               <Tags style={{ color: '#0000EE' }}>{tags.map((name) => `#${name}`).join(' ')}</Tags>

                  {isFullPost && (
                  <TouchableOpacity onPress={gotoFullPost} activeOpacity={0.7}>
                     <Text>Подробнее</Text>
                  </TouchableOpacity>
                  )}
                  

                  {isEditable && isFullPost && (
                  <View>
                     <TouchableOpacity onPress={onClickRemove} activeOpacity={0.7}>
                        <Text style={{ color: 'red' }}>Удалить пост</Text>
                     </TouchableOpacity>
                  </View>
		            )}
				   </View>

				</PostDetails>

		</PostWrapper>
		</TouchableWithoutFeedback>
	);
};



export default Post;

const PostWrapper = styled.View`
   flex-direction: row;
   border-radius: 15px;
   margin-left: 5px;
   margin-right: 5px;
   margin-bottom: 3px;
   padding-bottom: 15px;
   padding-top: 20px
   background-color: white;
`

const PostDetails = styled.View`
   justify-content: center;
   flex: 1;
`

const Title = styled.Text`
   font-size: 25px;
   font-weight: 700;
   align-self: center;
   margin-top: -15px
`

const Tags = styled.Text`
   color: '#0000EE'
`

const styles = StyleSheet.create({
   shadow: {
      elevation: 15,
      shadowColor: '#171717',
   },
});