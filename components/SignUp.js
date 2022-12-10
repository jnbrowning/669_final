import styles from '../styles';
import { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { getFBAuth, saveAndDispatch } from '../data/DB';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser, createUser } from '../data/Actions';

const SignUp = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
  
    return (
      <View style={styles.logInContainer}>
        <Text style={styles.logInHeader}></Text>

        <Text style={styles.logInLabel}>Display Name: </Text>
        <TextInput 
          style={styles.logInInput}
          placeholder='enter display name' 
          autoCapitalize='none'
          spellCheck={false}
          onChangeText={text=>setDisplayName(text)}
          value={displayName}/>
  
        <Text style={styles.logInLabel}>Email: </Text>
        <TextInput 
          style={styles.logInInput}
          placeholder='enter email address' 
          autoCapitalize='none'
          spellCheck={false}
          onChangeText={text=>setEmail(text)}
          value={email}/>
  
        <Text style={styles.logInLabel}>Password: </Text>
        <TextInput 
          style={styles.logInInput}
          placeholder='enter password' 
          autoCapitalize='none'
          spellCheck={false}
          secureTextEntry={true}
          onChangeText={text=>setPassword(text)}
          value={password}/>
  
        <TouchableOpacity
          style={styles.logInButton}
          onPress={async () => {
            try {
              const userCred = await createUserWithEmailAndPassword(getFBAuth(), email, password);
              await saveAndDispatch(createUser(userCred.user.uid, displayName), dispatch);
              setEmail('');
              setPassword('');
              setDisplayName('');
              try {
                const currUser = await signInWithEmailAndPassword(getFBAuth(), email, password);
                setEmail('');
                setPassword('');
                await dispatch(setUser(currUser.user.uid))
                } catch(error) {
                Alert.alert("Sign Up Error", error.message,[{ text: "OK" }])
                }
            } catch(error) {
              Alert.alert("Sign Up Error", error.message,[{ text: "OK" }])
            }
          }}>
          <Text style={styles.logInButtonText}>Sign Up</Text>
        </TouchableOpacity>  
      </View>
    );
  }

  export default SignUp;