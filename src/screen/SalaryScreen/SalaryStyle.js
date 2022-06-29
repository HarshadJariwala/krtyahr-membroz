import { Dimensions, StyleSheet } from "react-native";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    viewMain: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        marginTop: 10,
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
        elevation: 3
    },
    listTab: {
        alignItems: KEY.CENTER,
        // backgroundColor: COLOR.ANTI_FLASH_WHITE,
        marginTop: 0,
        borderRadius: 5,
        flexDirection: KEY.ROW,
        //width: WIDTH - 40
    },
    btnTab: {
        // flexDirection: KEY.ROW,
        // width: "50%",
        // padding: 10,
        // justifyContent: KEY.CENTER,
        // backgroundColor: COLOR.WHITE
        height: 25,
        marginTop: 10,
        borderRadius: 100,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        margin: 10
    },
    tabText: {
        // fontSize: FONT.FONT_SIZE_18,
        // fontWeight: FONT.FONT_WEIGHT_BOLD,
        // textTransform: KEY.CAPITALIZE,
        // color: COLOR.BLACK
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_BOLD,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.BLACK,
        marginLeft: 20,
        marginRight: 20
    },
    tabTextActive: {
        // fontSize: FONT.FONT_SIZE_18,
        // fontWeight: FONT.FONT_WEIGHT_BOLD,
        // textTransform: KEY.CAPITALIZE,
        // color: COLOR.BLACK
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_BOLD,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.WHITE,
        marginLeft: 20,
        marginRight: 20
    },
    tabActive: {
        height: 25,
        marginTop: 10,
        borderRadius: 100,
        backgroundColor: COLOR.DEFALUTCOLOR,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        margin: 10
    },
    textTouchable: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 15,
        flexDirection: KEY.ROW
    },
    earningTextTitle: {
        fontSize: FONT.FONT_SIZE_20,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        marginLeft: 20,
        marginTop: 15,
        color: COLOR.GREEN
    },
    deductionTextTitle2: {
        fontSize: FONT.FONT_SIZE_20,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        marginLeft: 20,
        marginTop: 15,
        color: COLOR.YELLOW
    },
    leaveTextTitle: {
        fontSize: FONT.FONT_SIZE_20,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        marginLeft: 20,
        marginTop: 15,
        color: COLOR.WELDON_BLUE
    },
    text: {
        fontSize: FONT.FONT_SIZE_16,
        marginTop: 10,
        color: COLOR.GRANITE_GRAY
    },
});

export default styles;