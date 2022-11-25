import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../styles';
import { getFBAuth } from '../data/DB';
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { useEffect } from 'react';
import { Icon } from '@rneui/themed';

const Friends = ({navigation}) => {

    const friends = useSelector((state)=>state.friendItems);
    const userID = useSelector((state)=>state.userID);
    const userName = useSelector((state)=>state.userName);
    const dispatch = useDispatch();

    const deleteFriend = (item) => {
        action = {
            type: actionTypes.DELETE_FRIEND, 
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
        console.log('userID = ', userID);
    }, []);

    return(
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.signOutButton}
                onPress={async () => {await signOut(getFBAuth());}}>
                <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
            <Text style={styles.header}>{userName}'s Friends</Text>
            <View style={styles.addButton}>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate('FriendsAdd', {
                friend: {
                    key: -1,
                    firstName: '',
                    lastName: '',
                }})}}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            </View>
            <FlatList
            data={friends}
            renderItem={({item})=>{
                return (
                    <View style={styles.item}>
                        <Text 
                        style={styles.itemText}
                        onPress={()=>{navigation.navigate('FriendsDetail', {
                            friend: item,
                        })}}
                        >{item.firstName} {item.lastName}</Text>
                        <TouchableOpacity 
                        onPress={()=>{deleteFriend(item)}}>
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

export default Friends;