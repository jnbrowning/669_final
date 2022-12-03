import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { useSelector, useDispatch } from 'react-redux';


const GiftListItem = (props) => {

    const { listItem, navigation } = props;

    const userID = useSelector((state)=>state.userID);
    const dispatch = useDispatch();

    const deleteList = () => {
        action = {
            type: actionTypes.DELETE_GIFT_LIST, 
            payload: {
                key: listItem.key,
                userid: userID,
            }
        }
        saveAndDispatch(action, dispatch);
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
                        overshootFriction={8}
                        >
                        <View style={styles.giftListContainer}>
                            <Text style={styles.giftListEmoji}>{listItem.emoji}</Text>
                            <TouchableOpacity
                                style={styles.giftListSelect}
                                onPress={()=>{navigation.navigate('GiftListDetail', {
                                    list: listItem
                                })}}>
                                <Text style={styles.giftListName}>{listItem.listName}</Text>
                                <Text style={styles.giftListDate}><Ionicons name="calendar-outline" size={16} color="grey"/>  {listItem.dueDate}</Text>
                                </TouchableOpacity> 
                            </View>
                            </Swipeable>
    )
}

export default GiftListItem;