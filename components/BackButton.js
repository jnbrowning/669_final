import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

const BackButton = (props) => {

    const { navigation } = props;

    return (
        <TouchableOpacity
        onPress={()=>{navigation.goBack()}}
        style={styles.backButton}>
            <Ionicons name="md-chevron-back" size={16} color="#863A6F" /> 
            <Text style={{color: "#863A6F"}}>back</Text>
        </TouchableOpacity>
    )
} 
export default BackButton;