import styles from '../styles';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getFBAuth, saveAndDispatch } from '../data/DB';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { onAuthStateChanged } from 'firebase/auth';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { setUser, loadUser } from '../data/Actions';

function LogIn ({navigation}) {
    const dispatch = useDispatch();
    const [loginMode, setLoginMode] = useState(true);

    const goToUser = async (user) => {
      dispatch(setUser(user.uid));
      await saveAndDispatch(loadUser(user.uid), dispatch);
      navigation.navigate('User'); 
    }

    useEffect(() => {
      onAuthStateChanged(getFBAuth(), user => {
        if (user) { goToUser(user);} 
        else {
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