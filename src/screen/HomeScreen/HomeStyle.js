import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = (colorcode) => StyleSheet.create(
  {
    viewPhoto: {
      height: 50,
      width: WIDTH / 3 + 10,
      backgroundColor: COLOR.GALLERYCOLOR,
      borderRadius: 30,
      borderColor: COLOR.WHITE,
      borderWidth: 2,
      marginLeft: 135,
      marginRight: 100,
      marginTop: 10,
      flexDirection: KEY.ROW,
      justifyContent: KEY.SPACEBETWEEN,
      alignItems: KEY.CENTER
    },
    picture_Icon_iconPhoto: {
      tintColor: COLOR.WHITE,
      height: 18,
      width: 22,
      marginLeft: 10
    },
    arror_iconPhoto: {
      marginTop: 2,
      color: COLOR.WHITE,
      marginRight: 15
    },
    viewName: {
      height: 70,
      alignItems: KEY.CENTER,
      borderRadius: 20,
      backgroundColor: COLOR.WHITE,
      marginTop: 50,
      marginRight: 20,
      marginLeft: 20,
      flexDirection: KEY.ROW
    },
    viweRound: {
      height: 100,
      width: 100,
      borderRadius: 60,
      borderColor: COLOR.WHITE,
      borderWidth: 3,
      backgroundColor: COLOR.WELDON_BLUE,
      marginLeft: 10,
      justifyContent: KEY.CENTER,
      alignItems: KEY.CENTER,
      marginBottom: 10
    },
    text: {
      maxWidth: WIDTH / 2,
      fontSize: FONT.FONT_SIZE_20,
      color: COLOR.BLACK_OLIVE,
      marginLeft: 5,
      fontWeight: FONT.FONT_WEIGHT_BOLD,
      textTransform: KEY.CAPITALIZE
    },
    titletext: {
      maxWidth: WIDTH,
      fontSize: FONT.FONT_SIZE_18,
      color: COLOR.BLACK_OLIVE,
      marginLeft: 5,
      fontWeight: FONT.FONT_WEIGHT_BOLD,
      textTransform: KEY.CAPITALIZE
    },
    text2: {
      maxWidth: WIDTH / 2,
      fontSize: FONT.FONT_SIZE_16,
      color: COLOR.BLACK_OLIVE,
      marginLeft: 5,
      fontWeight: FONT.FONT_WEIGHT_BOLD,
      textTransform: KEY.CAPITALIZE
    },
    viewLine: {
      borderRightColor: COLOR.DEFALUTCOLOR,
      borderRightWidth: 2,
      height: 50,
      flex: 1,
      alignItems: KEY.FLEX_END,
      marginTop: 0
    },
    viewMain1: {
      backgroundColor: COLOR.BACKGROUNDCOLOR,
      alignItems: KEY.CENTER,
      justifyContent: KEY.CENTER,
    },
    viewRectangle1: {
      width: WIDTH - 30,
      marginTop: 20,
      borderRadius: 10,
      backgroundColor: COLOR.WHITE,
      shadowColor: COLOR.BLACK,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      alignItems: KEY.CENTER,
      marginBottom: 5,
    },
    rounfIconStyle: {
      //marginTop: 10,
      marginLeft: 15,
      height: 35,
      width: 35,
      borderRadius: 100,
      borderColor: COLOR.DEFALUTCOLOR,
      borderWidth: 2,
      justifyContent: KEY.CENTER,
      alignItems: KEY.CENTER
    },
    viewMain: {
      backgroundColor: COLOR.BACKGROUNDCOLOR,
      //marginTop: 50,
      // marginTop: 30,
      // height: HEIGHT,
      //width: WIDTH,
      // borderTopLeftRadius: 25,
      // borderTopRightRadius: 25,
      //alignItems: KEY.CENTER,
      //justifyContent: KEY.CENTER,
      //marginLeft: -2
      width: WIDTH
    },
    viewRectangle: {
      borderLeftWidth: 70,
      borderRightWidth: 5,
      borderLeftColor: COLOR.DEFALUTCOLOR,
      borderRightColor: COLOR.DEFALUTCOLOR,
      width: WIDTH - 28,
      height: 105,
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 5,
      backgroundColor: COLOR.WHITE,
      shadowColor: COLOR.BLACK,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      flexDirection: KEY.ROW,
      alignItems: KEY.CENTER
    },
    viewRectangle2: {
      borderLeftWidth: 70,
      borderRightWidth: 5,
      borderLeftColor: COLOR.RED,
      borderRightColor: COLOR.RED,
      width: WIDTH - 28,
      height: 105,
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 5,
      backgroundColor: COLOR.WHITE,
      shadowColor: COLOR.BLACK,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      flexDirection: KEY.ROW,
      alignItems: KEY.CENTER
    },
    rectangleText: {
      fontSize: FONT.FONT_SIZE_10,
      color: colorcode ? colorcode : COLOR.BLACK,
      marginTop: 0,
    },
    rectangleRound: {
      //height: 40,
      //width: 90,
      //borderRadius: 30,
      //backgroundColor: COLOR.DEFALUTCOLOR,
      marginRight: 20,
      marginTop: 0,
      //elevation: 2,
      alignItems: KEY.CENTER,
      justifyContent: KEY.CENTER
    },
    rectangleRound2: {
      //height: 40,
      //width: 90,
      //borderRadius: 30,
      //backgroundColor: COLOR.DEFALUTCOLOR,
      marginRight: 40,
      marginTop: 0,
      //elevation: 2,
      alignItems: KEY.CENTER,
      justifyContent: KEY.CENTER
    },
    viewSquareTwoColumn: {
      height: 120,
      width: WIDTH / 2.4,
      margin: 10,
      borderRadius: 10,
      shadowColor: COLOR.BLACK,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      alignItems: KEY.FLEX_START,
      backgroundColor: COLOR.WHITE
    },
    viewSquareThreeColumn: {
      height: 95,
      width: WIDTH / 3.3,
      marginTop: 5,
      marginRight: 3,
      marginLeft: 3,
      borderRightWidth: 5,
      borderRadius: 4,
      borderRightColor: colorcode,
      shadowColor: COLOR.BLACK,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      alignItems: KEY.FLEX_START,
      marginBottom: 0,
      backgroundColor: COLOR.WHITE
    },
    modalContainer: {
      backgroundColor: COLOR.WHITE,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 40,
      alignItems: KEY.CENTER
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 15
    },
    modalText: {
      fontSize: 18,
      color: COLOR.BLACK,
      textAlign: KEY.CENTER,
    },
    button: {
      backgroundColor: COLOR.DEFALUTCOLOR,
      paddingVertical: 12,
      paddingHorizontal: 16,
      width: WIDTH - 20,
      alignItems: KEY.CENTER,
      marginTop: 25,
      borderRadius: 10
    },
    buttonText: {
      color: COLOR.WHITE,
      fontSize: 20,
    },
    cardView: {
      borderRadius: 15,
      marginTop: 10,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 5,
      borderRightWidth: 10,
      borderRightColor: COLOR.DEFALUTCOLOR,
      flexDirection: KEY.ROW,
      backgroundColor: COLOR.WHITE,
      shadowColor: COLOR.BLACK,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 3,
    },
    leaveCardView: {
      borderRadius: 15,
      marginTop: 10,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 5,
      width: WIDTH - 30,
      flexDirection: KEY.ROW,
      backgroundColor: COLOR.WHITE,
      shadowColor: COLOR.BLACK,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 3,
    },
    leavefilledBox: {
      backgroundColor: COLOR.DEFALUTCOLOR,
      justifyContent: KEY.CENTER,
      alignItems: KEY.CENTER,
      flexDirection: KEY.COLUMN,
      padding: 5
    },
    filledBox: {
      width: 100,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      backgroundColor: COLOR.DEFALUTCOLOR,
      justifyContent: KEY.CENTER,
      alignItems: KEY.CENTER,
      flexDirection: KEY.COLUMN,
      padding: 5
    },
    scanBtnStyle: {
      flexDirection: KEY.ROW,
      height: 50,
      width: 200,
      backgroundColor: COLOR.SCAN_COLOR,
      borderRadius: 100,
      alignItems: KEY.CENTER,
      justifyContent: KEY.CENTER,
      position: KEY.ABSOLUTE, bottom: 30,
      elevation: 3,
      alignSelf: KEY.CENTER,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
    }
  });

