import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import styles from '../styles';
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { useState, useEffect } from 'react';
import { Icon } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons'; 
import BackButton from '../components/BackButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const GiftAdd = (props) => {

    const userID = useSelector((state)=>state.userID);
    const giftPicture = useSelector((state)=>state.previewPicture);
    const newPicture = useSelector((state)=>state.updatePicture);
    const dispatch = useDispatch();
    
    const savePicture = (pictureObject, updateValue) => {
        return {
          type: actionTypes.PREVIEW_PICTURE,
          payload: {
            picture: pictureObject,
            updatePicture: updateValue
          }
        }
    }

    const { navigation, route } = props;
    const { gift } = route.params;

    [update, setUpdate] = useState(false);

    [giftName, setGiftName] = useState(gift.giftName);
    [price, setPrice] = useState(gift.price);
    [from, setFrom] = useState(gift.from);
    [detail, setDetail] = useState(gift.detail);

    const clearInputs = () => {
        let updatePicture;
        if (newPicture) {
            updatePicture = giftPicture;
        }
        else {
            updatePicture = gift.picture;
        }
        const newGift = {
            giftName: giftName,
            price: price,
            picture: updatePicture,
            from: from,
            detail: detail,
        }
        setGiftName('');
        setPrice('');
        dispatch(savePicture({}, false));
        return newGift;
    }

    useEffect(() => {
        if (gift.key === -1) {
          setUpdate(false);
        }
        else {
          setUpdate(true);
        }
        console.log(giftPicture);
      }, []);

    const addGift = () => {
        const newGift = clearInputs();
        const addAction = { type: actionTypes.ADD_GIFT, payload: { newGift: newGift, userid: userID }};
        navigation.navigate('Gifts');
        saveAndDispatch(addAction, dispatch);
    }

    const updateGift = () => {
        const newGift = clearInputs();
        const updateAction = { type: actionTypes.UPDATE_GIFT, payload: { key: gift.key, newGift: newGift, userid: userID }}
        navigation.navigate('Gifts');
        saveAndDispatch(updateAction, dispatch);
    }

    return(
        <KeyboardAwareScrollView>
        <View style={styles.container}>
            <View style={styles.detailHeaderContainer}>
                <BackButton navigation={navigation}/>
            </View>
            <Text style={styles.detailHeader}>{update ? 'Update Gift' : 'Add Gift'}</Text>
            {newPicture ?
                <View style={styles.inputPair}>
                    <TouchableOpacity
                    onPress={()=> dispatch(savePicture({}, false))}
                    style={styles.emojiButton}
                ><Ionicons name="close-outline" size={40} color="red" /></TouchableOpacity>
                
                <Image
                style={styles.detailPicture}
                source={giftPicture}
                />
                </View>
                
              
                 : <View>
                 {update ? 
                    <Image
                    style={styles.detailPicture}
                    source={gift.picture}
                    /> : <></>}
                </View>
            }
            <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={()=>{navigation.navigate('Camera')}}
                >
                 <Ionicons name="camera-sharp" size={24} color="black" />
                 <Text>Take New Photo</Text>
                </TouchableOpacity>
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

            <View style={styles.inputPair}>
                <Text style={styles.inputLabel}>From:</Text>
                <TextInput
                    style={styles.inputText}
                    value={from}
                    onChangeText={(text)=>setFrom(text)}/>
            </View>
            <Text style={styles.fullInputLabel}>Description:</Text>
                <TextInput
                    style={styles.fullInputText}
                    value={detail}
                    onChangeText={(text)=>setDetail(text)}/>

                <TouchableOpacity
                    onPress={()=>{
                    if (!update) {
                        addGift();
                    } else {
                        updateGift();
                    }
                    }}
                    style={styles.confirmButton}
                ><Text style={styles.confirmText}>{update ? 'Update' : 'Save'}</Text></TouchableOpacity>

        </View>
        </KeyboardAwareScrollView>
    );
}

export default GiftAdd;