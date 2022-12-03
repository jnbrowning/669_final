import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Icon } from '@rneui/themed';
import styles from '../styles';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'; 
import { useState, useEffect } from 'react';
import Modal from "react-native-modal";
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch, subscribeToFriends } from '../data/DB';
import { Ionicons } from '@expo/vector-icons';
import GiftStatusBar from '../components/GiftStatusBar';
import BackButton from '../components/BackButton';

const GiftListDetail = (props) => {

  const friends = useSelector((state)=>state.friendItems);
  const gifts = useSelector((state)=>state.giftItems);
  const userID = useSelector((state)=>state.userID);
  const friendGifts = useSelector((state)=>state.friendGifts);

  const { navigation, route } = props;
  const { list } = route.params;
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

  //friend gift text inputs
  [currentGiftName, setCurrentGiftName] = useState('');
  [giftStatus, setGiftStatus] = useState(0);
  [price, setPrice] = useState('');
  [notes, setNotes] = useState('');
  [giftKey, setGiftKey] = useState('');
  [giftIndex, setIndex] = useState(0);

  useEffect(() => {
    //load list of friends and gifts
    const loadFriendGifts = { type: actionTypes.LOAD_FRIEND_GIFT_LIST, payload: {userid: userID, listid: list.key}}
    saveAndDispatch(loadFriendGifts, dispatch);
    //subscribe to updates on friend gifts to see live updates
    subscribeToFriends(userID, list.key);
    console.log(list);
  }, []);

  //reset inputs and close overlay after add or update gift idea
  const clearInputs = () => {
    setCurrentGiftName('');
    setGiftStatus(0);
    setPrice('');
    setNotes('');
    setGiftKey('');
    setIndex(0);
    setOverlayVisible(false);
    setGiftSelected(false);
    setUpdate(false);
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
  
  deleteGift = () => {
    for (f of friendGifts){
      //find friend in friend list and update gifts
      if (f.key === currentFriend) {
        newGifts = f.gifts.slice();
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
      //clear inputs for next entry
      clearInputs();
  }}

  //get list of possible gift ideas for friend
  const getGiftIdeaList = (obj) => {
    for (f of friends){
      if (f.key === obj) {setGiftIdeas(f.giftIdeas);}
    }
  }

  //filter all gifts to view only those in friends possible gift ideas
  const inGiftList = (obj) => {
      for (g of giftIdeas){if (g === obj) {return true;}}
      return false;
  }

  //set values to add new gift for friend
  const selectGift = (gift) => {
    setGiftSelected(true);
    setGiftKey(gift.key);
    setCurrentGiftName(gift.giftName);
    setPrice(gift.price);
    setGiftStatus(0);
    setNotes('');
  }

  //set values to update gift idea for friend
  const selectUpdateGift = (gift, index) => {
    setUpdate(true);
    setGiftSelected(true);
    setOverlayVisible(true);
    setCurrentFriend(gift.friendID);
    setGiftKey(gift.giftKey);
    setCurrentGiftName(gift.giftName);
    setPrice(gift.price);
    setGiftStatus(gift.giftStatus);
    setNotes(gift.notes);
    setIndex(index);
  }

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
          <Icon 
            style={styles.editText}
            name="pencil"
            type="font-awesome"
            color='grey'
            size={16}
          />
      </TouchableOpacity>
      </View>
      
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
                onPress={() => { 
                  setCurrentFriend(item.key);
                  setOverlayVisible(true);
                  getGiftIdeaList(item.key)}}>
                  <Feather name="gift" size={20} color="black"/>
                  <Ionicons name="add" size={12} color="black" />
                </TouchableOpacity>   
              </View>
              <FlatList
                data={item.gifts}
                renderItem={({item, index})=>{
                  return (
                    <TouchableOpacity 
                    style={styles.giftItemDetail}
                    onPress={()=>{selectUpdateGift(item, index);}}>
                      <Text style={styles.giftItemText}>{item.giftName}</Text>
                      <GiftStatusBar giftStatus={item.giftStatus} disabled={true} />
                    </TouchableOpacity>);}}
              />
            </View>);}}
        />
      </View>
      <Modal 
      isVisible={overlayVisible}
      onBackdropPress={()=>{setOverlayVisible(false); setGiftSelected(false)}}
      backdropOpacity={0.2}
      style={styles.overlay}>
              
        <View style={styles.overlayExpandBox}>
        
          {giftSelected ? 
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
            <View style={styles.statusButtonPair}>
            <TouchableOpacity 
              style={styles.statusDelete}
              onPress={deleteGift}>
              <Ionicons name="trash-outline" size={30} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.statusSave}
            onPress={addFriendGiftList}>
              <Text>{update ? 'Save' : 'Add Gift'}</Text>
            </TouchableOpacity>
            </View>
          </View> 
          : 
          <View>
          <Text>Gift Ideas: </Text>
          <FlatList 
          data={gifts}
          renderItem={({item})=>{
            return (
              <View>
                {inGiftList(item.key) ?  
                <View style={styles.dropDownPair}>
                  <Text onPress={()=>selectGift(item)} style={styles.dropDownText}>{item.giftName}</Text> 
                </View>
                : 
                <View/>}
              </View> 
            );}}
          />
          </View>
          }
          
        </View>
        
      </Modal>
    </View>
  );
}

export default GiftListDetail;