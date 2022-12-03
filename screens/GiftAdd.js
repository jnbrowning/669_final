import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import styles from '../styles';
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from '../data/Reducer';
import { saveAndDispatch } from '../data/DB';
import { useState, useEffect } from 'react';
import { Icon } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons'; 

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
        <View style={styles.container}>
            <View style={styles.headerButton}>
                <TouchableOpacity
                    onPress={()=>{
                        dispatch(savePicture({}, false));
                        navigation.navigate('Gifts');}}
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
            {newPicture ?
                <View style={styles.inputPair}>
                    <TouchableOpacity
                onPress={()=> dispatch(savePicture({}, false))}
                >
                    <Icon 
                                name="trash"
                                type="font-awesome"
                                size={30}
                            />
                </TouchableOpacity>
                <Image
                style={styles.addPicture}
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

            <View style={styles.inputPair}>
                <Text style={styles.inputLabel}>Description:</Text>
                <TextInput
                    style={styles.inputText}
                    value={detail}
                    onChangeText={(text)=>setDetail(text)}/>
            </View>
        </View>
    );
}

export default GiftAdd;