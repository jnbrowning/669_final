import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import styles from '../styles';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'; 
import { useState, useEffect } from 'react';
import Modal from "react-native-modal";
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch, subscribeToFriends } from '../data/DB';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import GiftStatusBar from '../components/GiftStatusBar';
import BackButton from '../components/BackButton';
import FriendGiftOverlay from "./FriendGiftOverlay";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import GiftOptions from './GiftOptions';
import { deleteGift } from '../data/Actions';
import { current } from '@reduxjs/toolkit';

const GiftListFriends = (props) => {

    const { list } = props;
    const friends = useSelector((state)=>state.friendItems);
    const userID = useSelector((state)=>state.userID);

    const friendGifts = useSelector((state)=>state.friendGifts);
    const dispatch = useDispatch();

    //overlay for adding or updating friend gifts
    [overlayVisible, setOverlayVisible] = useState(false);
    //updates overlay to show detail view of gift for add/update
    [giftSelected, setGiftSelected] = useState(false);
    //used to set friend when adding gift idea
    [currentFriend, setCurrentFriend] = useState('');
    //gift ideas to choose from for specific friend
    [giftIdeas, setGiftIdeas] = useState([]);
    //for overlay, whether user is updating or adding gift idea
    [update, setUpdate] = useState(false);

    [updateGift, setUpdateGift] = useState({
        giftKey: '',
            giftName: '',
            giftStatus: 0,
            price: '',
            notes: '',
    })
  
    //get list of possible gift ideas for friend
    const getGiftIdeaList = (obj) => {
        setCurrentFriend(obj);
        setOverlayVisible(true);
        for (f of friends){
        if (f.key === obj) {setGiftIdeas(f.giftIdeas);}
        }
    }

    const closeOverlay = () => {
        setIndex(0);
        setOverlayVisible(false);
        setGiftSelected(false);
        setUpdate(false);
    };

      //set values to add new gift for friend
    const selectGift = (gift) => {
        setGiftSelected(true);
        setUpdateGift(
            {
                giftKey: gift.key,
                giftName: gift.giftName,
                giftStatus: 0,
                price: gift.price,
                notes: '',
            }
        )
        console.log(gift)
    }

  [giftIndex, setIndex] = useState(0);

      //set values to update gift idea for friend
      const selectUpdateGift = (gift, index) => {
        setUpdate(true);
        setGiftSelected(true);
        setOverlayVisible(true);
        setCurrentFriend(gift.friendID);
        setIndex(index);
        setUpdateGift(
            {
                giftKey: gift.giftKey,
                giftName: gift.giftName,
                giftStatus: gift.giftStatus,
                price: gift.price,
                notes: gift.notes,
            }
        )
      }

  const deleteGift = () => {
    for (f of friendGifts){
        //find friend in friend list and update gifts
        if (f.key === currentFriend) {
        const newGifts = f.gifts.slice();
        newGifts.splice(giftIndex, 1);
        let updateFriend = {
            firstName: f.firstName,
            lastName: f.lastName,
            gifts: newGifts
        }
        console.log(updateFriend.gifts)
        //update Firebase with new friend gift info
        const updateAction = { type: actionTypes.UPDATE_FRIEND_GIFT_LIST, payload: { key: f.key, newFriendGifts: updateFriend, userid: userID, listid: list.key }}
        saveAndDispatch(updateAction, dispatch);
        }

    }}

    //Swipeable
    const renderRightActions = () => {
        return (
            <TouchableOpacity 
            style={styles.deleteSwipe} 
            onPress={()=>deleteGift()}>
                <Text style={styles.deleteSwipeText}>DELETE</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.giftListFriends}>
        <FlatList
        data={friendGifts}
        renderItem={({item})=>{
            return (
                <View>    
                    <View style={styles.friendGiftPair}>
                        <Text style={styles.friendName}>{item.firstName} {item.lastName}</Text>
                        <TouchableOpacity 
                        style={styles.addGift}
                        onPress={() => {getGiftIdeaList(item.key)}}>
                        <Feather name="gift" size={20} color="white"/>
                        <Ionicons name="add" size={12} color="white" />
                        </TouchableOpacity>   
                    </View>
                    <FlatList
                    data={item.gifts}
                    renderItem={({item, index})=>{
                        return (
                        <Swipeable
                        renderRightActions={renderRightActions}
                        onSwipeableOpen={()=>(setCurrentFriend(item.friendID))}
                        overshootFriction={8}>
                        <TouchableOpacity 
                        style={styles.giftItemDetail}
                        onPress={()=>{selectUpdateGift(item, index);}}>
                            <Text style={styles.giftItemText}>{item.giftName}</Text>
                            <GiftStatusBar giftStatus={item.giftStatus} disabled={true} />
                        </TouchableOpacity>
                        </Swipeable>
                        );}}
                    />
                </View>
          );}}
        />
        <Modal 
        isVisible={overlayVisible}
        onBackdropPress={()=>{setOverlayVisible(false); setGiftSelected(false)}}
        backdropOpacity={0.2}
        style={styles.overlay}>       
            <View style={styles.overlayExpandBox}>
                <Text style = {styles.overlayCancel} onPress={()=>{setOverlayVisible(false); setGiftSelected(false)}}>
                    <Ionicons name="md-close-outline" size={20} color="black" />
                </Text>
                {giftSelected ? 
                <FriendGiftOverlay 
                closeOverlay={closeOverlay} 
                currentFriend={currentFriend} 
                list={list}
                gift={updateGift}/> 
                : 
                <GiftOptions selectGift={selectGift} /> }
            </View>
        </Modal>
      </View>
    )
}

export default GiftListFriends;