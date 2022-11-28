import styles from '../styles';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { actionTypes } from '../data/Reducer';
import { getFBAuth, saveAndDispatch } from '../data/DB';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    updateProfile,
  } from 'firebase/auth';
import { FontAwesome5 } from '@expo/vector-icons'; 

 //Get FireBase Authentication
function SignIn () {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <View style={styles.logInInfoContainer}>
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
          await dispatch({
            type: actionTypes.SET_USER,
            payload: {
              userid: currUser.user.uid,
            }
          })
          } catch(error) {
          Alert.alert("Sign Up Error", error.message,[{ text: "OK" }])
          }
        }}>
        <Text style={styles.logInButtonText}>Sign In</Text>
      </TouchableOpacity>  
    </View>
  );
}

function SignUp () {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  return (
    <View style={styles.logInInfoContainer}>
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
            setEmail('');
            setPassword('');
            await updateProfile(userCred.user, {displayName: displayName});
            const createUser = { type: actionTypes.CREATE_USER, payload: { 
                userId: userCred.user.uid,
                displayName: displayName
            }};
            setDisplayName('');
            await saveAndDispatch(createUser, dispatch);
            await dispatch({
              type: actionTypes.SET_USER,
              payload: {
                userid: userCred.user.uid,
              }
            })
          } catch(error) {
            Alert.alert("Sign Up Error", error.message,[{ text: "OK" }])
          }
        }}>
        <Text style={styles.logInButtonText}>Sign Up</Text>
      </TouchableOpacity>  
    </View>
  );
}

function LogIn ({navigation}) {
    const dispatch = useDispatch();
    const [loginMode, setLoginMode] = useState(true);

    useEffect(() => {
      onAuthStateChanged(getFBAuth(), user => {
        if (user) {
          dispatch({
            type: actionTypes.SET_USER,
            payload: {
              userid: user.uid
            }
          })
          navigation.navigate('User');
        } else {
          setLoginMode(true);
          navigation.navigate('LogIn');
        }
      })
    }, []);

    return (
      <View style={styles.container}>
        <View style={styles.logInContainer}>
          <Text style={styles.appName}>Gift Tracker</Text>
          <FontAwesome5 name="gifts" size={125} color="#863A6F" />
          {loginMode?<SignIn/>:<SignUp/>}
          <View>
            { loginMode ? 
            <Text style={styles.logInText}>New user? 
              <Text
              onPress={()=>{setLoginMode(!loginMode)}} 
              style={{color: '#863A6F'}}> Sign up </Text> 
              instead!
            </Text>
            :
            <Text style={styles.logInText}>Returning user? 
              <Text 
              onPress={()=>{setLoginMode(!loginMode)}} 
              style={{color: '#863A6F'}}> Sign in </Text> 
              instead!
            </Text>
            }
          </View>
        </View>
      </View>
    )
}

export default LogIn;