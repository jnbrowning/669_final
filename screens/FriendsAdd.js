import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import styles from '../styles';
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { useState, useEffect } from 'react';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BackButton from '../components/BackButton';

const FriendsAdd = (props) => {

    const { navigation, route } = props;
    const { friend } = route.params;

    const userID = useSelector((state)=>state.userID);
    const gifts = useSelector((state)=>state.giftItems);
    const dispatch = useDispatch();


    [update, setUpdate] = useState(false);
    [showGiftSelector, setShowGiftSelector] = useState(false);
    [calendarVisible, setCalendarVisible] = useState(false);

    [firstName, setFirstName] = useState(friend.firstName);
    [lastName, setLastName] = useState(friend.lastName);
    [birthDate, setBirthDate] = useState(friend.birthDate);
    [interests, setInterests] = useState(friend.interests);
    [giftIdeas, setGiftIdeas] = useState(friend.giftIdeas);

    const inGiftList = (obj) => {
        for (g of giftIdeas){
          if (g === obj) {
            return true;
          }
        }
        return false;
    }

    const checkGiftList = (obj) => {
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
    setCalendarVisible(false);
    }


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
        const addAction = { type: actionTypes.ADD_FRIEND, payload: { newFriend: newFriend, userid: userID }};
        saveAndDispatch(addAction, dispatch);
        navigation.navigate('Friends');
    }

    const updateFriend = () => {
        const newFriends = clearInputs();
        const updateAction = { type: actionTypes.UPDATE_FRIEND, payload: { key: friend.key, newFriend: newFriends, userid: userID }}
        saveAndDispatch(updateAction, dispatch);
        navigation.navigate('Friends');
    }

    return(
        <View style={styles.container}>
            <View style={styles.detailHeaderContainer}>
                <BackButton navigation={navigation}/>
                <Text style={styles.friendHeader}>
                    <FontAwesome5 name="user-friends" size={45} color="black" />
                </Text>
            </View>
            <View style={styles.inputPair}>
                <Text style={styles.inputLabel}>First Name:</Text>
                <TextInput
                    style={styles.headInputText}
                    value={firstName}
                    onChangeText={(text)=>setFirstName(text)}/>
            </View>
            <View style={styles.inputPair}>
                <Text style={styles.inputLabel}>Last Name:</Text>
                <TextInput 
                    style={styles.headInputText}
                    value={lastName}
                    onChangeText={(text)=>setLastName(text)}/>
            </View>
            
            <View style={styles.inputPair}>
            <Text style={styles.inputLabel}>Birthday:</Text>
            <TouchableOpacity 
                onPress={()=>setCalendarVisible(true)}>
                    <Ionicons name="calendar-outline" size={20} color="#EA047E" style={styles.calendar}/>
                </TouchableOpacity>
                <Text style={styles.calendarText}>{birthDate}</Text>      
            </View>
            <DateTimePickerModal
                isVisible={calendarVisible}
                mode="date"
                onConfirm={updateDate}
                onCancel={()=>{setCalendarVisible(false)}}
            />
            <Text style={styles.fullInputLabel}>Interests:</Text>
            <TextInput 
                style={styles.fullInputText}
                value={interests}
                onChangeText={(text)=>setInterests(text)}/>
        
            <View style={styles.inputPair}>
                <Text style={styles.inputLabel}>Gift Ideas: </Text>
                <TouchableOpacity 
                onPress={()=>{setShowGiftSelector(true)}}
                style={styles.addGiftIcon}>
                    <Feather name="gift" size={20} color="#EA047E"/>
                    <Ionicons name="add" size={12} color="#EA047E" />
                </TouchableOpacity>
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
                            <View style={styles.inputPair}>
                                <TouchableOpacity>
                                    <Ionicons name="add" size={18} color="black" onPress={()=>{checkGiftList(item.key)}}/>
                                </TouchableOpacity> 
                                <Text 
                                style={styles.dropDownText}
                                >{item.giftName}</Text>
                            </View> }
                        </View>);}}/>
                    </View>
            : <View/>}
        

            <View style={styles.friendList}>
                <FlatList 
                data={gifts}
                renderItem={({item})=>{
                    return (
                        <View>
                            {inGiftList(item.key) ?  
                            <View style={styles.inputPair}>
                            <TouchableOpacity 
                                onPress={()=>{removeGift(item)}}>
                                <Ionicons style={styles.cancelIcon} name="md-close-outline" size={20} color="black" />
                            </TouchableOpacity>
                            <Text 
                            style={styles.friendListText}
                            >{item.giftName}</Text> 
                            </View>: <View/> }
                        </View>
                    );}}/>
            </View>  
                
                <TouchableOpacity
                    onPress={()=>{
                    if (!update) {
                        addFriend();
                    } else {
                        updateFriend();
                    }
                    }}
                    style={styles.confirmButton}
                ><Text style={styles.confirmText}>{update ? 'Update' : 'Save'}</Text></TouchableOpacity>

        </View>
    );
}

export default FriendsAdd;