import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { getFBAuth } from '../data/DB';
import { signOut } from 'firebase/auth';
import { actionTypes } from '../data/Reducer';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

const Header = (props) => {

    const userName = useSelector((state)=>state.userName);
    const { headerTitle, navigation } = props;
    
    const dispatch = useDispatch();

    return (
    <View style={styles.headerContainer}>
                <TouchableOpacity 
                    style={styles.signOutButton}
                    onPress={async () => {
                        dispatch({ type: actionTypes.CLEAR_DATA });
                        navigation.popToTop();
                        await signOut(getFBAuth());}}>
                        <Ionicons name="log-out-outline" size={24} color="white" />            
                    </TouchableOpacity>
                <Text style={styles.header}>{userName}'s {headerTitle}</Text>
                </View>
    )
}

export default Header;