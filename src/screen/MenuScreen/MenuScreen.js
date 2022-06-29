import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions,
    SafeAreaView, ImageBackground, TextInput, ScrollView,
    TouchableOpacity, StatusBar, Image, Keyboard, Platform, Alert
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './MenuStyle';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const MenuScreen = (props) => {
    const [memberInfo, setMemberInfo] = useState(null);
    const [memberProfilePic, setMemberProfilePic] = useState(null);
    const [memberNumber, setMemberNumber] = useState(null);
    const [memberName, setMemberName] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            const getCallBackScreen = () => {
                //LANGUAGE MANAGEMENT FUNCTION
                MemberLanguage();
                if (memberInfo) {
                    setMemberProfilePic(memberInfo?.profilepic);
                    setMemberNumber(memberInfo?.membernumber);
                    setMemberName(memberInfo?.fullname);
                }
            }
            getCallBackScreen();
        }, [])
    );

    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, [])

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberInfo(memberInfo);
            setMemberProfilePic(memberInfo?.profilepic);
            setMemberNumber(memberInfo?.designationid?.title);
            setMemberName(memberInfo?.fullname);
        }
    }

    useEffect(() => {
    }, [memberProfilePic])

    //LOGOUT BUTTON CLICK TO CALL 
    const onPressLogout = () => {
        Alert.alert(
            languageConfig.Logouttext,
            languageConfig.profilelogout,
            [
                {
                    text: languageConfig.cancel,
                    style: "cancel"
                },
                {
                    text: languageConfig.Logouttext2, onPress: () => {
                        AsyncStorage.removeItem(KEY.AUTHUSERINFO);
                        // AsyncStorage.removeItem(REMOVEDATA);
                        AsyncStorage.removeItem(KEY.AUTHUSER);
                        Toast.show(languageConfig.logoutsuccessmessage, Toast.SHORT);
                        props.navigation.replace(SCREEN.AUTH);
                    }
                }
            ]
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate(SCREEN.PROFILESCREEN)}>
                        <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10 }}>
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                <View style={styles.rounfIconStyle}>
                                    <Image style={{
                                        borderRadius: 100,
                                        width: 45, height: 45
                                    }} source={!memberProfilePic ? IMAGE.USERPROFILE : { uri: memberProfilePic }} />
                                </View>
                            </View>
                            <View style={{ justifyContent: KEY.CENTER, flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD }}>{memberName}</Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK }}>{memberNumber}</Text>
                            </View>
                            <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 10, justifyContent: KEY.CENTER }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.MYPROFILESCREEN)}>
                                    <Feather name='chevron-right' size={20} style={{ color: COLOR.BLACK }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 10 }}>
                    <View style={styles.card1}>
                        <View style={{ marginTop: 10, marginLeft: 15, flexDirection: KEY.COLUMN, marginBottom: 5 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, marginBottom: 10 }}>{languageConfig.servicetext}</Text>
                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.HOMESCREEN)}>
                                <Image source={IMAGE.HOMEICON} style={{ width: 20, height: 25, tintColor: COLOR.BLACK, marginBottom: -5 }} />
                                <Text style={{ marginLeft: 9, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.home}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.CALENDARSCREEN)}>
                                <Image source={IMAGE.CALENDAR} style={{ width: 21, height: 21, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.calendar}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.ATTENDANCESCREEN)}>
                                <Image source={IMAGE.ATTENDANCE_ICON} style={{ width: 21, height: 21, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.attendance}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.TIMESHEETSCREEN)}>
                                <Image source={IMAGE.TIMELINEICON} style={{ width: 20, height: 20, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.timesheet}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.ANNOUNCEMENTSCREEN)}>
                                <Image source={IMAGE.NOTICE_OUTLINE} style={{ width: 20, height: 20, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.announcement}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                    <View style={styles.card1}>
                        <View style={{ marginTop: 10, marginLeft: 15, flexDirection: KEY.COLUMN, marginBottom: 5 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, marginBottom: 10 }}>{languageConfig.aboutustext}</Text>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.REFERFRIENDSCREEN)}>
                                <Image style={{ width: 21, height: 21, tintColor: COLOR.BLACK }} source={IMAGE.REFERICON} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.referfriend}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.SALARYSCREEN)}>
                                <Image source={IMAGE.PAYMENT_ICON} style={{ width: 24, height: 21, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.mysalary}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.LEAVESCREEN)}>
                                <Image source={IMAGE.IC_PRESCRIPTION} style={{ width: 22, height: 22, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.myleave}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.MYCLAIMSCREEN)}>
                                <Image source={IMAGE.CLAIMICON} style={{ width: 21, height: 21, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.myclaim}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.MYTEAMSCREEN)}>
                                <Image source={IMAGE.IC_GROUP} style={{ width: 22, height: 18, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.teams}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => props.navigation.navigate(SCREEN.SUPPORTSCREEN)}>
                                <Image style={{ width: 12, height: 22, tintColor: COLOR.BLACK }} source={IMAGE.SUPPORT_ICON} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.support}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: KEY.ROW }} onPress={() => onPressLogout()}>
                                <Image source={IMAGE.LOGOUT} style={{ width: 22, height: 22, tintColor: COLOR.BLACK }} />
                                <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, marginBottom: 15 }}>{languageConfig.Logouttext}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MenuScreen;
