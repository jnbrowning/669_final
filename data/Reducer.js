////////////////
//ACTION TYPES//
////////////////
const actionTypes = {
  CREATE_USER: 'CREATE_USER',
  SET_USER: 'SET_USER',
  LOAD_USER: 'LOAD_USER',

  LOAD_GIFT: 'LOAD_GIFT',
  ADD_GIFT: 'ADD_GIFT',
  UPDATE_GIFT: 'UPDATE_GIFT',
  DELETE_GIFT: 'DELETE_GIFT',

  LOAD_GIFT_LIST: 'LOAD_GIFT_LIST',
  ADD_GIFT_LIST: 'ADD_GIFT_LIST',
  UPDATE_GIFT_LIST: 'UPDATE_GIFT_LIST',
  DELETE_GIFT_LIST: 'DELETE_GIFT_LIST',

  LOAD_FRIEND_GIFT_LIST: 'LOAD_FRIEND_GIFT_LIST',
  ADD_FRIEND_GIFT_LIST: 'ADD_FRIEND_GIFT_LIST',
  UPDATE_FRIEND_GIFT_LIST: 'UPDATE_FRIEND_GIFT_LIST',
  DELETE_FRIEND_GIFT_LIST: 'DELETE_FRIEND_GIFT_LIST',

  LOAD_FRIEND: 'LOAD_FRIEND',
  ADD_FRIEND: 'ADD_FRIEND',
  UPDATE_FRIEND: 'UPDATE_FRIEND',
  DELETE_FRIEND: 'DELETE_FRIEND',

  PREVIEW_PICTURE: 'PREVIEW_PICTURE',

  CLEAR_DATA: 'CLEAR_DATA',
}

/////////
//STATE//
/////////
const initialState = {
  giftListItems: [],
  giftItems: [],
  friendItems: [],
  userID: '',
  userName: '',
  previewPicture: {},
  updatePicture: false,
  friendGifts: [],
}

/////////
//STATE//
/////////
const clearData = (state) => {
  return {
    ...state,
    giftListItems: [],
    giftItems: [],
    friendItems: [],
    userID: '',
    userName: '',
    previewPicture: {},
    updatePicture: false,
  }
}

/////////
//USERS//
/////////
const loadUser = (state, displayName) => {
  return {
    ...state,
    userName: displayName,
  }
}
const setUser = (state, userid) => {
  return {
      ...state,
      userID: userid,
  }
}

/////////
//GIFTS//
/////////
const loadGifts = (state, newGifts) => {
  return {
      ...state,
      giftItems: newGifts,
  }
}
const addGift = (state, payload) => {
  const { newGift, key } = payload;
  let { giftItems } = state;
  let newGifts = giftItems.concat({
      giftName: newGift.giftName,
      price: newGift.price,
      picture: newGift.picture,
      from: newGift.from,
      detail: newGift.detail,
      key: key
  });
  return {
      ...state,
      giftItems: newGifts
  }
}
const updateGift = (state, itemId, newGift) => {
  let { giftItems } = state;
  let updateGifts = {
      giftName: newGift.giftName,
      price: newGift.price,
      picture: newGift.picture,
      from: newGift.from,
      detail: newGift.detail,
      key: itemId
  }
  let newGiftItems = giftItems.map(elem=>elem.key===itemId?updateGifts:elem);
  return {
      ...state,
      giftItems: newGiftItems,
  }
}
const deleteGift = (state, key) => {
  let { giftItems } = state;
  let newGiftItems = giftItems.filter(elem=>elem.key!==key);
  return{
      ...state,
      giftItems: newGiftItems,
  }
}
  
//////////
//CAMERA//
//////////
const previewPicture = (state, picture, updatePicture) => {
  return {
    ...state,
    previewPicture: picture,
    updatePicture: updatePicture,
  }
}

//////////////
//GIFT LISTS//
//////////////
const loadGiftList = (state, newGiftList ) => {
  return {
    ...state,
    giftListItems: newGiftList,
  }
}
const addGiftList = (state, payload) => {
  const { newList, key } = payload;
  let { giftListItems } = state;
  let newLists = giftListItems.concat({
      listName: newList.listName,
      dueDate: newList.dueDate,
      emoji: newList.emoji,
      key: key
  });
  return {
      ...state,
      giftListItems: newLists
  }
}
const updateGiftList = (state, itemId, newList) => {
  let { giftListItems } = state;
  let updateList = {
      listName: newList.listName,
      dueDate: newList.dueDate,
      emoji: newList.emoji,
      key: itemId
  }
  let newListItems = giftListItems.map(elem=>elem.key===itemId?updateList:elem);
  return {
      ...state,
      giftListItems: newListItems,
  }
}
const deleteGiftList = (state, key) => {
  let { giftListItems } = state;
  let newListItems = giftListItems.filter(elem=>elem.key!==key);
  return{
      ...state,
      giftListItems: newListItems,
  }
}

