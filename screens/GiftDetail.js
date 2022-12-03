import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import BackButton from '../components/BackButton';

const GiftDetail = (props) => {

    const { navigation, route } = props;
    const { gift } = route.params;

    return(
        <View style={styles.container}> 
            <View style={styles.detailHeaderContainer}>
                <BackButton navigation={navigation}/>
                <Image
                style={styles.detailPicture}
                source={gift.picture}/>
                <Text style={styles.giftHeaderText}>{gift.giftName}</Text>
                <TouchableOpacity 
                style={styles.editButton} 
                onPress={()=>{navigation.navigate('GiftAdd', {gift: gift});}}>
                    <Text style={styles.editText}>Edit</Text>
                    <FontAwesome name="pencil" size={18} color="grey" />
                </TouchableOpacity>
            </View>
            <Text style={styles.detailLabel}><Ionicons name="pricetag-outline" size={18} color="black" />  Price: </Text>
            <Text style={styles.detailInfo}>{gift.price}</Text>
            <Text style={styles.detailLabel}><Ionicons name="ios-location-outline" size={18} color="black" />  From: </Text>
            <Text style={styles.detailInfo}>{gift.from}</Text>
            <Text style={styles.detailLabel}><Ionicons name="ios-document-text-outline" size={18} color="black" />  Decription: </Text>
            <Text style={styles.detailInfo}>{gift.detail}</Text>
        </View>
    );
}

export default GiftDetail;