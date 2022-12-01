import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../styles';
import { getFBAuth } from '../data/DB';
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { useEffect } from 'react';
import { Icon } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { rootReducer } from '../data/Reducer';

const GiftLists = ({navigation}) => {

    const userName = useSelector((state)=>state.userName);
    const userID = useSelector((state)=>state.userID);
    const giftLists = useSelector((state)=>state.giftListItems);
    const dispatch = useDispatch();
    const newDate = new Date();

    const deleteList = (item) => {
        action = {
            type: actionTypes.DELETE_GIFT_LIST, 
            payload: {
                key: item.key,
                userid: userID,
            }
        }
        saveAndDispatch(action, dispatch);
    };

    useEffect(() => {
        const loadFriends = { type: actionTypes.LOAD_FRIEND, payload: {userid: userID} };
        saveAndDispatch(loadFriends, dispatch);
        const loadGifts = { type: actionTypes.LOAD_GIFT, payload: {userid: userID} };
        saveAndDispatch(loadGifts, dispatch);
        const loadUser = { type: actionTypes.LOAD_USER, payload: {userId: userID} };
        saveAndDispatch(loadUser, dispatch);
        const loadGiftList = { type: actionTypes.LOAD_GIFT_LIST, payload: {userid: userID} };
        saveAndDispatch(loadGiftList, dispatch);
        console.log('userID = ', userID);
    }, [ userID ]);

    return(
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.signOutButton}
                onPress={async () => {
                    dispatch({ type: actionTypes.CLEAR_DATA });
                    navigation.popToTop();
                    await signOut(getFBAuth());}}>
                <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Gift Lists for {userName}</Text>
            <View style={styles.addButton}>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate('GiftListAdd', {
                list: {
                    key: -1,
                    listName: '',
                    dueDate: '',
                    emoji: 'X',
                    friendList: [], 
                }})}}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            </View>
            <FlatList
            data={giftLists}
            renderItem={({item})=>{
                return (
                    <View style={styles.giftListContainer}>
                        <Text style={styles.giftListEmoji}>{item.emoji}</Text>
                        <TouchableOpacity
                            style={styles.giftListSelect}
                            onPress={()=>{navigation.navigate('GiftListDetail', {
                                list: item
                            })}}>
                            <Text style={styles.giftListName}>{item.listName}</Text>
                            <Text style={styles.giftListDate}><Ionicons name="calendar-outline" size={16} color="grey"/>  {item.dueDate}</Text>

                        </TouchableOpacity> 
                        <TouchableOpacity 
                        onPress={()=>{deleteList(item)}}>
                            <Icon 
                                name="trash"
                                type="font-awesome"
                                size={18}
                            />
                        </TouchableOpacity>
                    </View>
                );}}/>
                </View>
    );
}

export default GiftLists;