export default styles;

// import React from 'react';
// import {
//   StyleSheet, Dimensions
// } from 'react-native';
// import * as COLOR from '../../styles/colors';
// import * as FONT from '../../styles/typography';
// import * as KEY from '../../context/actions/key';

// const HEIGHT = Dimensions.get('window').height;
// const WIDTH = Dimensions.get('window').width;

// const styles = (colorcode) => StyleSheet.create(
//   {
//     viewPhoto: {
//       height: 50,
//       width: WIDTH / 3 + 10,
//       backgroundColor: COLOR.GALLERYCOLOR,
//       borderRadius: 30,
//       borderColor: COLOR.WHITE,
//       borderWidth: 2,
//       marginLeft: 135,
//       marginRight: 100,
//       marginTop: 10,
//       flexDirection: KEY.ROW,
//       justifyContent: KEY.SPACEBETWEEN,
//       alignItems: KEY.CENTER
//     },
//     picture_Icon_iconPhoto: {
//       tintColor: COLOR.WHITE,
//       height: 18,
//       width: 22,
//       marginLeft: 10
//     },
//     arror_iconPhoto: {
//       marginTop: 2,
//       color: COLOR.WHITE,
//       marginRight: 15
//     },
//     viewName: {
//       height: 70,
//       alignItems: KEY.CENTER,
//       borderRadius: 20,
//       backgroundColor: COLOR.WHITE,
//       marginTop: 20,
//       marginRight: 20,
//       marginLeft: 20,
//       flexDirection: KEY.ROW
//     },
//     viweRound: {
//       height: 100,
//       width: 100,
//       borderRadius: 60,
//       borderColor: COLOR.WHITE,
//       borderWidth: 3,
//       backgroundColor: COLOR.WELDON_BLUE,
//       marginLeft: 10,
//       justifyContent: KEY.CENTER,
//       alignItems: KEY.CENTER
//     },
//     text: {
//       maxWidth: WIDTH / 2,
//       fontSize: FONT.FONT_SIZE_22,
//       color: COLOR.DEFALUTCOLOR,
//       marginLeft: 5,
//       fontWeight: FONT.FONT_WEIGHT_NORMAL,
//       textTransform: KEY.CAPITALIZE
//     },
//     viewLine: {
//       borderRightColor: COLOR.DEFALUTCOLOR,
//       borderRightWidth: 2,
//       height: 50,
//       flex: 1,
//       alignItems: KEY.FLEX_END,
//       marginTop: 0
//     },
//     viewMain: {
//       backgroundColor: COLOR.ANTI_FLASH_WHITE,
//       //marginTop: -HEIGHT / 5,
//       marginTop: 30,
//       height: HEIGHT,
//       width: WIDTH,
//       borderTopLeftRadius: 25,
//       borderTopRightRadius: 25,
//       alignItems: KEY.CENTER,
//       justifyContent: KEY.CENTER
//     },
//     viewRectangle: {
//       borderLeftWidth: 70,
//       borderRightWidth: 5,
//       borderLeftColor: COLOR.DEFALUTCOLOR,
//       borderRightColor: COLOR.DEFALUTCOLOR,
//       width: WIDTH - 15,
//       height: 105,
//       marginTop: 20,
//       marginLeft: 10,
//       marginRight: 10,
//       borderRadius: 5,
//       backgroundColor: COLOR.WHITE,
//       shadowColor: COLOR.BLACK,
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.23,
//       shadowRadius: 2.62,
//       elevation: 4,
//       flexDirection: KEY.ROW,
//       alignItems: KEY.CENTER
//     },
//     rectangleText: {
//       fontSize: FONT.FONT_SIZE_10,
//       color: COLOR.DEFALUTCOLOR,
//       marginTop: 5,
//     },
//     rectangleRound: {
//       //height: 40,
//       //width: 90,
//       //borderRadius: 30,
//       //backgroundColor: COLOR.DEFALUTCOLOR,
//       marginRight: 20,
//       marginTop: 0,
//       //elevation: 2,
//       alignItems: KEY.CENTER,
//       justifyContent: KEY.CENTER
//     },
//     viewSquareTwoColumn: {
//       height: 95,
//       width: WIDTH / 2.2,
//       marginTop: 5,
//       marginRight: 3,
//       marginLeft: 3,
//       borderRightWidth: 5,
//       borderRadius: 4,
//       borderRightColor: colorcode,
//       shadowColor: COLOR.BLACK,
//       shadowOffset: {
//         width: 0,
//         height: 1,
//       },
//       shadowOpacity: 0.22,
//       shadowRadius: 2.22,
//       elevation: 3,
//       alignItems: KEY.FLEX_START,
//       marginBottom: 0,
//       backgroundColor: COLOR.WHITE
//     },
//     viewSquareThreeColumn: {
//       height: 95,
//       width: WIDTH / 3.3,
//       marginTop: 5,
//       marginRight: 3,
//       marginLeft: 3,
//       borderRightWidth: 5,
//       borderRadius: 4,
//       borderRightColor: colorcode,
//       shadowColor: COLOR.BLACK,
//       shadowOffset: {
//         width: 0,
//         height: 1,
//       },
//       shadowOpacity: 0.22,
//       shadowRadius: 2.22,
//       elevation: 3,
//       alignItems: KEY.FLEX_START,
//       marginBottom: 0,
//       backgroundColor: COLOR.WHITE
//     },
//     modalContainer: {
//       backgroundColor: COLOR.WHITE,
//       paddingHorizontal: 16,
//       paddingTop: 20,
//       paddingBottom: 40,
//       alignItems: KEY.CENTER
//     },
//     modalTitle: {
//       fontSize: 22,
//       fontWeight: '600',
//       marginBottom: 15
//     },
//     modalText: {
//       fontSize: 18,
//       color: COLOR.BLACK,
//       textAlign: KEY.CENTER,
//     },
//     button: {
//       backgroundColor: COLOR.DEFALUTCOLOR,
//       paddingVertical: 12,
//       paddingHorizontal: 16,
//       width: WIDTH - 20,
//       alignItems: KEY.CENTER,
//       marginTop: 25,
//       borderRadius: 10
//     },
//     buttonText: {
//       color: COLOR.WHITE,
//       fontSize: 20,
//     },
//   });

// export default styles;