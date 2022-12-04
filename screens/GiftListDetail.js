import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux'; 
import { useEffect } from 'react';
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch, subscribeToFriends } from '../data/DB';
import BackButton from '../components/BackButton';
import GiftListFriends from '../components/GiftListFriends';

const GiftListDetail = (props) => {

  const userID = useSelector((state)=>state.userID);

  const { navigation, route } = props;
  const { list } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    //load list of friends and gifts
    const loadFriendGifts = { type: actionTypes.LOAD_FRIEND_GIFT_LIST, payload: {userid: userID, listid: list.key}}
    saveAndDispatch(loadFriendGifts, dispatch);
    //subscribe to updates on friend gifts to see live updates
    subscribeToFriends(userID, list.key);
    console.log(list);
  }, []);

  return(
    <View style={styles.container}>
      <View style={styles.detailHeaderContainer}>
        <BackButton navigation={navigation}/>
        <Text style={styles.emojiHeader}>{list.emoji}</Text>
        <Text style={styles.detailHeader}>{list.listName}</Text>
        <Text style={styles.detailText}>Due Date: {list.dueDate}</Text>
        <TouchableOpacity style={styles.editButton} 
        onPress={()=>{navigation.navigate('GiftListAdd', {list: list});}}>
          <Text style={styles.editText}>Edit</Text>
          <FontAwesome name="pencil" size={18} color="grey" />
      </TouchableOpacity>
      </View>
      <GiftListFriends list={list} />
    </View>
  );
}

export default GiftListDetail;