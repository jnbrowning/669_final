import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { useDispatch } from 'react-redux';
import { saveAndDispatch } from '../data/DB';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { deleteFriend } from '../data/Actions';

const FriendItem = (props) => {

    const { friendItem, navigation } = props
    const dispatch = useDispatch();

    //Swipeable
    const renderRightActions = () => {
        return (
            <TouchableOpacity 
            style={styles.deleteSwipe} 
            onPress={()=>{saveAndDispatch(deleteFriend(friendItem), dispatch)}}>
                <Text style={styles.deleteSwipeText}>DELETE</Text>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            overshootFriction={8}>
            <Text 
            style={styles.itemText}
            onPress={()=>{navigation.navigate('FriendsDetail', {friend: friendItem,})}}>
                {friendItem.firstName} {friendItem.lastName}
            </Text>
        </Swipeable>
    )
}

export default FriendItem