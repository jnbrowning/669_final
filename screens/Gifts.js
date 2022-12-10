import { View, FlatList } from 'react-native';
import styles from '../styles';
import { useSelector, useDispatch } from "react-redux";
import { saveAndDispatch } from '../data/DB';
import { useEffect } from 'react';
import Header from '../components/Header';
import BigAddButton from '../components/BigAddButton';
import GiftItem from '../components/GiftItem';
import { loadGifts } from '../data/Actions';

const Gifts = ({navigation}) => {

    const giftItems = useSelector((state)=>state.giftItems);
    const userID = useSelector((state)=>state.userID);
    const dispatch = useDispatch();

    useEffect(() => {
        saveAndDispatch(loadGifts(userID), dispatch);
    }, [ userID ]);

    addGift = () => {
        navigation.navigate('GiftAdd', {
            gift: {
                key: -1,
                giftName: '',
                price: '',
                from: '',
                detail: '',
            }
        })
    }

    return(
        <View style={styles.container}>
            <Header headerTitle={'Gift Ideas'} navigation={navigation}/>
            <View style={styles.listContainer}>
            <FlatList
            data={giftItems}
            renderItem={({item})=>{
                return (
                    <GiftItem giftItem={item} navigation={navigation}/>
                );}}/>
                </View>
            <BigAddButton addFunction={addGift}/>
        </View>
    );
}

export default Gifts;