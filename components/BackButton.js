import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

const BackButton = (props) => {

    const { navigation } = props;

    return (
        <TouchableOpacity
        onPress={()=>{navigation.goBack()}}
        style={styles.backButton}>
            <Ionicons name="md-chevron-back" size={16} color="#492C7A" /> 
            <Text style={{color: "#492C7A"}}>back</Text>
        </TouchableOpacity>
    )
} 
export default BackButton;