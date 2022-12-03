import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { useEffect } from 'react';
import Header from '../components/Header';
import BigAddButton from '../components/BigAddButton';
import FriendItem from '../components/FriendItem';

const Friends = ({navigation}) => {

    const friends = useSelector((state)=>state.friendItems);
    const userID = useSelector((state)=>state.userID);
    const userName = useSelector((state)=>state.userName);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadGifts = { type: actionTypes.LOAD_GIFT, payload: {userid: userID} };
        saveAndDispatch(loadGifts, dispatch);
        const loadFriends = { type: actionTypes.LOAD_FRIEND, payload: {userid: userID} };
        saveAndDispatch(loadFriends, dispatch);
    }, []);

    const addFriend = () => {
        return navigation.navigate('FriendsAdd', {
            friend: {
                key: -1,
                firstName: '',
                lastName: '',
                birthDate: '',
                interests: '',
                giftIdeas: [],
        }})
    }

    return(
        <View style={styles.container}>
            <Header headerTitle={'Friends'} navigation={navigation}/>
            <View style={styles.listContainer}>
                <FlatList
                data={friends}
                renderItem={({item})=>{
                    return (
                        <FriendItem friendItem={item} navigation={navigation}/>
                    );}}/>
            </View>
            <BigAddButton addFunction={addFriend}/>
        </View>
    );
}

export default Friends;