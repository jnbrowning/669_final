import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { useEffect } from 'react';
import { Icon } from '@rneui/themed';

const Gifts = ({navigation}) => {

    const giftItems = useSelector((state)=>state.giftItems);
    const userID = useSelector((state)=>state.userID);
    const dispatch = useDispatch();

    const deleteGift = (item) => {
        action = {
            type: actionTypes.DELETE_GIFT, 
            payload: {
                key: item.key,
                userid: userID,
            }
        }
        saveAndDispatch(action, dispatch);
    };

    useEffect(() => {
        const loadGifts = { type: actionTypes.LOAD_GIFT, payload: {userid: userID} };
        saveAndDispatch(loadGifts, dispatch);
    }, [ userID ]);

    return(
        <View style={styles.container}>
            <View style={styles.addButton}>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate('GiftAdd', {
                gift: {
                    key: -1,
                    giftName: '',
                    price: '',
                }
            })}}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            </View>
            <Text style={styles.header}>Gifts</Text>
            <FlatList
            data={giftItems}
            renderItem={({item})=>{
                return (
                    <View style={styles.item}>
                        <Text 
                        style={styles.itemText}
                        onPress={()=>{navigation.navigate('GiftDetail', {
                            gift: item,
                        })}}
                        >{item.giftName}</Text>
                        <TouchableOpacity 
                        onPress={()=>{deleteGift(item)}}>
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

export default Gifts;