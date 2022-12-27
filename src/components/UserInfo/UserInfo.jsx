import { Text, View, Image } from 'react-native';
import CustomImage from '../CustomImage/CustomImage';
import styled from 'styled-components';

const SmallAvatar = styled(CustomImage)`
	width: 50px;
	height: 50px;
	margin-bottom: 0px;
`;

const UserInfo = ({ avatarUrl, fullName, additionalText, fullSize }) => {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
			{fullSize ? (
				<CustomImage source={{ uri: avatarUrl }}/>
			) : (
				<SmallAvatar source={{ uri: avatarUrl, }} />
			)}

			<View>
				<Text style={{ fontSize: 17 }}>{fullName}</Text>
				{additionalText && <Text style={{ color: 'grey' }}>{additionalText}</Text>}
			</View>
		</View>
	);
};

export default UserInfo;
