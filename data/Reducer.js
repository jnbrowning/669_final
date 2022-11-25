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

  LOAD_FRIEND: 'LOAD_FRIEND',
  ADD_FRIEND: 'ADD_FRIEND',
  UPDATE_FRIEND: 'UPDATE_FRIEND',
  DELETE_FRIEND: 'DELETE_FRIEND',
}

/////////
//STATE//
/////////
const initialState = {
  girfListItems: [],
  giftItems: [],
  friendItems: [],
  userID: '',
  userName: '',
}

/////////
//USERS//
/////////
const loadUser = (state, displayName) => {
  console.log(displayName);
  return {
    ...state,
    userName: displayName,
  }
}
const setUser = (state, userid) => {
  console.log(userid);
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
      dueDate: newList.listName,
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

///////////
//FRIENDS//
///////////
const loadFriends = (state, newFriends ) => {
  console.log(newFriends);
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

    case actionTypes.LOAD_FRIEND:
      return loadFriends(state, payload.newFriends);
    case actionTypes.ADD_FRIEND:
      return addFriend(state, payload);
    case actionTypes.UPDATE_FRIEND:
      return updateFriend(state, payload.key, payload.newFriend);
    case actionTypes.DELETE_FRIEND:
      return deleteFriend(state, payload.key);
    
    default:
      return state;
  }
}

  export { rootReducer, actionTypes };