///////////////////
//GIFT FOR FRIEND//
///////////////////
const loadFriendGiftList = (state, newFriendGifts ) => {
  return {
    ...state,
    friendGifts: newFriendGifts,
  }
}
const addFriendGiftList = (state, payload) => {
  const { newFriendGifts, key } = payload;
  let { friendGifts } = state;
  let newLists = friendGifts.concat({
      firstName: newFriendGifts.firstName,
      lastName: newFriendGifts.lastName,
      gifts: newFriendGifts.gifts, 
      key: key,
  });
  return {
      ...state,
      friendGifts: newLists
  }
}
const updateFriendGiftList = (state, key, newFriendGifts) => {
  let { friendGifts } = state;
  let updateList = {
    firstName: newFriendGifts.firstName,
    lastName: newFriendGifts.lastName,
    gifts: newFriendGifts.gifts, 
    key: key,
  }
  let newListItems = friendGifts.map(elem=>elem.key===key?updateList:elem);
  return {
      ...state,
      friendGifts: newListItems,
  }
}
const deleteFriendGiftList = (state, key) => {
  let { friendGifts } = state;
  let newListItems = friendGifts.filter(elem=>elem.key!==key);
  return{
      ...state,
      friendGifts: newListItems,
  }
}

///////////
//FRIENDS//
///////////
const loadFriends = (state, newFriends ) => {
  return {
    ...state,
    friendItems: newFriends,
  }
}
const addFriend = (state, payload) => {
  const { newFriend, key } = payload;
  let { friendItems } = state;
  let newFriends = friendItems.concat({
      firstName: newFriend.firstName,
      lastName: newFriend.lastName,
      birthDate: newFriend.birthDate,
      interests: newFriend.interests,
      giftIdeas: newFriend.giftIdeas,
      key: key
  });
  return {
      ...state,
      friendItems: newFriends
  }
}
const updateFriend = (state, itemId, newFriend) => {
  let { friendItems } = state;
  let updateFriend = {
      firstName: newFriend.firstName,
      lastName: newFriend.lastName,
      birthDate: newFriend.birthDate,
      interests: newFriend.interests,
      giftIdeas: newFriend.giftIdeas,
      key: itemId
  }
  let newFriends = friendItems.map(elem=>elem.key===itemId?updateFriend:elem);
  return {
      ...state,
      friendItems: newFriends,
  }
}
const deleteFriend = (state, key) => {
  let { friendItems } = state;
  let newFriends = friendItems.filter(elem=>elem.key!==key);
  return{
      ...state,
      friendItems: newFriends,
  }
}

////////////////
//ROOT REDUCER//
////////////////
function rootReducer(state=initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_USER:
      return setUser(state, payload.userid);
    case actionTypes.LOAD_USER:
      return loadUser(state, payload.displayName);

    case actionTypes.LOAD_GIFT:
      return loadGifts(state, payload.newGifts);
    case actionTypes.ADD_GIFT:
      return addGift(state, payload);
    case actionTypes.UPDATE_GIFT:
      return updateGift(state, payload.key, payload.newGift);
    case actionTypes.DELETE_GIFT:
      return deleteGift(state, payload.key);

    case actionTypes.LOAD_GIFT_LIST:
      return loadGiftList(state, payload.newGiftList);
    case actionTypes.ADD_GIFT_LIST:
      return addGiftList(state, payload);
    case actionTypes.UPDATE_GIFT_LIST:
      return updateGiftList(state, payload.key, payload.newList);
    case actionTypes.DELETE_GIFT_LIST:
      return deleteGiftList(state, payload.key);

    case actionTypes.LOAD_FRIEND_GIFT_LIST:
      return loadFriendGiftList(state, payload.newFriendGifts);
    case actionTypes.ADD_FRIEND_GIFT_LIST:
      return addFriendGiftList(state, payload);
    case actionTypes.UPDATE_FRIEND_GIFT_LIST:
      return updateFriendGiftList(state, payload.key, payload.newFriendGifts);
    case actionTypes.DELETE_FRIEND_GIFT_LIST:
      return deleteFriendGiftList(state, payload.key);

    case actionTypes.LOAD_FRIEND:
      return loadFriends(state, payload.newFriends);
    case actionTypes.ADD_FRIEND:
      return addFriend(state, payload);
    case actionTypes.UPDATE_FRIEND:
      return updateFriend(state, payload.key, payload.newFriend);
    case actionTypes.DELETE_FRIEND:
      return deleteFriend(state, payload.key);
    
    case actionTypes.PREVIEW_PICTURE:
      return previewPicture(state, payload.picture, payload.updatePicture);

    case actionTypes.CLEAR_DATA:
      return clearData(state);
    
    default:
      return state;

  }
}

  export { actionTypes, rootReducer };