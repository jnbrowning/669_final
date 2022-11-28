import { Button } from '@rneui/themed';
import { View, Text,  TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Camera, CameraType } from 'expo-camera';
import { actionTypes } from '../data/Reducer';
import { Feather } from '@expo/vector-icons'; 
import styles from '../styles';


const CameraScreen = (props) => {

  const { navigation } = props;

    //request camera permission from phone 
    const [hasPermission, setHasPermission] = useState(null);

    async function getPermissions(){
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    }

    const dispatch = useDispatch();

    const savePicture = (pictureObject, updateValue) => {
      return {
        type: actionTypes.PREVIEW_PICTURE,
        payload: {
          picture: pictureObject,
          updatePicture: updateValue
        }
      }
    }

    useEffect(()=>{
        getPermissions();
      }, []);

    let theCamera = undefined;


    return (
        <View style={styles.cameraScreen}>
            <TouchableOpacity 
            style={styles.headerButton}
            onPress={async () => {
              dispatch(savePicture({}, false));
              navigation.goBack();
            }}
          >
            <Text style={{color: 'white', marginTop: '5%', fontSize: '16'}}>Cancel</Text>
          </TouchableOpacity>
          <View style={styles.cameraContainer}>
            {hasPermission ? 
              <Camera 
                style={styles.camera}
                ratio='4:3'
                pictureSize='Medium'
                type={CameraType.back}
                ref={ref => theCamera = ref}
              />
            :
              <Text>Can't access camera--check permissions?</Text>
            }
          </View>
          <TouchableOpacity
            style={styles.takePicture}
            onPress={async () => {
              let pictureObject = await theCamera.takePictureAsync({quality: 0.1});
              dispatch(savePicture(pictureObject, true));
              navigation.goBack();
            }}
          >
            <Feather name="circle" size={85} color="white" />
          </TouchableOpacity>
        </View>
      );
    
}



export default CameraScreen;