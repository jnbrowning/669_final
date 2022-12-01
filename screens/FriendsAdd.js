import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import styles from '../styles';
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const FriendsAdd = (props) => {

    const { navigation, route } = props;
    const { friend } = route.params;

    const userID = useSelector((state)=>state.userID);
    const gifts = useSelector((state)=>state.giftItems);
    const dispatch = useDispatch();

    const inGiftList = (obj) => {
        for (g of giftIdeas){
          if (g === obj) {
            console.log(true);
            return true;
          }
        }
        console.log(false);
        return false;
    }

    const checkGiftList = (obj) => {
        console.log(obj);
        if (inGiftList(obj)) {
            console.log('already in gift list');
        }
        else {
            const newGiftIdeas = giftIdeas.concat(obj);
            setGiftIdeas(newGiftIdeas);
        }
    }

    const removeGift = (obj) => {
        const newGiftIdeas = giftIdeas.filter(elem => elem!==obj.key);
        setGiftIdeas(newGiftIdeas);
      };

    const updateDate = (date) => {
    let newDate = date.toLocaleDateString('en-us', { 
            month:"numeric", 
            day:"numeric", 
            year: "numeric",
            })
    setBirthDate(newDate); 
    console.log(birthDate);
    setCalendarVisible(false);
    }

    [update, setUpdate] = useState(false);
    [showGiftSelector, setShowGiftSelector] = useState(false);
    [calendarVisible, setCalendarVisible] = useState(false);

    [firstName, setFirstName] = useState(friend.firstName);
    [lastName, setLastName] = useState(friend.lastName);
    [birthDate, setBirthDate] = useState(friend.birthDate);
    [interests, setInterests] = useState(friend.interests);
    [giftIdeas, setGiftIdeas] = useState(friend.giftIdeas);

    const clearInputs = () => {
        const newFriend = {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            interests: interests,
            giftIdeas: giftIdeas,
        }
        setFirstName('');
        setLastName('');
        setBirthDate('');
        setInterests('');
        setGiftIdeas([]);
        return newFriend;
    }

    useEffect(() => {
        if (friend.key === -1) {
          setUpdate(false);
        }
        else {
          setUpdate(true);
        }
      }, []);

    const addFriend = () => {
        const newFriend = clearInputs();
        console.log(newFriend)
        const addAction = { type: actionTypes.ADD_FRIEND, payload: { newFriend: newFriend, userid: userID }};
        saveAndDispatch(addAction, dispatch);
        navigation.navigate('Friends');
    }

    const updateFriend = () => {
        const newFriends = clearInputs();
        const updateAction = { type: actionTypes.UPDATE_FRIEND, payload: { key: friend.key, newFriend: newFriends, userid: userID }}
        navigation.navigate('Friends');
        saveAndDispatch(updateAction, dispatch);
    }

    return(
        <View style={styles.container}>
            <View style={styles.headerButton}>
                <TouchableOpacity
                    onPress={()=>{navigation.navigate('Friends');}}
                    >
                    <Text style={styles.headerButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                    if (!update) {
                        addFriend();
                    } else {
                        updateFriend();
                    }
                    }}
                ><Text style={styles.headerButtonText}>{update ? 'Update' : 'Save'}</Text></TouchableOpacity>
            </View>
            <Text style={styles.header}>{update ? 'Update Friend' : 'Add Friend'}</Text>
            <View style={styles.inputPair}>
                <Text style={styles.inputLabel}>First Name:</Text>
                <TextInput
                    style={styles.inputText}
                    value={firstName}
                    onChangeText={(text)=>setFirstName(text)}/>
            </View>
            <View style={styles.inputPair}>
            <Text style={styles.inputLabel}>Last Name:</Text>
            <TextInput 
                style={styles.inputText}
                value={lastName}
                onChangeText={(text)=>setLastName(text)}/>
            </View>
            
            <View style={styles.inputPair}>
            <Text style={styles.inputLabel}>Birthday:</Text>
            <TouchableOpacity 
                onPress={()=>setCalendarVisible(true)}>
                    <Ionicons name="calendar-outline" size={24} color="red" style={styles.calendar}/>
                </TouchableOpacity>
                <Text style={styles.calendarText}>{birthDate}</Text>      
            </View>
            <DateTimePickerModal
                isVisible={calendarVisible}
                mode="date"
                onConfirm={updateDate}
                onCancel={()=>{setCalendarVisible(false)}}
            /> 

            <View style={styles.inputPair}>
                <Text style={styles.inputLabel}>Interests:</Text>
            <TextInput 
                style={styles.inputText}
                value={interests}
                onChangeText={(text)=>setInterests(text)}/>
            </View>

            <View style={styles.inputPair}>
                <Text style={styles.dropDownLabel}>Add Gift Ideas: </Text>
            </View>
            {showGiftSelector ? 
            <View style={styles.dropDown}>
                <Text style = {styles.cancelText} onPress={()=>setShowGiftSelector(false)}>close</Text>
                <FlatList
                data={gifts}
                renderItem={({item})=>{
                    return (
                        <View>
                            {inGiftList(item.key) ? <View/> : 
                            <View style={styles.dropDownPair}>
                                <TouchableOpacity>
                                    <Ionicons name="add" size={18} color="black" onPress={()=>{checkGiftList(item.key)}}/>
                                </TouchableOpacity> 
                                
                                <Text 
                                style={styles.dropDownText}
                                >{item.giftName}</Text>
                            </View> }
                        </View>);}}/>
                    </View>
            : <Text style={styles.dropDown} onPress={()=>{setShowGiftSelector(true)}}>Select Gift Ideas</Text>}
        
        <View style={styles.inputPair}>
            <Text style={styles.dropDownLabel}>Gift Ideas: </Text>
        </View>
        <View style={styles.inputPair}>
            <View style={styles.friendList}>
                <FlatList 
                data={gifts}
                renderItem={({item})=>{
                    return (
                        <View>
                            {inGiftList(item.key) ?  
                            <View style={styles.dropDownPair}>
                            <TouchableOpacity 
                                onPress={()=>{removeGift(item)}}>
                                <Ionicons name="close" size={12} color="black" />
                            </TouchableOpacity>
                            <Text 
                            style={styles.dropDownText}
                            >{item.giftName}</Text> 
                            </View>: <View/> }
                        </View>
                    );}}/>
            </View>  
        </View>
        </View>
    );
}

export default FriendsAdd;