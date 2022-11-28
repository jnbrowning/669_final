import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import styles from '../styles';

const GiftListDetail = (props) => {

    const { navigation, route } = props;
    const { list } = route.params;

    return(
        <View style={styles.container}>
            <Text style={styles.emojiHeader}>{list.emoji}</Text>
            <Text style={styles.header}>{list.listName}</Text>
            <TouchableOpacity style={styles.editButton} 
                onPress={
                ()=>{
                navigation.navigate('GiftListAdd', {
                list: list
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
            <Text style={styles.detailText}>Due Date: {list.dueDate}</Text>
        </View>
    );
}

export default GiftListDetail;