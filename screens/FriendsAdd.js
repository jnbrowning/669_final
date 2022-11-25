import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '../styles';
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { useState, useEffect } from 'react';

const FriendsAdd = (props) => {

    const { navigation, route } = props;
    const { friend } = route.params;

    const userID = useSelector((state)=>state.userID);
    const dispatch = useDispatch();

    [update, setUpdate] = useState(false);

    [firstName, setFirstName] = useState(friend.firstName);
    [lastName, setLastName] = useState(friend.lastName);

    const clearInputs = () => {
        const newFriend = {
            firstName: firstName,
            lastName: lastName,
        }
        setFirstName('');
        setLastName('');
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
            
        </View>
    );
}

export default FriendsAdd;