import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { getFBAuth } from '../data/DB';
import { signOut } from 'firebase/auth';

const GiftLists = () => {
    return(
        <View style={styles.container}>
            <Text>Gift Lists</Text>
            <TouchableOpacity  
            onPress={async () => {
                await signOut(getFBAuth());
            }}
      >
        <Text>Now sign out!</Text>
      </TouchableOpacity>
        </View>
    );
}

export default GiftLists;