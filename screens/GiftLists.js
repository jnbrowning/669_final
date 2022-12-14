import { View, FlatList } from 'react-native';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { saveAndDispatch } from '../data/DB';
import { addGiftList } from '../data/Actions';

import styles from '../styles';
import Header from '../components/Header';
import BigAddButton from '../components/BigAddButton';
import GiftListItem from '../components/GiftListItem';

import { loadGiftList, loadGifts, loadFriends } from '../data/Actions';

const GiftLists = ({navigation}) => {

    const userID = useSelector((state)=>state.userID);
    const giftLists = useSelector((state)=>state.giftListItems);

    const dispatch = useDispatch();

    useEffect(() => {
        saveAndDispatch(loadGiftList(userID), dispatch);
        saveAndDispatch(loadGifts(userID), dispatch);
        saveAndDispatch(loadFriends(userID), dispatch);
    }, [userID]);

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
            <Header headerTitle={"Gift Lists"} navigation={navigation}/>
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