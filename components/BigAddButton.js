import { TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';

const BigAddButton = (props) => {

    const { addFunction } = props 

    return (
        <View style={styles.addButtonContainer}>
        <TouchableOpacity 
        style={styles.mainAddButton}
        onPress={addFunction}>
            <Ionicons style={styles.mainAddButtonText} name="add-outline" size={36} />
         </TouchableOpacity>
         </View>
    )
}

export default BigAddButton;