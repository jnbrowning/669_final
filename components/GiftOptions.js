import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../styles';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux'; 
import { Ionicons } from '@expo/vector-icons';

const GiftOptions = (props) => {

    const { selectGift } = props;

    const gifts = useSelector((state)=>state.giftItems);

    //filter all gifts to view only those in friends possible gift ideas
    const inGiftList = (obj) => {
        for (g of giftIdeas){if (g === obj) {return true;}}
        return false;
    }

    return (
    <View>
    <Text style={styles.overlayLabel}>Gift Ideas: </Text>
    <View style={styles.overlayInfo}>
    <FlatList 
    data={gifts}
    renderItem={({item})=>{
      return (
        <View>
          {inGiftList(item.key) ?  
          <View style={styles.addGiftPair}>
            <TouchableOpacity 
            style={styles.addGift}
            onPress={()=>{selectGift(item)}}>
              <Feather name="gift" size={20} color="black"/>
              <Ionicons name="add" size={12} color="black" />
              <Text style={styles.overlayGiftText}> {item.giftName}</Text> 
            </TouchableOpacity>   
            </View>
          : 
          <View/>}
        </View> 
      );}}
    />
    </View>
    </View>
    )
}

export default GiftOptions;