import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import styled from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Navigation from './src/components/Navigation/Navigation';

const Drawer = createDrawerNavigator();

export default function App() {
	return (
		<>
			{/* <FlatList data={items} renderItem={({ item }) => <Post title={item.title} imageUrl={item.imageUrl} createdAt={item.createdAt} /> } />  */}
			<NavigationContainer>
				<Navigation />
				<StatusBar style='auto' />
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
