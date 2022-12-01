import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '15%',
  },
  header: {
    fontSize: '30',
    marginBottom: '3%',
  },

  //LOGIN SCREEN
  appName: {
    fontSize: '40',
    paddingBottom: '12%',
    marginTop: '20%',
  },
  logInContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    width: '100%',
  },
  logInInfoContainer: {
    width: '100%',
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
    backgroundColor: '#863A6F',
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
  signOutButton: {
    alignItems: 'flex-end',
    width: '85%',
    marginBottom: '2%'
  },
  signOutButtonText: {
    color: '#863A6F'
  },

  //Detail Pages
  editButton: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderRadius: '25%',
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: '1%',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '20%',
  },
  editText: {
      color: 'grey',
  },
  detailText: {
    fontSize: '16',
    padding: '5%'
  },

  //GIFT LISTS
  giftListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    paddingBottom: '3%'
  },
  giftListEmoji: {
    fontSize: '60',
    width: '25%',
  },
  giftListSelect: {
    width: '65%',
    height: '100%',
    justifyContent: 'center'
  },
  giftListName: {
    fontSize: '24',
    paddingBottom: '2%'
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
    color: '#060bfd',
    paddingRight: '5%'
  },
  inputPair: {
    flexDirection: 'row',
  },
  inputLabel: {
    flex: 0.25,
    textAlign: 'right',
    padding: '1%',
    marginTop: '3%',
  },
  inputText: {
    flex: 0.65,
    marginLeft: '3%',
    marginRight: '2%',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderBottomWidth: '1%',
    marginTop: '3%'
  },
  item: {
    flexDirection: 'row',
    padding: '1%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    padding: '1%',
    fontSize: '18'
  },
  calendar: {
    paddingTop: '2%',
    paddingLeft: '3%',
  },
  calendarText: {
    flex: 0.6,
    marginLeft: '3%',
    marginRight: '2%',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderBottomWidth: '1%',
    marginTop: '3.5%'
  },
  emojiBoard: {
    marginTop: '10%',
    flex: 0.8,
  },
  dropDown: {
    width: '80%',
    padding: '2%',
    borderWidth: '1%',
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: 'white',
  },
  dropDownLabel: {
    flex: 0.8,
    textAlign: 'left',
    padding: '1%',
    marginTop: '3%',
    marginBottom: '1%'
  },
  dropDownPair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  dropDownText: {
    fontSize: '14',
    paddingLeft: '3%',
    paddingTop: '1%',
  },
  cancelText: {
    paddingTop: '1%',
    textAlign: 'right'
  },
  emojiHeader: {
    fontSize: '75',
  },
  friendList: {
    flex: 0.8,
    textAlign: 'left',
    padding: '1%',
    marginBottom: '1%',
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

  detailPicture: {
    height: 200,
    width: 200,
    borderRadius: '100%',
    marginBottom: '3%'
  },



  });



export default styles;