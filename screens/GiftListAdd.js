import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import styles from '../styles';
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { useState, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import EmojiSelector from 'react-native-emoji-selector';

const GiftListAdd = (props) => {

    const { navigation, route } = props;
    const { list } = route.params;

    const userID = useSelector((state)=>state.userID);
    const friends = useSelector((state)=>state.friendItems);
    const dispatch = useDispatch();

    [update, setUpdate] = useState(false);

    [emoji, setEmoji] = useState(list.emoji);
    [listName, setListName] = useState(list.listName);
    [dueDate, setDueDate] = useState(list.dueDate);
    [visible, setVisible] = useState(false);
    [emojiVisible, setEmojiVisible] = useState(false);
    [selectFriend, setSelectFriend] = useState('Select Friend');
    [viewFriends, setViewFriends] = useState(false);
    [friendList, setFriendList] = useState([]);

    const inFriendList = (obj) => {
        console.log(obj.key);

        for (f of friendList){
          if (f.key === obj.key) {
            console.log(true);
            return true;
          }
        }
        console.log(false);
        return false;
      }
  
      const removeFriend = (obj) => {
        const newFriends = friendList.filter(elem => elem.key!==obj.key);
        setFriendList(newFriends);
      };

      const checkFriendList = (obj) => {
        console.log(obj);
        if (inFriendList(obj)) {

          console.log('already in list');
         
        }
        else {
            const newFriendList = friendList.concat(obj);
            setFriendList(newFriendList);
            }
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
        if (list.key === -1) {
          setUpdate(false);
        }
        else {
          setUpdate(true);
        }
        const loadFriends = { type: actionTypes.LOAD_FRIEND, payload: {userid: userID} };
        saveAndDispatch(loadFriends, dispatch);
      }, []);

    const addGiftList = () => {
        const newGiftList = clearInputs();
        const addAction = { type: actionTypes.ADD_GIFT_LIST, payload: { newList: newGiftList, userid: userID }};
        navigation.navigate('GiftList');
        saveAndDispatch(addAction, dispatch);
    }

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
        console.log(dueDate);
        setVisible(false);
    }

    return(
        <View style={styles.container}>
            <View style={styles.headerButton}>
                <TouchableOpacity
                    onPress={()=>{navigation.navigate('GiftList');}}
                    >
                    <Text style={styles.headerButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                    if (!update) {
                        addGiftList();
                    } else {
                        updateGiftList();
                    }
                    }}
                ><Text style={styles.headerButtonText}>{update ? 'Update' : 'Save'}</Text></TouchableOpacity>
            </View>
            <Text style={styles.header}>{update ? 'Update Gift List' : 'Add Gift List'}</Text>
            <Text onPress={()=>{setEmojiVisible(true)}} style={styles.emojiHeader}>{emoji}</Text>
            {emojiVisible ? 
            <View>
                <TouchableOpacity
                    onPress={()=>{
                    setEmoji('X');
                    setEmojiVisible(false);
                }}
                ><Text>Cancel</Text></TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                    setEmojiVisible(false);
                }}
                ><Text>Confirm</Text></TouchableOpacity>
            <EmojiSelector onEmojiSelected={emoji => setEmoji(emoji)} style={styles.emojiBoard}/>
            </View>
            : <View/>} 
            <View style={styles.inputPair}>
                <Text style={styles.inputLabel}>List Name:</Text>
                <TextInput
                    style={styles.inputText}
                    value={listName}
                    onChangeText={(text)=>setListName(text)}/>
            </View>
            <View style={styles.inputPair}>
            <Text style={styles.inputLabel}>Due Date:</Text>
            <TouchableOpacity 
                onPress={()=>setVisible(true)}>
                    <Ionicons name="calendar-outline" size={24} color="red" style={styles.calendar}/>
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
                <Text style={styles.dropDownLabel}>Add Friends to List: </Text>
            </View>
            {viewFriends ? 
            <View style={styles.dropDown}>
                <Text style = {styles.cancelText} onPress={()=>setViewFriends(false)}>close</Text>
                <FlatList
                data={friends}
                renderItem={({item})=>{
                    return (
                        <View>
                            {inFriendList(item) ? <View/> : 
                            <View style={styles.dropDownPair}>
                                <TouchableOpacity 
                                    onPress={()=>{console.log('hi')}}>
                                    <Ionicons name="add" size={18} color="black" onPress={()=>{checkFriendList(item)}}/>
                                </TouchableOpacity> 
                                
                                <Text 
                                style={styles.dropDownText}
                                >{item.firstName} {item.lastName}</Text>
                            </View>
                }
                        </View>
                    );}}/>

                    </View>
            : <Text style={styles.dropDown} onPress={()=>{setViewFriends(true)}}>{selectFriend}</Text>}
        
        <View style={styles.inputPair}>
            <Text style={styles.dropDownLabel}>Friends on Gift List: </Text>
            <View>
            <FlatList
                data={friendList}
                renderItem={({item})=>{
                    return (
                        <View style={styles.dropDownPair}>
                            <TouchableOpacity 
                                onPress={()=>{removeFriend(item)}}>
                                <Ionicons name="md-trash-outline" size={18} color="black" />
                            </TouchableOpacity>
                            <Text 
                            onPress={()=>{selectFriend(item)}}
                            style={styles.dropDownText}
                            >{item.firstName} {item.lastName}</Text>
                        </View>
                    );}}/>

            </View>
        </View>
        
        </View>
    );
}

export default GiftListAdd;