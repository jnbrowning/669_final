import { actionTypes } from '../data/Reducer';

const addGiftList = (addList, userID) => {
    return { 
        type: actionTypes.ADD_GIFT_LIST, 
        payload: { 
            newList: addList, 
            userid: userID 
        }
}};

const deleteFriend = (item, userID) => {
    return {
        type: actionTypes.DELETE_FRIEND, 
        payload: {
            key: item.key,
            userid: userID,
        }
}};

const deleteGift = (item, userID) => {
    return {
        type: actionTypes.DELETE_GIFT, 
        payload: {
            key: item.key,
            userid: userID,
        }
}};

export {
    addGiftList,
    deleteFriend,
    deleteGift,
};