import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '../styles';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'; 
import { useState, useEffect } from 'react';
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch, subscribeToFriends } from '../data/DB';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import GiftStatusBar from '../components/GiftStatusBar';
import BackButton from '../components/BackButton';

const FriendGiftOverlay = (props) => {

    const { closeOverlay, gift, currentFriend, list } = props;
    const friendGifts = useSelector((state)=>state.friendGifts);
    const userID = useSelector((state)=>state.userID);
    const dispatch = useDispatch();

    //reset inputs and close overlay after add or update gift idea
    const clearInputs = () => {
        setCurrentGiftName('');
        setGiftStatus(0);
        setPrice('');
        setNotes('');
        setGiftKey('');
        closeOverlay();
    }

    //add or update gift idea for friend
    const addFriendGiftList = () => {
        //create gift object
        const newFriendGift = {
            giftKey: giftKey,
            giftName: currentGiftName,
            giftStatus: giftStatus,
            price: price,
            notes: notes,
            friendID: currentFriend,
        }
        for (f of friendGifts){
            //find friend in friend list and update gifts
            if (f.key === currentFriend) {
            let newGifts;
            //add gift
            if(!update){newGifts = f.gifts.concat(newFriendGift);}
            //update gift
            else {
                newGifts = f.gifts.slice();
                newGifts[giftIndex] = newFriendGift;
            }
            //create updated friend object
            let updateFriend = {
                firstName: f.firstName,
                lastName: f.lastName,
                gifts: newGifts
            }
            //update Firebase with new friend gift info
            const updateAction = { type: actionTypes.UPDATE_FRIEND_GIFT_LIST, payload: { key: f.key, newFriendGifts: updateFriend, userid: userID, listid: list.key }}
            saveAndDispatch(updateAction, dispatch);
            }
            //clear inputs for next entry
            clearInputs();
        }
        }
    
    //friend gift text inputs
    [currentGiftName, setCurrentGiftName] = useState(gift.giftName);
    [giftStatus, setGiftStatus] = useState(gift.giftStatus);
    [price, setPrice] = useState(gift.price);
    [notes, setNotes] = useState(gift.notes);
    [giftKey, setGiftKey] = useState(gift.giftKey);

    return (
          <View style={styles.giftStatusOverlay}>
            <View style={styles.giftStatusPair}>
              <Text style={styles.giftStatusLabel}>Gift: </Text>
              <TextInput
              style={styles.giftStatusInput}
              value={currentGiftName}
              onChangeText={(text)=>setCurrentGiftName(text)}/>
            </View>
            <View style={styles.giftStatusPair}>
            <Text style={styles.giftStatusLabel}>Price: </Text>
            <TextInput
              style={styles.giftStatusInput}
              value={price}
              onChangeText={(text)=>setPrice(text)}/>
            </View>
            <View style={styles.giftStatusPair}>
              <Text style={styles.giftStatusLabel}>Status:</Text>
            </View>
            <View style={styles.overlayStatus}>
            <GiftStatusBar giftStatus={giftStatus} disabled={false}/>
            </View>
            <View style={styles.giftStatusPair}>
              <Text style={styles.giftStatusLabel}>Note: </Text>
              <TextInput
              style={styles.giftStatusInput}
                value={notes}
                onChangeText={(text)=>setNotes(text)}
                />
            </View>
            <TouchableOpacity
            style={styles.statusSave}
            onPress={addFriendGiftList}>
              <Text>{update ? 'Save' : 'Add Gift'}</Text>
            </TouchableOpacity>
          </View> 
    )
}

export default FriendGiftOverlay;