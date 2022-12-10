import { View, FlatList } from 'react-native';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import { saveAndDispatch } from '../data/DB';
import { useEffect } from 'react';
import Header from '../components/Header';
import BigAddButton from '../components/BigAddButton';
import FriendItem from '../components/FriendItem';
import { loadGifts, loadFriends } from '../data/Actions';

const Friends = ({navigation}) => {

    const friends = useSelector((state)=>state.friendItems);
    const userID = useSelector((state)=>state.userID);
    const userName = useSelector((state)=>state.userName);
    const dispatch = useDispatch();

    useEffect(() => {
        saveAndDispatch(loadGifts(userID), dispatch);
        saveAndDispatch(loadFriends(userID), dispatch);
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