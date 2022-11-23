import styles from '../styles';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../data/Reducer';
import { getFBAuth, saveAndDispatch } from '../data/DB';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    updateProfile,
  } from 'firebase/auth';
import { CREATE_USER } from '../data/Reducer';

// import { createUser } from '../data/Actions';

 //Get FireBase Authentication
function SignIn () {
  const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    return (
      <View>
        <Text>Sign In</Text>
        <View style={styles.loginRow}>
          <View style={styles.loginLabelContainer}>
            <Text style={styles.loginLabelText}>Email: </Text>
          </View>
          <View style={styles.loginInputContainer}>
            <TextInput 
              style={styles.loginInputBox}
              placeholder='enter email address' 
              autoCapitalize='none'
              spellCheck={false}
              onChangeText={text=>setEmail(text)}
              value={email}
            />
          </View>
        </View>
        <View style={styles.loginRow}>
          <View style={styles.loginLabelContainer}>
            <Text style={styles.loginLabelText}>Password: </Text>
          </View>
          <View style={styles.loginInputContainer}>
            <TextInput 
              style={styles.loginInputBox}
              placeholder='enter password' 
              autoCapitalize='none'
              spellCheck={false}
              secureTextEntry={true}
              onChangeText={text=>setPassword(text)}
              value={password}
            />
          </View>
        </View>
        <View style={styles.loginRow}>
          <TouchableOpacity  
            onPress={async () => {
                try {
                const currUser = await signInWithEmailAndPassword(getFBAuth(), email, password);
                await dispatch({
                  type: SET_USER,
                  payload: {
                    userid: currUser.user.uid
                  }
                })
                } catch(error) {
                Alert.alert("Sign Up Error", error.message,[{ text: "OK" }])
                }
            }}
          >
            <Text>Sign In</Text>
          </TouchableOpacity>  
        </View>
      </View>
    );
}

function SignUp () {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginHeaderText}>Sign Up</Text>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Display Name: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter display name' 
            autoCapitalize='none'
            spellCheck={false}
            onChangeText={text=>setDisplayName(text)}
            value={displayName}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Email: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter email address' 
            autoCapitalize='none'
            spellCheck={false}
            onChangeText={text=>setEmail(text)}
            value={email}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Password: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter password' 
            autoCapitalize='none'
            spellCheck={false}
            secureTextEntry={true}
            onChangeText={text=>setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <TouchableOpacity
          onPress={async () => {
            try {
              const userCred = await createUserWithEmailAndPassword(getFBAuth(), email, password);
              await updateProfile(userCred.user, {displayName: displayName});
              const createUser = { type: CREATE_USER, payload: { 
                  userId: userCred.user.uid,
                  displayName: userCred.user.displayName
              }};
              await saveAndDispatch(createUser, dispatch);
              await dispatch({
                type: SET_USER,
                payload: {
                  userid: userCred.user.uid
                }
              })
            } catch(error) {
              Alert.alert("Sign Up Error", error.message,[{ text: "OK" }])
            }
          }}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>  
      </View>
    </View>
  );
}

function LogIn ({navigation}) {

    const dispatch = useDispatch();
    const [loginMode, setLoginMode] = useState(true);

    useEffect(() => {
      onAuthStateChanged(getFBAuth(), user => {
        if (user) {
          console.log('signed in! user:', user);
          dispatch({
            type: SET_USER,
            payload: {
              userid: user.uid
            }
          })
          navigation.navigate('User');
        } else {
          console.log('user is signed out!');
          navigation.navigate('LogIn');
        }
      })
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Log In</Text>
            <View style={styles.container}>
                <View style={styles.bodyContainer}> 
                    {loginMode?
                            <SignIn/>
                            :
                            <SignUp/>
                            }
                </View>
            </View>
            <View>
            { loginMode ? 
            <Text>New user? 
                <Text 
                onPress={()=>{setLoginMode(!loginMode)}} 
                style={{color: 'blue'}}> Sign up </Text> 
                instead!
            </Text>
            :
            <Text>Returning user? 
                <Text 
                onPress={()=>{setLoginMode(!loginMode)}} 
                style={{color: 'blue'}}> Sign in </Text> 
                instead!
            </Text>
            }
        </View>
        </View>
    )
}

export default LogIn;