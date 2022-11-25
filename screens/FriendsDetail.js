import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import styles from '../styles';

const FriendsDetail = (props) => {

    const { navigation, route } = props;
    const { friend } = route.params;

    return(
        <View style={styles.container}>
            <Text style={styles.header}>{friend.firstName} {friend.LastName}</Text>
            <TouchableOpacity style={styles.editButton} 
                onPress={
                ()=>{
                    console.log(friend);
                    navigation.navigate('FriendsAdd', {
                friend: friend
                });}}>
            <Text style={styles.editText}>Edit</Text>
            <Icon 
              style={styles.editText}
              name="pencil"
              type="font-awesome"
              color='grey'
              size={16}
            />
          </TouchableOpacity>
            <Text style={styles.detailText}>More Info to Come</Text>
        </View>
    );
}

export default FriendsDetail;