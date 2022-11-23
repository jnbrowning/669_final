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
  });

export default styles;