import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from '@rneui/themed';
import styles from '../styles';

const GiftDetail = (props) => {

    const { navigation, route } = props;
    const { gift } = route.params;

    return(
        <View style={styles.container}>
            <Image
            style={styles.detailPicture}
            source={gift.picture}
            />
            <Text style={styles.header}>{gift.giftName}</Text>
            
            <TouchableOpacity style={styles.editButton} 
                onPress={
                ()=>{
                    console.log(gift);
                    navigation.navigate('GiftAdd', {
                gift: gift
                });}}>
            <Text style={styles.editText}>Edit</Text>
            <Icon 
              style={styles.editText}
              name="pencil"
              type="font-awesome"
              color='grey'
              size={16}
            />
          </TouchableOpacity>
            <Text style={styles.detailText}>Price: {gift.price}</Text>
        </View>
    );
}

export default GiftDetail;