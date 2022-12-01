import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from '@rneui/themed';
import styles from '../styles';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'; 
import { useState } from 'react';

const GiftListDetail = (props) => {

    const friends = useSelector((state)=>state.friendItems);
    const gifts = useSelector((state)=>state.giftItems);

    const { navigation, route } = props;
    const { list } = route.params;

    [giftIdeaList, setGiftIdeaList] = useState([]);

    const inFriendList = (obj) => {
        console.log(obj.key);

        for (f of list.friendList){
          if (f === obj.key) {
            console.log(true, obj.giftIdeas);
            return true;
          }
        }
        console.log(false);
        return false;
      }

    const inGiftList = (obj) => {
        console.log(giftIdeaList)
        for (g of giftIdeaList){
          if (g === obj) {
            console.log(true);
            return true;
          }
        }
        console.log(false);
        return false;
    }

    return(
        <View style={styles.container}>
            <Text style={styles.emojiHeader}>{list.emoji}</Text>
            <Text style={styles.header}>{list.listName}</Text>
            <TouchableOpacity style={styles.editButton} 
                onPress={
                ()=>{
                navigation.navigate('GiftListAdd', {
                list: list
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
            <Text style={styles.detailText}>Due Date: {list.dueDate}</Text>
            <View>
            <FlatList
            data={friends}
            renderItem={({item})=>{
                return (
                    <View>
                        {inFriendList(item) ? 
                    <View>
                        <Text>{item.firstName} {item.lastName}</Text>
                        <TouchableOpacity onPress={() => setGiftIdeaList(item.giftIdeas)}>
                            <Feather name="gift" size={24} color="black" />
                        </TouchableOpacity>
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
                    : <View/> }
                    </View>
                );}}/>
            </View>
        </View>
    );
}

export default GiftListDetail;