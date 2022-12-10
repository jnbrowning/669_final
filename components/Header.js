import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { getFBAuth } from '../data/DB';
import { signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearData } from '../data/Actions';

const Header = (props) => {

    const dispatch = useDispatch();
    const { headerTitle, navigation } = props;
    const userName = useSelector((state)=>state.userName);

    return (
    <View style={styles.headerContainer}>
                <TouchableOpacity 
                    style={styles.signOutButton}
                    onPress={async () => {
                        dispatch(clearData());
                        navigation.popToTop();
                        await signOut(getFBAuth());}}>
                        <Ionicons name="log-out-outline" size={24} color="white" />            
                    </TouchableOpacity>
                <Text style={styles.header}>{userName + "'s " + headerTitle}</Text>
                </View>
    )
}

export default Header;