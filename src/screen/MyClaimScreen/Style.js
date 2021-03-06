import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  squreView: {
    //height: 100,
    flex: 1,
    width: WIDTH - 20,
    backgroundColor: COLOR.WHITE,
    borderRadius: 5,
    justifyContent: KEY.SPACEBETWEEN
  },
  textTitle: {
    marginTop: 5,
    textTransform: KEY.CAPITALIZE,
    color: COLOR.LIGHT_BLACK,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    fontSize: FONT.FONT_SIZE_18,
    width: WIDTH - 150
  },
  textsub: {
    textTransform: KEY.CAPITALIZE,
    color: COLOR.MENU_TEXT_COLOR,
    fontSize: FONT.FONT_SIZE_16
  },
  viewMain: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 10,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  listTab: {
    backgroundColor: COLOR.WHITE,
    marginTop: 10,
    borderRadius: 20
  },
  btnTab: {
    flex: 1,
    margin: 10,
    flexDirection: KEY.ROW,
    justifyContent: KEY.CENTER
  },
  tabActive: {},
  tabText: {
    fontSize: FONT.FONT_SIZE_18,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    textTransform: KEY.CAPITALIZE,
    color: COLOR.LIGHT_BLACK
  },
  tabTextActive: {
    fontSize: FONT.FONT_SIZE_18,
    fontWeight: FONT.FONT_WEIGHT_BOLD,
    textTransform: KEY.CAPITALIZE,
    color: COLOR.DEFALUTCOLOR
  },
  textTouchable: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 15,
    flexDirection: KEY.ROW
  },
  text: {
    fontSize: FONT.FONT_SIZE_14,
    color: COLOR.TAUPE_GRAY
  },
  touchStyle: {
    position: KEY.ABSOLUTE,
    width: 50,
    height: 50,
    alignItems: KEY.CENTER,
    justifyContent: KEY.CENTER,
    right: WIDTH / 2.3,
    borderRadius: 30,
    backgroundColor: COLOR.DEFALUTCOLOR,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    bottom: 25
  },
  floatImage: {
    resizeMode: KEY.CONTAIN,
    width: 20,
    height: 20,
    tintColor: COLOR.WHITE
  },
  viweRound: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderColor: COLOR.DEFALUTCOLOR,
    borderWidth: 3,
    backgroundColor: COLOR.WELDON_BLUE,
    marginLeft: 10,
    justifyContent: KEY.CENTER,
    alignItems: KEY.CENTER,
    marginBottom: 5
  },
  inputTextView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.BLACK,
    alignItems: KEY.CENTER,
    marginBottom: 10,
    width: WIDTH - 40,
    height: 45,
    color: COLOR.BLACK,
    fontSize: FONT.FONT_SIZE_14,
    paddingLeft: 15,
  },
  inputTextViewError: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.ERRORCOLOR,
    alignItems: KEY.CENTER,
    marginBottom: 10,
    width: WIDTH - 40,
    height: 45,
    color: COLOR.BLACK,
    fontSize: FONT.FONT_SIZE_14,
    paddingLeft: 15,
  },
  updateBtn: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: COLOR.DEFALUTCOLOR,
    width: WIDTH - 40,
    height: 45,
    justifyContent: KEY.CENTER,
    alignItems: KEY.CENTER,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  boxView: {
    flex: 1,
    width: WIDTH - 20,
    backgroundColor: COLOR.WHITE,
    marginTop: 0,
    borderRadius: 5,
    justifyContent: KEY.CENTER,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
    marginBottom: 10
  },
  centerView: {
    justifyContent: KEY.CENTER,
    alignItems: KEY.CENTER
  }
});

export default styles;