import { View, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';

const Loader = () => {
   return (
      <View style={[styles.container, styles.horizontal]}>
         <ActivityIndicator size="large" color="#4285f4" />
      </View>
   )
}

export default Loader;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      marginTop: 30,
   },
   horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
   }
});
