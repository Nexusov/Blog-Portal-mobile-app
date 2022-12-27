import { Text, View, Image } from 'react-native';
import UserInfo from '../../components/UserInfo/UserInfo';
import AuthContext from '../../contexts/AuthContext';

const Profile = () => {
	return (
		<AuthContext.Consumer>
			{({ user }) => (
				<View>
					<UserInfo {...user} fullSize={true} />
				</View>
			)}
		</AuthContext.Consumer>
	);
};

export default Profile;
