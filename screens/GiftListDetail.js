import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Icon } from '@rneui/themed';
import styles from '../styles';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'; 
import { useState, useEffect } from 'react';
import Modal from "react-native-modal";
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { Ionicons } from '@expo/vector-icons'; 


const GiftListDetail = (props) => {

    const friends = useSelector((state)=>state.friendItems);
    const gifts = useSelector((state)=>state.giftItems);
    const userID = useSelector((state)=>state.userID);

    const { navigation, route } = props;
    const { list } = route.params;
    const dispatch = useDispatch();

    [needToUpdate, setNeedToUpdate] = useState(false);
    [overlayVisible, setOverlayVisible] = useState(false);
    [updateVisible, setUpdateVisible] = useState(false);
    [giftSelected, setGiftSelected] = useState(false);
    [viewGifts, setViewGifts] = useState(false);
    [editGifts, setEditGifts] = useState(false);

    [currentFriend, setCurrentFriend] = useState('');
    [currentGift, setCurrentGift] = useState('');
    [listOfGifts, setListOfGifts] = useState([]);

    [giftName, setGiftName] = useState('');
    [giftKey, setGiftKey] = useState('');
    [giftIdeas, setGiftIdeas] = useState([]);
    [friendList, setFriendList] = useState(list.friendList);

    //For Friend Gift Text Inputs
    [currentGiftName, setCurrentGiftName] = useState('');
    [giftStatus, setGiftStatus] = useState(0);
    [price, setPrice] = useState('');
    [notes, setNotes] = useState('');
    [giftKey, setGiftKey] = useState('');

    const clearInputs = () => {
      setCurrentFriend('');
      setCurrentGift('');
      setGiftStatus(0);
      setPrice('');
      setNotes('');
      setGiftSelected(false);
  }

  useEffect(() => {
    const loadGiftList = { type: actionTypes.LOAD_GIFT_LIST, payload: {userid: userID} };
    saveAndDispatch(loadGiftList, dispatch);
    }, []);

    const updateGiftList = (newFriends) => {
      const newList = {
        listName: list.listName,
        dueDate: list.dueDate,
        emoji: list.emoji,
        friendList: friendList,
    }
    console.log(newList);
      const updateAction = { type: actionTypes.UPDATE_GIFT_LIST, payload: { key: list.key, newList: newList, userid: userID }}
      saveAndDispatch(updateAction, dispatch);
      setNeedToUpdate(false);
  }

    const prepViewGifts = (obj) => {
      for (f of friendList){
        if (f.friend === obj) {
          setListOfGifts(f.gifts);
        }
        setViewGifts(true);

    }}

    const updateFriendGift = () => {
      setNeedToUpdate(true);
      const newFriendGift = {
        giftKey: giftKey,
        giftName: currentGiftName,
        status: giftStatus,
        price: price,
        notes: notes,
      }
      console.log(newFriendGift);
      setCurrentGift('');
      setCurrentGiftName('');
      setGiftStatus(0);
      setPrice('');
      setNotes('');
  
      for (f of friendList){
        if (f.friend === currentFriend) {
          const newGifts = f.gifts.map(elem=>elem.giftKey===newFriendGift.giftKey?newFriendGift:elem);
          console.log('new gifts ' + newGifts);
          let updateFriend = {
            firstName: f.firstName,
            lastName: f.lastName,
            friend: f.friend,
            gifts: newGifts
        }
        let newGiftItems = friendList.map(elem=>elem.friend===f.friend?updateFriend:elem);
        setFriendList(newGiftItems);
        }
      }
      setUpdateVisible(false);
    }

  const addFriendGift = async () => {
    setNeedToUpdate(true);
    const newFriendGift = {
      giftKey: giftKey,
      giftName: currentGiftName,
      status: giftStatus,
      price: price,
      notes: notes,
    }
    setCurrentGift('');
    setCurrentGiftName('');
    setGiftStatus(0);
    setPrice('');
    setNotes('');
    console.log(newFriendGift);
    for (f of friendList){
      if (f.friend === currentFriend) {
        const newGifts = f.gifts.concat(newFriendGift);
        let updateFriend = {
          firstName: f.firstName,
          lastName: f.lastName,
          friend: f.friend,
          gifts: newGifts
      }
      let newGiftItems = friendList.map(elem=>elem.friend===f.friend?updateFriend:elem);
      await setFriendList(newGiftItems);
      console.log(friendList);
      }
    }
    setOverlayVisible(false);
    setGiftSelected(false);
  }

  const editGift = (obj) => {
    setEditGifts(true);
    setGiftKey(obj.giftKey);
    setGiftName(obj.giftName);
    setNotes(obj.notes);
    setPrice(obj.price);
    setGiftStatus(obj.status);
  }

    const getGiftIdeaList = (obj) => {
      for (f of friends){
        if (f.key === obj) {
          setGiftIdeas(f.giftIdeas);
        }
      }
    }

    const inGiftList = (obj) => {
        for (g of giftIdeas){
          if (g === obj) {
            return true;
          }
        }
        return false;
    }

    const selectGift = (gift) => {
      setGiftSelected(true);
      setCurrentGift(gift);
      setGiftKey(gift.key);
      setCurrentGiftName(gift.giftName);
      setPrice(gift.price);
    }

    const selectUpdateGift = (gift) => {
      console.log('select gift ' + {gift},);
      setGiftKey(gift.giftKey);
      setCurrentGiftName(gift.giftName);
      setPrice(gift.price);
      setGiftStatus(gift.status);
      setNotes(gift.note);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.emojiHeader}>{list.emoji}</Text>
            <Text style={styles.header}>{list.listName}</Text>
            {needToUpdate ? <TouchableOpacity style={styles.editButton} 
                onPress={
                ()=>{
                  updateGiftList();
                }}>
            <Text style={styles.editText}>UPDATE</Text>
            <Icon 
              style={styles.editText}
              name="pencil"
              type="font-awesome"
              color='grey'
              size={16}
            />
          </TouchableOpacity>
            : <TouchableOpacity style={styles.editButton} 
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
          </TouchableOpacity> }
            <Text style={styles.detailText}>Due Date: {list.dueDate}</Text>
            
            <View  style={styles.giftListFriends}>
            <FlatList
            data={friendList}
            renderItem={({item})=>{
                return (
                    <View>
                      <View style={styles.friendGiftPair}>
                      <Text style={styles.friendName}>{item.firstName} {item.lastName}</Text>
                      <TouchableOpacity 
                      style={styles.addGift}
                      onPress={() => {  setCurrentFriend(item.friend);
                                                          setOverlayVisible(true);
                                                          getGiftIdeaList(item.friend)}}>
                            <Feather name="gift" size={20} color="black"/>
                            <Ionicons name="add" size={12} color="black" />
                        </TouchableOpacity>  
                        
                        </View>
                        <FlatList 
                          data={item.gifts}
                          renderItem={({item})=>{
                              return (
                                  <TouchableOpacity style={styles.giftItemDetail}
                                  onPress={()=>{
                                    selectUpdateGift(item);
                                    setUpdateVisible(true)}}
                                  >
                          <Text style={styles.giftItemText}>{item.giftName}</Text>
                          <View style={styles.statusBundle}>
                          <View style={styles.activeStatusButton}><Text style={styles.statusText}>Idea</Text></View>
                          <View style={(item.status > 0) ? styles.activeStatusButton: styles.statusButton}><Text style={styles.statusText}>Bought</Text></View>
                          <View style={(item.status > 1) ? styles.activeStatusButton: styles.statusButton}><Text style={styles.statusText}>Wrapped</Text></View>
                          <View style={(item.status > 2) ? styles.activeStatusButton: styles.statusButton}><Text style={styles.statusText}>Shipped</Text></View>
                          <View style={(item.status > 3) ? styles.activeStatusButton: styles.statusButton}><Text style={styles.statusText}>Done</Text></View>
                          </View>
                          </TouchableOpacity>
                          
                          );}}/>
                    </View>
                );}}/>
            </View>
            <Modal isVisible={overlayVisible}
                  onBackdropPress={()=>{setOverlayVisible(false); setGiftSelected(false)}}
                  backdropOpacity={0.2}
                  style={styles.overlay}>
              <View style={styles.overlayBox}>
              {giftSelected ? 
              <View>
                <View style={styles.inputPair}>
                  <Text style={styles.inputLabel}>Gift: </Text>
                  <TextInput
                  style={styles.inputText}
                  value={currentGiftName}
                  onChangeText={(text)=>setCurrentGiftName(text)}/>
                </View>
                <View style={styles.inputPair}>
                <Text>Price: </Text>
                <TextInput
                  style={styles.inputText}
                  value={price}
                  onChangeText={(text)=>setPrice(text)}/>
                </View>
                <Text>Status:</Text>
                <View style={styles.statusBundle}>
                <TouchableOpacity style={styles.activeStatusButton} onPress={()=>setGiftStatus(0)}><Text>Idea</Text></TouchableOpacity>
                <TouchableOpacity style={(giftStatus > 0) ? styles.activeStatusButton: styles.statusButton} onPress={()=>setGiftStatus(1)}><Text>Bought</Text></TouchableOpacity>
                <TouchableOpacity style={(giftStatus > 1) ? styles.activeStatusButton: styles.statusButton} onPress={()=>setGiftStatus(2)}><Text>Wrapped</Text></TouchableOpacity>
                <TouchableOpacity style={(giftStatus > 2) ? styles.activeStatusButton: styles.statusButton} onPress={()=>setGiftStatus(3)}><Text>Shipped</Text></TouchableOpacity>
                <TouchableOpacity style={(giftStatus > 3) ? styles.activeStatusButton: styles.statusButton} onPress={()=>setGiftStatus(4)}><Text>Done</Text></TouchableOpacity>
                </View>
                <View style={styles.inputPair}>
                <Text style={styles.inputLabel}>Note: </Text>
                <TextInput
                  style={styles.inputText}
                  value={notes}
                  onChangeText={(text)=>setNotes(text)}/>
                </View>
                <TouchableOpacity
                  onPress={addFriendGift}
                ><Text>Add Gift</Text></TouchableOpacity>
              </View> 
              : 
              <FlatList 
                data={gifts}
                renderItem={({item})=>{
                    return (
                        <View>
                            {inGiftList(item.key) ?  
                            <View style={styles.dropDownPair}>
                            <Text 
                            onPress={()=>selectGift(item)}
                            style={styles.dropDownText}
                            >{item.giftName}</Text> 
                            </View>: <View/> }
                        </View> 
                    );}}/>}
                    </View>
            </Modal>

            <Modal isVisible={updateVisible}
                  onBackdropPress={()=>{setUpdateVisible(false)}}
                  backdropOpacity={0.2}
                  style={styles.overlay}>
              <View style={styles.overlayBox}>
                <View style={styles.inputPair}>
                  <Text style={styles.inputLabel}>Gift: </Text>
                  <TextInput
                  style={styles.inputText}
                  value={currentGiftName}
                  onChangeText={(text)=>setCurrentGiftName(text)}/>
                </View>
                <View style={styles.inputPair}>
                <Text>Price: </Text>
                <TextInput
                  style={styles.inputText}
                  value={price}
                  onChangeText={(text)=>setPrice(text)}/>
                </View>
                <Text>Status:</Text>
                <View style={styles.statusBundle}>
                <TouchableOpacity style={styles.activeStatusButton} onPress={()=>setGiftStatus(0)}><Text>Idea</Text></TouchableOpacity>
                <TouchableOpacity style={(giftStatus > 0) ? styles.activeStatusButton: styles.statusButton} onPress={()=>setGiftStatus(1)}><Text>Bought</Text></TouchableOpacity>
                <TouchableOpacity style={(giftStatus > 1) ? styles.activeStatusButton: styles.statusButton} onPress={()=>setGiftStatus(2)}><Text>Wrapped</Text></TouchableOpacity>
                <TouchableOpacity style={(giftStatus > 2) ? styles.activeStatusButton: styles.statusButton} onPress={()=>setGiftStatus(3)}><Text>Shipped</Text></TouchableOpacity>
                <TouchableOpacity style={(giftStatus > 3) ? styles.activeStatusButton: styles.statusButton} onPress={()=>setGiftStatus(4)}><Text>Done</Text></TouchableOpacity>
                </View>
                <View style={styles.inputPair}>
                <Text style={styles.inputLabel}>Note: </Text>
                <TextInput
                  style={styles.inputText}
                  value={notes}
                  onChangeText={(text)=>setNotes(text)}/>
                </View>
                <TouchableOpacity
                  onPress={()=>updateFriendGift()}
                ><Text>Update Gift</Text></TouchableOpacity>
              </View> 
            </Modal>
 
        </View>
    );
}

export default GiftListDetail;