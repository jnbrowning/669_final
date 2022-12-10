import { actionTypes } from '../data/Reducer';

const clearData = () => {
    return { type: actionTypes.CLEAR_DATA }
}

/////////
//USERS//
/////////
const setUser = (userID) => {
    return {
        type: actionTypes.SET_USER,
        payload: {
          userid: userID
        }
}};
const loadUser = (userID) => {
    return { 
        type: actionTypes.LOAD_USER, 
        payload: {
            userId: userID
        } 
}};
const createUser = (userID, displayName) => {
    return { 
        type: actionTypes.CREATE_USER, 
        payload: { 
            userId: userID,
            displayName: displayName
        }
}};

//////////////
//GIFT LISTS//
//////////////
const loadGiftList = (userID) => {
    return { 
        type: actionTypes.LOAD_GIFT_LIST, 
        payload: {
            userid: userID
        } 
}};
const addGiftList = (addList, userID) => {
    return { 
        type: actionTypes.ADD_GIFT_LIST, 
        payload: { 
            newList: addList, 
            userid: userID 
        }
}};
const updateGiftList = (key, newGiftList, userID) => {
    return { 
        type: actionTypes.UPDATE_GIFT_LIST,
        payload: { 
            key: key, 
            newList: newGiftList, 
            userid: userID }
}}
const deleteGiftList = (userID, key) => {
    return {
        type: actionTypes.DELETE_GIFT_LIST, 
        payload: {
            key: key,
            userid: userID,
        }
}}

///////////
//FRIENDS//
///////////
const loadFriends = (userID) => {
    return { 
        type: actionTypes.LOAD_FRIEND, 
        payload: {
            userid: userID
        } 
}};
const addFriend = (newFriend, userID) => {
    return { 
        type: actionTypes.ADD_FRIEND, 
        payload: { 
            newFriend: newFriend, 
            userid: userID 
        }
}};
const updateFriend = (key, newFriends, userID) => {
    return { 
        type: actionTypes.UPDATE_FRIEND, 
        payload: { 
            key: key, 
            newFriend: newFriends, 
            userid: userID 
        }
}}
const deleteFriend = (item, userID) => {
    return {
        type: actionTypes.DELETE_FRIEND, 
        payload: {
            key: item.key,
            userid: userID,
        }
}};

/////////
//GIFTS//
/////////
const loadGifts = (userID) => {
    return { 
        type: actionTypes.LOAD_GIFT, 
        payload: {
            userid: userID
        } 
}};
const addGifts = (newGift, userID) => {
    return { 
        type: actionTypes.ADD_GIFT, 
        payload: { 
            newGift: newGift, 
            userid: userID 
        }
}};
const updateGifts = (key, newGift, userID) => {
    return { 
        type: actionTypes.UPDATE_GIFT, 
        payload: { 
            key: key, 
            newGift: newGift, 
            userid: userID 
        }
}}
const deleteGift = (item, userID) => {
    return {
        type: actionTypes.DELETE_GIFT, 
        payload: {
            key: item.key,
            userid: userID,
        }
}};

///////////////////
//GIFT FOR FRIEND//
///////////////////
const loadFriendGifts = (userID, key) => {
    return { 
        type: actionTypes.LOAD_FRIEND_GIFT_LIST, 
        payload: {
            userid: userID, 
            listid: key
        }
}}
const addFriendGifts = (newFriendGift, key, userID, list) => {
    return { 
        type: actionTypes.ADD_FRIEND_GIFT_LIST, 
        payload: { 
            newFriendGifts: newFriendGift, 
            key: key, 
            userid: userID, 
            listid: list
        }
}};

const updateFriendGifts = (key, updateFriend, userID, list) => {
    return { 
        type: actionTypes.UPDATE_FRIEND_GIFT_LIST, 
        payload: { 
            key: key, 
            newFriendGifts: updateFriend, 
            userid: userID, 
            listid: list
        }
}};

const deleteFriendGifts = (key, userID, list) => {
    return {
        type: actionTypes.DELETE_FRIEND_GIFT_LIST, 
        payload: {
            key: key,
            userid: userID,
            listid: list,
        }
    }
}

//////////
//CAMERA//
//////////
const savePicture = (pictureObject, updateValue) => {
    return {
      type: actionTypes.PREVIEW_PICTURE,
      payload: {
        picture: pictureObject,
        updatePicture: updateValue
      }
    }
  }

export {
    clearData,

    setUser,
    loadUser,
    createUser,

    loadGiftList,
    addGiftList,
    updateGiftList,
    deleteGiftList,

    loadFriends,
    addFriend,
    updateFriend,
    deleteFriend,

    loadGifts,
    addGifts,
    updateGifts,
    deleteGift,

    loadFriendGifts,
    addFriendGifts,
    updateFriendGifts,
    deleteFriendGifts,

    savePicture,
};