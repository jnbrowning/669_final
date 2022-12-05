import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import styles from '../styles';
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch, subscribeToFriends } from '../data/DB';
import { useState, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import EmojiSelector from 'react-native-emoji-selector';
import BackButton from '../components/BackButton';

const GiftListAdd = (props) => {

    const { navigation, route } = props;
    const { list } = route.params;

    const userID = useSelector((state)=>state.userID);
    const friends = useSelector((state)=>state.friendItems);
    const friendGifts = useSelector((state)=>state.friendGifts);
    const dispatch = useDispatch();

    [emoji, setEmoji] = useState(list.emoji);
    [listName, setListName] = useState(list.listName);
    [dueDate, setDueDate] = useState(list.dueDate);
    [visible, setVisible] = useState(false);
    [emojiVisible, setEmojiVisible] = useState(false);
    [selectFriend, setSelectFriend] = useState('Select Friend');
    [viewFriends, setViewFriends] = useState(false);

    const inFriendList = (obj) => {
        for (f of friendGifts){
          if (f.key === obj.key) {
            return true;
          }
        }
        return false;
      }

    const clearInputs = () => {
        const newList = {
            listName: listName,
            dueDate: dueDate,
            emoji: emoji,
        }
        setListName('');
        setDueDate('');
        setEmoji('X');
        return newList;
    }

    useEffect(() => {
        const loadFriends = { type: actionTypes.LOAD_FRIEND, payload: {userid: userID} };
        saveAndDispatch(loadFriends, dispatch);
        const loadFriendGifts = { type: actionTypes.LOAD_FRIEND_GIFT_LIST, payload: {userid: userID, listid: list.key}}
        saveAndDispatch(loadFriendGifts, dispatch);
        subscribeToFriends(userID, list.key);
      }, []);

    const addFriendGiftList = (friend) => {
        let newFriendGift = {
            firstName: friend.firstName, 
            lastName: friend.lastName, 
            gifts: []
        }
        const addAction = { type: actionTypes.ADD_FRIEND_GIFT_LIST, payload: { newFriendGifts: newFriendGift, key: friend.key, userid: userID, listid: list.key }};
        saveAndDispatch(addAction, dispatch);
    }

    const deleteFriendGiftList = (item) => {
        action = {
            type: actionTypes.DELETE_FRIEND_GIFT_LIST, 
            payload: {
                key: item.key,
                userid: userID,
                listid: list.key,
            }
        }
        saveAndDispatch(action, dispatch);
    };

    const updateGiftList = () => {
        const newGiftList = clearInputs();
        const updateAction = { type: actionTypes.UPDATE_GIFT_LIST, payload: { key: list.key, newList: newGiftList, userid: userID }}
        navigation.navigate('GiftList');
        saveAndDispatch(updateAction, dispatch);
    }

    const updateDate = (date) => {
        let newDate = date.toLocaleDateString('en-us', { 
                month:"numeric", 
                day:"numeric", 
                year: "numeric",
                })
        setDueDate(newDate); 
        setVisible(false);
    }

    return(
        <View style={styles.container}>
            <View style={styles.detailHeaderContainer}>
                <BackButton navigation={navigation}/>
            </View>
            <Text onPress={()=>{setEmojiVisible(true)}} style={styles.emojiHeader}>{emoji}</Text>
            {emojiVisible ? 
            <View style={styles.emojiMenu}>
                <View style={styles.emojiPair}>
                <TouchableOpacity
                    onPress={()=>{
                    setEmojiVisible(false);
                }}
                style={styles.emojiButton}
                ><Ionicons name="close-outline" size={40} color="red" /></TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                    setEmojiVisible(false);
                }}
                style={styles.emojiButton}
                ><Ionicons name="checkmark" size={40} color='green' /></TouchableOpacity>
                </View>
                <EmojiSelector onEmojiSelected={emoji => setEmoji(emoji)} style={styles.emojiBoard}/>
            </View>
            : <View/>
            } 
            <View style={styles.inputPair}>
                <Text style={styles.inputLabel}>List Name:</Text>
                <TextInput
                    style={styles.headInputText}
                    value={listName}
                    onChangeText={(text)=>setListName(text)}/>
            </View>
            <View style={styles.inputPair}>
                <Text style={styles.inputLabel}>Due Date:</Text>
                <TouchableOpacity 
                    onPress={()=>setVisible(true)}>
                        <Ionicons name="calendar-outline" size={20} color="#EA047E" style={styles.calendar}/>
                    </TouchableOpacity>
                    <Text style={styles.calendarText}>{dueDate}</Text>      
            </View>
            <DateTimePickerModal
                isVisible={visible}
                mode="date"
                onConfirm={updateDate}
                onCancel={()=>{setVisible(false)}}
            />    
            <View style={styles.inputPair}>
                <Text style={styles.wideInputLabel}>Friends on Gift List: </Text>
                <TouchableOpacity 
                onPress={()=>{setViewFriends(true)}}
                style={styles.addFriendIcon}>
                    <FontAwesome5 name="user-plus" size={16} color="#EA047E" />
                </TouchableOpacity>
            </View>
            {viewFriends ? 
            <View style={styles.dropDown}>
                <Text style = {styles.cancelText} onPress={()=>setViewFriends(false)}>
                    <Ionicons name="md-close-outline" size={20} color="black" />
                </Text>
                <FlatList
                data={friends}
                renderItem={({item})=>{
                    return (
                        <View>
                            {inFriendList(item) ? <View/> : 
                            <View style={styles.inputPair}>
                                <TouchableOpacity>
                                    <Ionicons name="add" size={20} color="black" onPress={()=>{addFriendGiftList(item)}}/>
                                </TouchableOpacity> 
                                
                                <Text 
                                style={styles.dropDownText}
                                >{item.firstName} {item.lastName}</Text>
                            </View>
                }
                        </View>
                    );}}/>

                    </View>
            : <View/>}

            <View style={styles.friendList}>
                <FlatList 
                data={friends}
                renderItem={({item})=>{
                    return (
                        <View>
                        {inFriendList(item) ? 
                        <View style={styles.inputPair}>
                            <TouchableOpacity 
                                onPress={()=>{deleteFriendGiftList(item)}}>
                                <Ionicons style={styles.cancelIcon} name="md-close-outline" size={20} color="black" />
                            </TouchableOpacity>
                            <Text 
                            style={styles.friendListText}
                            >{item.firstName} {item.lastName}</Text>
                        </View> : <View/>}
                        </View>
                    );}}/>
            </View>  

        
        <TouchableOpacity
                    onPress={updateGiftList}
                    style={styles.confirmButton}
                ><Text style={styles.confirmText}>{'Confirm'}</Text></TouchableOpacity>
        </View>
    );
}

export default GiftListAdd;