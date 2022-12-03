import { View, FlatList } from 'react-native';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { addGiftList } from '../data/Actions';

import styles from '../styles';
import Header from '../components/Header';
import BigAddButton from '../components/BigAddButton';
import GiftListItem from '../components/GiftListItem';


const GiftLists = ({navigation}) => {

    const userID = useSelector((state)=>state.userID);
    const giftLists = useSelector((state)=>state.giftListItems);
    
    const dispatch = useDispatch();

    useEffect(() => {
        const loadGiftList = { type: actionTypes.LOAD_GIFT_LIST, payload: {userid: userID} };
        saveAndDispatch(loadGiftList, dispatch);
        const loadUser = { type: actionTypes.LOAD_USER, payload: {userId: userID} };
        saveAndDispatch(loadUser, dispatch);
        const loadGifts = { type: actionTypes.LOAD_GIFT, payload: {userid: userID} };
        saveAndDispatch(loadGifts, dispatch);
        const loadFriends = { type: actionTypes.LOAD_FRIEND, payload: {userid: userID} };
        saveAndDispatch(loadFriends, dispatch);
        console.log('userID = ', userID);
    }, [ userID ]);

    const createList = async () => {
        const addList={
            key: '',
            listName: '',
            dueDate: '',
            emoji: 'x',
        }
        const giftID = await saveAndDispatch(addGiftList(addList, userID), dispatch);
        addList.key = giftID;
        await navigation.navigate('GiftListAdd', {list: addList});
    }

    return (
        <View style={styles.container}>
            <Header headerTitle={'Gift Lists'} navigation={navigation}/>
            <View style={styles.listContainer}>
                <FlatList
                data={giftLists}
                renderItem={({item})=>{
                    return (
                        <GiftListItem listItem={item} navigation={navigation}/>
                    );}}
                />
            </View>
            <BigAddButton addFunction={createList}/>
        </View>
    );
}

export default GiftLists;