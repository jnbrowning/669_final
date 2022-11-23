import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '../styles';
import { useDispatch, useSelector } from "react-redux";
import { ADD_GIFT, UPDATE_GIFT } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { useState, useEffect } from 'react';
import { Icon } from '@rneui/themed';

const GiftAdd = (props) => {

    const userID = useSelector((state)=>state.userID);
    const dispatch = useDispatch();
    const { navigation, route } = props;
    const { gift } = route.params;

    [update, setUpdate] = useState(false);

    [giftName, setGiftName] = useState(gift.giftName);
    [price, setPrice] = useState(gift.price);

    const clearInputs = () => {
        const newGift = {
            giftName: giftName,
            price: price,
        }
        setGiftName('');
        setPrice('');
        return newGift;
    }

    useEffect(() => {
        if (gift.key === -1) {
          setUpdate(false);
        }
        else {
          setUpdate(true);
        }
      }, []);

    const addGift = () => {
        const newGift = clearInputs();
        const addAction = { type: ADD_GIFT, payload: { newGift: newGift, userid: userID }};
        navigation.navigate('Gifts');
        saveAndDispatch(addAction, dispatch);
    }

    const updateGift = () => {
        const newGift = clearInputs();
        const updateAction = { type: UPDATE_GIFT, payload: { key: gift.key, newGift: newGift, userid: userID }}
        navigation.navigate('Gifts');
        saveAndDispatch(updateAction, dispatch);
    }

    return(
        <View style={styles.container}>
            <View style={styles.headerButton}>
                <TouchableOpacity
                    onPress={()=>{navigation.navigate('Gifts');}}
                    >
                    <Text style={styles.headerButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                    if (!update) {
                        addGift();
                    } else {
                        updateGift();
                    }
                    }}
                ><Text style={styles.headerButtonText}>{update ? 'Update' : 'Save'}</Text></TouchableOpacity>
            </View>
            <Text style={styles.header}>{update ? 'Update Gift' : 'Add Gift'}</Text>
            <View style={styles.inputPair}>
                <Text style={styles.inputLabel}>Gift Name:</Text>
                <TextInput
                    style={styles.inputText}
                    value={giftName}
                    onChangeText={(text)=>setGiftName(text)}/>
            </View>
            <View style={styles.inputPair}>
            <Text style={styles.inputLabel}>Price:</Text>
            <TextInput 
                style={styles.inputText}
                value={price}
                onChangeText={(text)=>setPrice(text)}/>
            </View>
            
        </View>
    );
}

export default GiftAdd;