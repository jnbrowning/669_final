import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  //GENERAL STYLES
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
    marginTop: '2%',
  },
  itemText: {
    padding: '2%',
    fontSize: '18',
    marginLeft: '15%',
  },

  //HEADER (GIFT LIST, GIFTS, FRIENDS)
  headerContainer: {
    paddingTop: '10%',
    backgroundColor: '#492C7A',
    width: '100%',
  },
  header: {
    fontSize: '26',
    marginBottom: '4%',
    textAlign: 'center',
    color: 'white'
  },
  signOutButton: {
    alignItems: 'flex-end',
    paddingTop: '1%',
    width: '95%',
  },

  //BIG ADD BUTTON (GIFT LIST, GIFTS, FRIENDS)
  addButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '5%'
  },
  mainAddButton: {
    backgroundColor: '#492C7A',
    width: 65,
    height: 65,
    borderRadius: '100%',
    justifyContent: 'center',
  },
  mainAddButtonText: {
    alignSelf: 'center',
    padding: '10%',
    color: 'white'
  },

  //LOGIN SCREEN
  appName: {
    fontSize: '40',
    paddingBottom: '12%',
    marginTop: '30%',
    color: '#492C7A'
  },
  logInText: {
    fontSize: '16',
    margin: '7%',
  },
  logInHeader: {
    fontSize: '25',
    textAlign: 'center',
    margin: '5%',
    paddingTop: '7%'
  },
  logInLabel: { 
    fontSize: '14',
    marginLeft: '17%',
  },
  logInInput: {
    marginLeft: '17%',
    fontSize: '18',
    paddingTop: '1%',
    paddingBottom: '5%',
  },
  logInButton: {
    alignSelf: 'center',
    backgroundColor: '#492C7A',
    padding: '3%',
    width: '35%',
    alignItems: 'center',
    borderRadius: '10%',
    margin: '4%'
  },
  logInButtonText: {
    fontSize: '16',
    color: 'white'
  },

  //DETAIL PAGES
  detailHeaderContainer: {
    paddingTop: '14%',
    width: '100%',
    alignItems: 'center'
  },
  detailHeader:  {
    fontSize: '24',
    margin: '1%',
  },
  detailText: {
    fontSize: '14',
    marginBottom: '2%'
  },
  editButton: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderRadius: '25%',
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: '1%',
    margin: '1%',
    marginBottom: '3%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '20%',
  },
  editText: {
    color: 'grey',
  },
  detailLabel: {
    fontSize: '18',
    textAlign: 'left',
    width: '100%',
    marginLeft: '20%',
    paddingBottom: '2%',
    marginTop: '2%',
  },
  detailInfo: {
    fontSize: '14',
    textAlign: 'left',
    width: '100%',
    marginLeft: '20%',
    paddingBottom: '5%',
  },
  backButton: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: '7%',
  },

  //FRIEND DETAIL PAGE
  friendDetailHeaderContainer: {
    paddingTop: '17%',
    width: '100%',
    alignItems: 'center'
  },
  friendDetailHeader:  {
    fontSize: '28',
    margin: '2%',
    marginTop: '5%',
    paddingBottom: '1%'
  },
  friendDetailText: {
    fontSize: '16',
    paddingBottom: '5%'
  },
  giftIdeaItem: {
    padding: '1%'
  },
  giftIdeaText: {
    paddingTop: '2%',
    paddingLeft: '5%',
  },

  //GIFT DETAIL PAGE
  giftHeaderText: {
    fontSize: '24',
    paddingBottom: '3%',
  },
  detailPicture: {
    height: 200,
    width: 200,
    borderRadius: '100%',
    marginBottom: '5%',
    marginTop: '5%',
  },


  //ADD EDIT PAGES 
  inputPair: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  headInputText: {
    flex: 0.65,
    marginLeft: '1%',
    paddingLeft: '1%',
    marginRight: '2%',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderBottomWidth: '1%',
    marginTop: '3%',
    fontSize: 18,
  },
  inputText: {
    flex: 0.65,
    marginLeft: '1%',
    paddingLeft: '1%',
    marginRight: '2%',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderBottomWidth: '1%',
    marginTop: '3%'
  },
  wideInputText: {
    width: '81%',
    marginLeft: '3%',
    marginRight: '2%',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderBottomWidth: '1%',
    paddingBottom: '1%',
    marginTop: '1%'
  },
  inputLabel: {
    flex: 0.25,
    padding: '1%',
    marginTop: '3%',
    fontSize: '16',
    marginLeft: '7%',
  },  
  wideInputLabel: {
    flex: 0.46,
    padding: '1%',
    marginTop: '3%',
    fontSize: '16',
    marginLeft: '7%',
    paddingBottom: '3%',
  },
  calendar: {
    paddingTop: '3.5%',
    paddingLeft: '3%',
  },
  calendarText: {
    flex: 0.6,
    marginLeft: '3%',
    marginRight: '2%',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderBottomWidth: '1%',
    marginTop: '4%',
    fontSize: 15,
  },
  addFriendIcon: {
    justifyContent: 'center',
    padding: '1%',
  },
  addGiftIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%',
    paddingTop: '3%',
  },
  fullInputLabel: {
    width: '93.5%',
    padding: '1%',
    marginTop: '3%',
    fontSize: '16',
    marginLeft: '7%',
    paddingBottom: '3%',
  },
  fullInputText: {
    width: '85%',
    marginLeft: '3%',
    marginRight: '2%',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderBottomWidth: '1%',
    paddingBottom: '1%',
    marginTop: '1%',
    marginBottom: '3%',
  },


  friendListText: {
    paddingTop: '1%',
    paddingBottom: '2%',
    paddingLeft: '2%',
  },

  cancelIcon: {
    paddingBottom: '2%',
  },

  confirmButton: {
    backgroundColor: '#492C7A',
    padding: '3%',
    paddingLeft: '5%',
    paddingRight: '5%',
    borderRadius: '100%',
  },

  confirmText: {
    color: 'white'
  },

  overlayCancel: {
    alignSelf: 'flex-end',
  },

  












  //GIFT LISTS
  giftListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    paddingBottom: '3%',
    paddingTop: '3%',
    paddingLeft: '7%',
    margin: 0,
  },
  giftListEmoji: {
    fontSize: '40',
    paddingRight: '5%',
  },
  giftListSelect: {
    height: '100%',
    justifyContent: 'center',
  },
  giftListName: {
    fontSize: '20',
    paddingBottom: '1%'
  },
  giftListDate: {
    fontStyle: 'italic',
    fontSize: '12',
    color: 'grey',
  },

  //List Pages
  addButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: '5%',
    paddingRight: '5%',
    flexDirection: 'row',
    width: '100%',
  },
  addButtonText: {
    color: '#060bfd',
    fontSize: '24',
    paddingRight: '5%'
  },
  headerButton: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
    flexDirection: 'row',
    width: '100%',
  },
  headerButtonText: {
    color: '#863A6F',
    paddingRight: '5%'
  },

  item: {
    flexDirection: 'row',
    padding: '1%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

//DROP DOWN
  dropDown: {
    width: '85%',
    padding: '2%',
    borderWidth: '1%',
    marginTop: '1%',
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: 'white',
    flex: 0.5,
  },
  dropDownLabel: {
    flex: 0.8,
    textAlign: 'left',
    padding: '1%',
    marginTop: '3%',
    marginBottom: '1%'
  },

  dropDownText: {
    fontSize: '14',
    paddingLeft: '3%',
    paddingTop: '1%',
  },
  cancelText: {
    textAlign: 'right'
  },
  emojiHeader: {
    fontSize: '75',
  },
  friendList: {
    width: '90%',
    textAlign: 'left',
    padding: '1%',
    marginBottom: '1%',
    marginLeft: '5%',
  },

//GIFTS
  addPicture: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  cameraButton: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderRadius: '25%',
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: '1%',
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '40%',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '10%',
    marginBottom: '10%'
  }, 
  camera: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  takePicture: {
    marginBottom: '7%',
  },
  cameraScreen: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '10%',
    backgroundColor: 'black'
  },


  overlay: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,

  },
  // overlayBox: {
  //   flex: 0.4,
  //   backgroundColor: 'white',
  //   width: '100%',
  //   alignItems: 'flex-start',
  //   padding: '1%'
  // },
  overlayExpandBox: {
    flex: 0.75,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'flex-start',
    padding: '5%',
  },
  statusBundle: {
    flexDirection: 'row',
    flex: 1,

    width: '100%',
  },
  statusButton: {
    backgroundColor: '#EBF3C9',
    flex: 0.2,
    justifyContent: 'center'
  },
  activeStatusButton: {
    backgroundColor: '#86AD3D',
    flex: 0.2,
    justifyContent: 'center'
  },
  giftListFriends: {
    width: '100%'
  },
 
  addGift: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  friendGiftPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2F2963',
    padding: '1%',
    paddingLeft: '2%',
    marginTop: '1%',
    alignItems: 'center',
  },
  friendName: {
    fontSize: '22',
    color: 'white',
  },

  giftItemDetail: {
    paddingLeft: '2%',
    paddingTop: '1%',
    paddingBottom: '2%'
  },
  giftItemText: {
    paddingBottom: '1%',
    fontSize: '18',
  },
  statusText: {
    textAlign: 'center',
    padding: '2%',
  },

  //EMOJI BOARD
  emojiMenu: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%'
  },
  emojiBoard: {
    marginTop: '3%',
    flex: 0.9,
  },
  emojiPair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  emojiButton: {
    padding: '2%',
    borderRadius: '25%',
    width: '20%',
    margin: '2%',
    alignItems: 'center',
  },

  giftStatusOverlay: {
    alignItems: 'flex-start',
  },
  giftStatusPair: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'flex-end',
    marginTop: '3%',
    marginBottom: '2%',
  },
  giftStatusLabel: {
    fontSize: 16,
    flex: 0.2,
    textAlign: 'right',
    paddingRight: '3%',
    paddingBottom: '1%',
  },
  giftStatusInput: {
    flex: 0.75,
    fontSize: 15,
    marginRight: '2%',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderBottomWidth: '1%',
    paddingBottom: '1%',
  },
  overlayStatus: {
    height: '15%',
  },
  statusButtonPair: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    margin: '5%',
  },
  statusDelete: {
    padding: '5%'
  },
  statusSave: {
    padding: '4%',
    backgroundColor: '#2F2963',
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: '100%',
    width: 90,
    alignItems: 'center'
  },

  deleteSwipe: {
    backgroundColor: 'red',
    margin: 0,
    justifyContent: 'center',
    width: 75,
    height: '100%',
    alignItems: 'center',
  },
  deleteSwipeText: {
    color: 'white',
  },



  screenStyle: {
    backgroundColor: 'pink'
  },

  overlayLabel: {
      fontSize: '18',
      textAlign: 'left',
      width: '100%',
      marginLeft: '3%',
      paddingBottom: '2%',
  },
  overlayInfo: {
    fontSize: '14',
    textAlign: 'left',
    width: '100%',
    paddingBottom: '5%',
  },
  overlayGiftText: {
    fontSize: 16,
    paddingTop: '1%',
    marginLeft: '2%',
  },
  addGiftPair: {
    paddingLeft: '20%',
    paddingTop: '3%',
  },

  friendHeader: {
    paddingBottom: '5%',
    paddingTop: '3%',
  },
  });



export default styles;