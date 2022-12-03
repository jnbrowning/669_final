import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from '@rneui/themed';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux';

const FriendsDetail = (props) => {

    const gifts = useSelector((state)=>state.giftItems);

    const { navigation, route } = props;
    const { friend } = route.params;


    const inGiftList = (obj) => {
        for (g of friend.giftIdeas){
          if (g === obj) {
            return true;
          }
        }
        return false;
    }


    return(
        <View style={styles.container}>
            <Text style={styles.header}>{friend.firstName} {friend.lastName}</Text>
            <TouchableOpacity style={styles.editButton} 
                onPress={
                ()=>{
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
          <Text style={styles.detailText}>🎂 {friend.birthDate}</Text>
          <Text style={styles.detailText}>Interests: {friend.interests}</Text>
          <Text style={styles.detailText}>Gift Ideas: </Text>
          <FlatList 
                data={gifts}
                renderItem={({item})=>{
                    return (
                        <View>
                            {inGiftList(item.key) ?  
                            <View style={styles.dropDownPair}>
                            <Text 
                            style={styles.dropDownText}
                            >{item.giftName}</Text> 
                            </View>: <View/> }
                        </View>
                    );}}/>
        </View>
    );
}

export default FriendsDetail;