import styles from '../styles';
import { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { getFBAuth } from '../data/DB';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../data/Actions';

const SignIn = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
      <View style={styles.logInContainer}>
        <Text style={styles.logInHeader}></Text>

        <Text style={styles.logInLabel}>Email: </Text>
        <TextInput 
          style={styles.logInInput}
          placeholder='enter email address' 
          autoCapitalize='none'
          spellCheck={false}
          onChangeText={text=>setEmail(text)}
          value={email}
        />

        <Text style={styles.logInLabel}>Password: </Text>
        <TextInput 
          style={styles.logInInput}
          placeholder='enter password' 
          autoCapitalize='none'
          spellCheck={false}
          secureTextEntry={true}
          onChangeText={text=>setPassword(text)}
          value={password}
        />

        <TouchableOpacity  
          style={styles.logInButton}
          onPress={async () => {
            try {
            const currUser = await signInWithEmailAndPassword(getFBAuth(), email, password);
            setEmail('');
            setPassword('');
            await dispatch(setUser(currUser.user.uid))
            } catch(error) {
            Alert.alert("Sign Up Error", error.message,[{ text: "OK" }])
            }
          }}>
          <Text style={styles.logInButtonText}>Sign In</Text>
        </TouchableOpacity>  
      </View>
  
    );
  }

  export default SignIn;