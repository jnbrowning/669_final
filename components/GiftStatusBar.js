import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

//Status bar component for gift list to show whether gift is 
//"idea, bought, wrapped, shipped, done"
//style updates based on how far status is
const GiftStatusBar = (props) => {

    const { giftStatus, disabled } = props;

    return (
        <View style={styles.statusBundle}>
            <TouchableOpacity 
            disabled={disabled} 
            style={styles.activeStatusButton} 
            onPress={()=>setGiftStatus(0)}>
                <Text style={styles.statusText}>Idea</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            disabled={disabled} 
            style={(giftStatus > 0) ? styles.activeStatusButton: styles.statusButton} 
            onPress={()=>setGiftStatus(1)}>
                <Text style={styles.statusText}>Bought</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            disabled={disabled} 
            style={(giftStatus > 1) ? styles.activeStatusButton: styles.statusButton} 
            onPress={()=>setGiftStatus(2)}>
                <Text style={styles.statusText}>Wrapped</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            disabled={disabled} 
            style={(giftStatus > 2) ? styles.activeStatusButton: styles.statusButton} 
            onPress={()=>setGiftStatus(3)}>
                <Text style={styles.statusText}>Shipped</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            disabled={disabled} 
            style={(giftStatus > 3) ? styles.activeStatusButton: styles.statusButton} 
            onPress={()=>setGiftStatus(4)}>
                <Text style={styles.statusText}>Done</Text>
            </TouchableOpacity>
        </View>

    )
}

export default GiftStatusBar;