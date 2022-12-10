import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { saveAndDispatch } from '../data/DB';
import { useSelector, useDispatch } from 'react-redux';
import { deleteGiftList } from '../data/Actions';

const GiftListItem = (props) => {

    const { listItem, navigation } = props;

    const userID = useSelector((state)=>state.userID);
    const dispatch = useDispatch();

    const deleteList = () => {
        saveAndDispatch(deleteGiftList(userID, listItem.key), dispatch);
    };

    /////SWIPEABLE
    const renderRightActions = () => {
        return (
            <TouchableOpacity style={styles.deleteSwipe} onPress={()=>{deleteList()}}>
                <Text style={styles.deleteSwipeText}>DELETE</Text>
            </TouchableOpacity>
        );
      };

    return (
        <Swipeable
        renderRightActions={renderRightActions}
        overshootFriction={8}>
            <View style={styles.giftListContainer}>
                <Text style={styles.giftListEmoji}>{listItem.emoji}</Text>
                <TouchableOpacity
                    style={styles.giftListSelect}
                    onPress={()=>{navigation.navigate('GiftListDetail', {
                        list: listItem
                    })}}>
                    <Text style={styles.giftListName}>{listItem.listName}</Text>
                    <Text style={styles.giftListDate}>
                        <Ionicons name="calendar-outline" size={16} color="grey"/>  {listItem.dueDate}
                    </Text>
                </TouchableOpacity> 
            </View>
        </Swipeable>
    )
}

export default GiftListItem;