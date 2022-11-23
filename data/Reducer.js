//constants for action types
const LOAD_GIFT = 'LOAD_GIFT';
const ADD_GIFT = 'ADD_GIFT';
const UPDATE_GIFT = 'UPDATE_GIFT';
const DELETE_GIFT = 'DELETE_GIFT';
const CREATE_USER = 'CREATE_USER';
const SET_USER = 'SET_USER';

  const initialState = {
    giftItems: [],
    userID: '',
  }

  const setUser = (state, userid) => {
    console.log(userid);
    return {
        ...state,
        userID: userid,
    }
  }

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
  
  function rootReducer(state=initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case LOAD_GIFT:
        return loadGifts(state, payload.newGifts);
      case ADD_GIFT:
        return addGift(state, payload);
      case UPDATE_GIFT:
        return updateGift(state, payload.key, payload.newGift);
      case DELETE_GIFT:
        return deleteGift(state, payload.key);
      case SET_USER:
        return setUser(state, payload.userid);
      default:
        return state;
    }
  }

  export { rootReducer, SET_USER, LOAD_GIFT, ADD_GIFT, UPDATE_GIFT, DELETE_GIFT, CREATE_USER };