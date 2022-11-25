import { View, Text, TouchableOpacity, TextInput } from 'react-native';
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
    const dispatch = useDispatch();

    [update, setUpdate] = useState(false);

    [emoji, setEmoji] = useState(list.emoji);
    [listName, setListName] = useState(list.listName);
    [dueDate, setDueDate] = useState(list.dueDate);
    [visible, setVisible] = useState(false);
    [emojiVisible, setEmojiVisible] = useState(false);

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
            <Text onPress={()=>{setEmojiVisible(true)}}>{emoji}</Text>
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
        </View>
    );
}

export default GiftListAdd;