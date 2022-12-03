import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { useSelector, useDispatch } from "react-redux";
import { saveAndDispatch } from '../data/DB';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { deleteGift } from '../data/Actions';

const GiftItem = (props) => {

    const { giftItem, navigation } = props
    const userID = useSelector((state)=>state.userID);
    
    const dispatch = useDispatch();

    //Swipeable
    const renderRightActions = () => {
        return (
            <TouchableOpacity 
            style={styles.deleteSwipe} 
            onPress={()=>{saveAndDispatch(deleteGift(giftItem, userID), dispatch)}}>
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
            onPress={()=>{navigation.navigate('GiftDetail', {
                gift: giftItem,
            })}}
            >{giftItem.giftName}</Text>
        </Swipeable>)
}

export default GiftItem;