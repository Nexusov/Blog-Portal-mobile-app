import { Text, View, Image } from 'react-native';
import CustomImage from '../CustomImage/CustomImage';

import styled from 'styled-components';

const UserInfo = ({ avatarUrl, fullName, additionalText, fullSize }) => {
	return (
		<View style={{ padding: 5 }}>
			{fullSize ? (
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
				   <CustomImage source={{ uri: avatarUrl }}/>
               <Text style={{ fontSize: 17 }}>{fullName}</Text>
            </View>
			) : (
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
				   <SmallAvatar source={{ uri: avatarUrl }} />
               <Text style={{ fontSize: 17 }}>{fullName}</Text>
            </View>
			)}
		</View>
	);
};

export default UserInfo;


const SmallAvatar = styled(CustomImage)`
	width: 50px;
	height: 50px;
	margin-bottom: 0px;
`;