import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, getDoc,
         doc, addDoc, updateDoc, deleteDoc, query, where, orderBy, onSnapshot } 
         from 'firebase/firestore';
import { firebaseConfig } from '../Secrets';
import { actionTypes } from './Reducer';
import { getAuth } from 'firebase/auth';

////////////
//FIREBASE//
////////////
let firebaseApp, db = undefined;
const GIFT_LIST_COLLNAME = 'giftLists';
const FRIEND_COLLNAME = 'friends';
const GIFT_COLLNAME = 'gifts';
const USER_COLLNAME = 'users';
const FRIEND_GIFT_COLLNAME = 'friendGifts';


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

db = getFirestore(getFBApp());

const getFBAuth = () => { return getAuth(getFBApp());}

////////
//USER//
////////
const createUser = async(action, dispatch) => {
    const { payload } = action;
    const { userId, displayName } = payload;
    console.log(displayName);
    await setDoc(doc(collection(db, USER_COLLNAME), userId), {
      displayName: displayName,
    });
  }
const loadUser = async(action, dispatch) => {
    const { payload } = action;
    const { userId } = payload;
    console.log(userId);
    const userInfo = await getDoc(doc(collection(db, USER_COLLNAME), userId));
    const user = userInfo.data();
    const displayName = user.displayName;
    console.log(displayName);
    let newAction = {
        ...action, 
        payload: { displayName }
    }
    dispatch(newAction);
  }

////////
//GIFTS//
////////
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
const addGiftAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { newGift, userid } = payload;
    const coll = collection(db, USER_COLLNAME, userid, GIFT_COLLNAME);
    const newDocRef = await addDoc(coll, {
        giftName: newGift.giftName,
        price: newGift.price,
        picture: newGift.picture,
    });
    payload.key = newDocRef.id;
    dispatch({
        ...action,
        payload: payload,
    });
}
const updateGiftAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { newGift, key, userid } = payload;
    const giftRef = doc(collection(db, USER_COLLNAME, userid, GIFT_COLLNAME), key);
    await updateDoc(giftRef, {
        giftName: newGift.giftName,
        price: newGift.price,
        picture: newGift.picture,
    });
    dispatch(action);
}
const deleteGiftAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { key, userid } = payload;
    const docToDelete = doc(collection(db, USER_COLLNAME, userid, GIFT_COLLNAME), key);
    await deleteDoc(docToDelete);
    dispatch(action);
}

//////////////
//GIFT LISTS//
//////////////
const loadGiftListAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { userid } = payload;
    const querySnap = await getDocs(collection(db, USER_COLLNAME, userid, GIFT_LIST_COLLNAME));
    let newGiftList = [];
    querySnap.forEach(docSnap=>{
        let newList = docSnap.data();
        newList.key = docSnap.id;
        newGiftList.push(newList);
    });
    let newAction = {
        ...action,
        payload: { newGiftList },
    };
    dispatch(newAction);
}
const addGiftListAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { newList , userid } = payload;
    const coll = collection(db, USER_COLLNAME, userid, GIFT_LIST_COLLNAME);
    const newDocRef = await addDoc(coll, {
        listName: newList.listName,
        dueDate: newList.dueDate,
        emoji: newList.emoji,
    });
    payload.key = newDocRef.id;
    dispatch({
        ...action,
        payload: payload,
    });
}
const updateGiftListAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { newList, key, userid } = payload;
    const giftRef = doc(collection(db, USER_COLLNAME, userid, GIFT_LIST_COLLNAME), key);
    await updateDoc(giftRef, {
        listName: newList.listName,
        dueDate: newList.dueDate,
        emoji: newList.emoji,
    });
    dispatch(action);
}
const deleteGiftListAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { key, userid } = payload;
    const docToDelete = doc(collection(db, USER_COLLNAME, userid, GIFT_LIST_COLLNAME), key);
    await deleteDoc(docToDelete);
    dispatch(action);
}

///////////////////
//GIFT FOR FRIEND//
///////////////////
const loadFriendGiftListAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const {userid, listid } = payload;
    const querySnap = await getDocs(collection(db, USER_COLLNAME, userid, GIFT_LIST_COLLNAME, listid, FRIEND_GIFT_COLLNAME));
    let newFriendGifts = [];
    querySnap.forEach(docSnap=>{
        let newFriendGift = docSnap.data();
        newFriendGift.key = docSnap.id;
        newFriendGifts.push(newFriendGift);
    });
    let newAction = {
        ...action,
        payload: { newFriendGifts },
    }
    dispatch(newAction);
}

const addFriendGiftListAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { newFriendGifts , key, userid, listid } = payload;
    console.log('db ' + newFriendGifts);
    const giftRef = doc(collection(db, USER_COLLNAME, userid, GIFT_LIST_COLLNAME, listid, FRIEND_GIFT_COLLNAME), key);
    await setDoc(giftRef, {
        firstName: newFriendGifts.firstName,
        lastName: newFriendGifts.lastName,
        gifts: newFriendGifts.gifts,
    });
    dispatch({
        ...action,
        payload: payload,
    });
}

const updateFriendGiftListAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { newFriendGifts, key, userid, listid } = payload;
    console.log(key);
    const giftRef = doc(collection(db, USER_COLLNAME, userid, GIFT_LIST_COLLNAME, listid, FRIEND_GIFT_COLLNAME), key);
    await updateDoc(giftRef, {
        firstName: newFriendGifts.firstName,
        lastName: newFriendGifts.lastName,
        gifts: newFriendGifts.gifts,
    });
    dispatch(action);
}

const deleteFriendGiftListAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { key, userid, listid } = payload;
    const docToDelete = doc(collection(db, USER_COLLNAME, userid, GIFT_LIST_COLLNAME, listid, FRIEND_GIFT_COLLNAME), key);
    await deleteDoc(docToDelete);
    dispatch(action);
}

///////////
//FRIENDS//
///////////
const loadFriendAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { userid } = payload;
    const querySnap = await getDocs(collection(db, USER_COLLNAME, userid, FRIEND_COLLNAME));
    let newFriends = [];
    querySnap.forEach(docSnap=>{
        let newFriend = docSnap.data();
        newFriend.key = docSnap.id;
        newFriends.push(newFriend);
    });
    let newAction = {
        ...action,
        payload: { newFriends },
    };
    dispatch(newAction);
}
const addFriendAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { newFriend , userid } = payload;
    const coll = collection(db, USER_COLLNAME, userid, FRIEND_COLLNAME);
    const newDocRef = await addDoc(coll, {
        firstName: newFriend.firstName,
        lastName: newFriend.lastName,
        birthDate: newFriend.birthDate,
        interests: newFriend.interests,
        giftIdeas: newFriend.giftIdeas,
    });
    payload.key = newDocRef.id;
    dispatch({
        ...action,
        payload: payload,
    });
}
const updateFriendAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { newFriend, key, userid } = payload;
    const friendRef = doc(collection(db, USER_COLLNAME, userid, FRIEND_COLLNAME), key);
    await updateDoc(friendRef, {
        firstName: newFriend.firstName,
        lastName: newFriend.lastName,
        birthDate: newFriend.birthDate,
        interests: newFriend.interests,
        giftIdeas: newFriend.giftIdeas,
    });
    dispatch(action);
}
const deleteFriendAndDispatch = async (action, dispatch) => {
    const { payload } = action;
    const { key, userid } = payload;
    const docToDelete = doc(collection(db, USER_COLLNAME, userid, FRIEND_COLLNAME), key);
    await deleteDoc(docToDelete);
    dispatch(action);
}

const subscribeToFriends = (userid, listid) => {
    if (activeListUnsubscribe) {
        activeListUnsubscribe();
    }
    const q = query(
      collection(db, USER_COLLNAME, userid, GIFT_LIST_COLLNAME, listid, FRIEND_GIFT_COLLNAME),
      orderBy('lastName', 'desc'),
    );
    const activeListUnsubscribe = onSnapshot(q, mbSnapshot => {
      const newFriends = [];
      mbSnapshot.forEach(mSnap => {
        let newFriend = mSnap.data();
        newFriend.key = mSnap.id;
        newFriends.push(newFriend);
      });
    return newFriends;
    }
  )};

/////////////////////
//SAVE AND DISPATCH//
/////////////////////
const saveAndDispatch = async(action, dispatch) => {

    const {type, payload} = action;
    switch (type) {
        case actionTypes.CREATE_USER:
            createUser(action, dispatch);
            return;
        case actionTypes.LOAD_USER:
            loadUser(action, dispatch);
            return;

        case actionTypes.LOAD_GIFT:
            loadGiftsAndDispatch(action, dispatch);
            return;
        case actionTypes.ADD_GIFT:
            addGiftAndDispatch(action, dispatch);
            return;
        case actionTypes.UPDATE_GIFT:
            updateGiftAndDispatch(action, dispatch);
            return;
        case actionTypes.DELETE_GIFT:
            deleteGiftAndDispatch(action, dispatch);
            return; 

        case actionTypes.LOAD_GIFT_LIST:
            loadGiftListAndDispatch(action, dispatch);
            return;
        case actionTypes.ADD_GIFT_LIST:
            addGiftListAndDispatch(action, dispatch);
            return;
        case actionTypes.UPDATE_GIFT_LIST:
            updateGiftListAndDispatch(action, dispatch);
            return;
        case actionTypes.DELETE_GIFT_LIST: 
            deleteGiftListAndDispatch(action, dispatch);
            return;

        case actionTypes.LOAD_FRIEND_GIFT_LIST:
            loadFriendGiftListAndDispatch(action, dispatch);
            return;
        case actionTypes.ADD_FRIEND_GIFT_LIST:
            addFriendGiftListAndDispatch(action, dispatch);
            return;
        case actionTypes.UPDATE_FRIEND_GIFT_LIST:
            updateFriendGiftListAndDispatch(action, dispatch);
            return;
        case actionTypes.DELETE_FRIEND_GIFT_LIST: 
            deleteFriendGiftListAndDispatch(action, dispatch);
            return;
        
        case actionTypes.LOAD_FRIEND:
            loadFriendAndDispatch(action, dispatch);
            return;
        case actionTypes.ADD_FRIEND:
            addFriendAndDispatch(action, dispatch);
            return;
        case actionTypes.UPDATE_FRIEND:
            updateFriendAndDispatch(action, dispatch);
            return;
        case actionTypes.DELETE_FRIEND:
            deleteFriendAndDispatch(action, dispatch);
            return;

        default:
            return;     
    }
}
    
export { saveAndDispatch, getFBApp, getFBAuth, subscribeToFriends };