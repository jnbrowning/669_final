import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc,
         doc, addDoc, updateDoc, deleteDoc, query, where, orderBy } 
         from 'firebase/firestore';
import { firebaseConfig } from '../Secrets';
import { LOAD_GIFT, ADD_GIFT, UPDATE_GIFT, DELETE_GIFT, CREATE_USER } from './Reducer';
import { getAuth } from 'firebase/auth';

let firebaseApp, db = undefined;
const GIFT_LIST_COLLNAME = 'giftLists';
const FRIEND_COLLNAME = 'friends';
const GIFT_COLLNAME = 'gifts';
const USER_COLLNAME = 'users';

// Firebase App Load
const getFBApp = () => {
    if (!firebaseApp) {
      if (getApps() == 0) {
        firebaseApp = initializeApp(firebaseConfig);
      } else {
        firebaseApp = getApps()[0];
      }
    }
    return firebaseApp;
}

//Get Database from Firestore App
db = getFirestore(getFBApp());

const getFBAuth = () => {
    return getAuth(getFBApp());
}

//Create User
const createUser = async(action, dispatch) => {
    const { userId, displayName } = action.payload;
    await setDoc(doc(collection(db, USER_COLLNAME), userId), {
      displayName: displayName,
    });
  }

//Load Gift Data
const loadGiftsAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { userid } = payload;
    const querySnap = await getDocs(collection(db, USER_COLLNAME, userid, GIFT_COLLNAME));
    let newGifts = [];
    querySnap.forEach(docSnap=>{
        let newGift = docSnap.data();
        newGift.key = docSnap.id;
        newGifts.push(newGift);
    });
    let newAction = {
        ...action,
        payload: { newGifts },
    };
    dispatch(newAction);
}
  
//Add Gift
const addGiftAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { newGift, userid } = payload;
    const coll = collection(db, USER_COLLNAME, userid, GIFT_COLLNAME);
    const newDocRef = await addDoc(coll, {
        giftName: newGift.giftName,
        price: newGift.price,
    });
    payload.key = newDocRef.id;
    dispatch({
        ...action,
        payload: payload,
    });
}

//Update Gift
const updateGiftAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { newGift, key, userid } = payload;
    const giftRef = doc(collection(db, USER_COLLNAME, userid, GIFT_COLLNAME), key);
    await updateDoc(giftRef, {
        giftName: newGift.giftName,
        price: newGift.price,
    });
    dispatch(action);
}

//Delete Gift
const deleteGiftAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { key, userid } = payload;
    const docToDelete = doc(collection(db, USER_COLLNAME, userid, GIFT_COLLNAME), key);
    await deleteDoc(docToDelete);
    dispatch(action);
}
  
const saveAndDispatch = async(action, dispatch) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_USER:
            createUser(action, dispatch);
            return;
        case LOAD_GIFT:
            loadGiftsAndDispatch(action, dispatch);
            return;
        case ADD_GIFT:
            addGiftAndDispatch(action, dispatch);
            return;
        case UPDATE_GIFT:
            updateGiftAndDispatch(action, dispatch);
            return;
        case DELETE_GIFT:
            deleteGiftAndDispatch(action, dispatch);
            return; 
        default:
            return;     
    }
}
    
export { saveAndDispatch, getFBApp, getFBAuth };