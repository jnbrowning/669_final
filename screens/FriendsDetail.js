import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../styles';
import { useSelector } from 'react-redux';
import { FontAwesome5, Ionicons, FontAwesome } from '@expo/vector-icons';
import BackButton from '../components/BackButton';

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

    const viewGift = async (item) => {
        await navigation.navigate('GiftTab');
        navigation.navigate('GiftDetail', {gift: item})
    }

    return(
        <View style={styles.container}>
            <View style={styles.friendDetailHeaderContainer}>
                <BackButton navigation={navigation}/>
                <Text style={styles.friendDetailHeader}>{friend.firstName} {friend.lastName}</Text>
                <Text style={styles.friendDetailText}>🎂 {friend.birthDate}</Text>
                <TouchableOpacity style={styles.editButton} 
                    onPress={()=>{navigation.navigate('FriendsAdd', {friend: friend});}}>
                    <Text style={styles.editText}>Edit</Text>
                    <FontAwesome name="pencil" size={18} color="grey" />
                </TouchableOpacity>
            </View>
            <Text style={styles.detailLabel}><FontAwesome name="heart-o" size={18} color="black" />  Interests:</Text>
            <Text style={styles.detailInfo}>{friend.interests}</Text>
            <Text style={styles.detailLabel}><Ionicons name="gift-outline" size={18} color="black" />  Gift Ideas:</Text>
            <View style={styles.detailInfo}>
                <FlatList 
                data={gifts}
                renderItem={({item})=>{
                    return (
                        <View>
                            {inGiftList(item.key) ?  
                            <TouchableOpacity 
                            style={styles.giftIdeaItem}
                            onPress={()=>{viewGift(item)}}>
                                <Text style={styles.giftIdeaText}><FontAwesome5 name="gifts" size={16} color="#EA047E" />  {item.giftName}</Text> 
                            </TouchableOpacity>
                            : 
                            <View/> }
                        </View>
                    );}}
                />
            </View>
        </View>
    );
}

export default FriendsDetail;