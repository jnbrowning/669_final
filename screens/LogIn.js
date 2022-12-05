import styles from '../styles';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { actionTypes } from '../data/Reducer';
import { getFBAuth, saveAndDispatch } from '../data/DB';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
  } from 'firebase/auth';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';

 //Get FireBase Authentication
function SignIn () {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <View style={styles.listContainer}>
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
    <View style={styles.listContainer}>
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
            const createUser = { type: actionTypes.CREATE_USER, payload: { 
                userId: userCred.user.uid,
                displayName: displayName
            }};
            setDisplayName('');
            await saveAndDispatch(createUser, dispatch);
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

    const goToUser = async (user) => {
      dispatch({
        type: actionTypes.SET_USER,
        payload: {
          userid: user.uid
        }
      })
      const loadUser = { type: actionTypes.LOAD_USER, payload: {userId: user.uid} };
      await saveAndDispatch(loadUser, dispatch);
      navigation.navigate('User'); 
    }

    useEffect(() => {
      onAuthStateChanged(getFBAuth(), user => {
        if (user) {
          goToUser(user);
    
        } else {
          setLoginMode(true);
          navigation.navigate('LogIn');
        }
      })
    }, []);

    return (
      <KeyboardAwareScrollView>
      <View style={styles.container}>
          <Text style={styles.appName}>Gift Tracker</Text>
          <FontAwesome5 name="gifts" size={125} color="#492C7A" />
          {loginMode?<SignIn/>:<SignUp/>}
          <View>
            { loginMode ? 
            <Text style={styles.logInText}>New user? 
              <Text
              onPress={()=>{setLoginMode(!loginMode)}} 
              style={{color: '#86AD3D'}}> Sign up </Text> 
              instead!
            </Text>
            :
            <Text style={styles.logInText}>Returning user? 
              <Text 
              onPress={()=>{setLoginMode(!loginMode)}} 
              style={{color: '#86AD3D'}}> Sign in </Text> 
              instead!
            </Text>
            }
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
}

export default LogIn;