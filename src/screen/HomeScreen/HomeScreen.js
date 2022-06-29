import {
  SafeAreaView, ScrollView,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar, Modal, Button,
  Platform, Alert, Linking, Share
} from 'react-native';
import { getByIdUserService, patchUserService } from '../../services/UserService/UserService';
import { NotificationService } from '../../services/NotificationService/NotificationService';
import { REMOTEDATA, MESSAGINGSENDERID, DEFAULTPROFILE } from '../../context/actions/type';
import * as AttendanceService from '../../services/AttendanceService/AttendanceService';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { GalleryService } from '../../services/GalleryService/GalleryService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import * as LocalService from '../../services/LocalService/LocalService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import MyPermissionController from '../../helpers/appPermission';
import Octicons from 'react-native-vector-icons/Octicons';
import PushNotification from "react-native-push-notification";
import crashlytics from "@react-native-firebase/crashlytics";
import languageConfig from '../../languages/languageConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useFocusEffect } from '@react-navigation/native';
import * as SCREEN from '../../context/screen/screenName';
import messaging from '@react-native-firebase/messaging';
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/index';
import DeviceInfo from 'react-native-device-info';
import firebase from '@react-native-firebase/app';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import RNExitApp from 'react-native-exit-app';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './HomeStyle';
import moment from 'moment';
import { getLastleaveRequestListService, leaveRequestListService } from '../../services/LeaveService/LeaveService';

//STATIC VARIABLE 
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

//STATIC DATA
let MenuDefaultArray = [
  { "menuname": "freshlead", "title": languageConfig.freshcall, "screenname": "FreshLeadScreen", "colorcode": "#2AAA63", "imageurl": IMAGE.PHONE_WITH_WIRE, "height": 30, "width": 30 },
  { "menuname": "followup", "title": languageConfig.followuptext, "screenname": "FollowupScreen", "colorcode": "#FF4D4D", "imageurl": IMAGE.CLOCK, "height": 30, "width": 30 },
  { "menuname": "meeting", "title": languageConfig.meeting, "screenname": "MeetingScreen", "colorcode": "#007AFF", "imageurl": IMAGE.IC_GROUP, "height": 30, "width": 30 },
  { "menuname": "mylead", "title": languageConfig.mylead, "screenname": "MyLeadScreen", "colorcode": "#B366FF", "imageurl": IMAGE.PORTFOLIO, "height": 30, "width": 30 },
  { "menuname": "attendance", "title": languageConfig.attendance, "screenname": "AttendanceScreen", "colorcode": "#CFD13B", "imageurl": IMAGE.ATTENDANCE_ICON, "height": 30, "width": 30 },
  { "menuname": "calender", "title": languageConfig.calender, "screenname": "CalendarScreen", "colorcode": "#FF8D7F", "imageurl": IMAGE.CALENDER_ICON, "height": 30, "width": 30 },
  { "menuname": "booking", "title": languageConfig.bookholiday, "screenname": "MyBookingScreen", "colorcode": "#FCD138", "imageurl": IMAGE.IC_LIBRARY, "height": 30, "width": 30 },
  { "menuname": "appointment", "title": languageConfig.myappointment, "screenname": "AppointmentScreen", "colorcode": "#F2542C", "imageurl": IMAGE.ATTENDANCE_ICON, "height": 30, "width": 30 },
  { "menuname": "event", "title": languageConfig.event, "screenname": "EventScreen", "colorcode": "#C889F2", "imageurl": IMAGE.IC_EVENT, "height": 30, "width": 30 },
  { "menuname": "salary", "title": languageConfig.mysalary, "screenname": "SalaryScreen", "colorcode": "#4B9E47", "imageurl": IMAGE.PAYMENT_ICON, "height": 30, "width": 33 },
  { "menuname": "leave", "title": languageConfig.myleave, "screenname": "LeaveScreen", "colorcode": "#91479E", "imageurl": IMAGE.IC_PRESCRIPTION, "height": 30, "width": 30 },
  { "menuname": "timesheet", "title": languageConfig.timesheet, "screenname": "TimesheetScreen", "colorcode": "#757FD9", "imageurl": IMAGE.TIMELINEICON, "height": 30, "width": 30 },
  { "menuname": "claim", "title": languageConfig.myclaim, "screenname": "MyClaimScreen", "colorcode": "#EB4034", "imageurl": IMAGE.CLAIMICON, "height": 30, "width": 30 },
  { "menuname": "announcement", "title": languageConfig.announcement, "screenname": "AnnouncementScreen", "colorcode": "#CFD03B", "imageurl": IMAGE.NOTICE_OUTLINE, "height": 30, "width": 30 },
  { "menuname": "team", "title": languageConfig.team, "screenname": "MyTeamScreen", "colorcode": "#0099EB", "imageurl": IMAGE.IC_GROUP, "height": 30, "width": 30 },
  { "menuname": "support", "title": languageConfig.support, "screenname": "SupportScreen", "colorcode": "#F9C688", "imageurl": IMAGE.SUPPORT_ICON, "height": 40, "width": 21 },
  { "menuname": "referfriend", "title": languageConfig.referfriend, "screenname": "ReferFriendScreen", "colorcode": "#9E7347", "imageurl": IMAGE.REFERICON, "height": 30, "width": 30 },
];

//HOME SCREEN FUNCTION
const HomeScreen = (props) => {
  const [loading, setloading] = useState(true);
  const [backgroungImage, setBackgroungImage] = useState(null);
  const [mobileapppermissions, setMobileAppperMissions] = useState(null);
  const [scanIconVisible, setScanIconVisible] = useState(false);
  const [sharedIconVisible, setSharedIconVisible] = useState(false);
  const [notificationIconVisible, setNotificationIconVisible] = useState(false);
  const [notification, setNotification] = useState(0);
  const [userDesignation, setUserDesignation] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [photoCounter, setPhotoCounter] = useState(0);
  const [shareusAndroid, setSharesAndroid] = useState(null);
  const [shareusIos, setShareUsIos] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [todayAttendTime, setTodayAttendTime] = useState(null);
  const [timerShow, setTimerShow] = useState(false);
  const [interNetStatus, setInterNetStatus] = useState(false);
  const [visibleModel, setVisibleModel] = useState(false);
  const [attendencesList, setAttendencesList] = useState([]);
  const [userJoinDate, setUserJoinDate] = useState(null);
  const [totalCF, setTotalCF] = useState(0);

  let currentTime = moment();
  let checkinTime = moment(todayAttendTime && todayAttendTime.checkin);
  let checkoutTime = moment(todayAttendTime && todayAttendTime.checkout);
  let duration = moment.duration(currentTime.diff(checkinTime));
  let finalcal = moment.utc(duration.as('milliseconds')).format('HH:mm:ss');

  let currentTimefinal = moment(todayAttendTime && todayAttendTime.checkout);
  let durationtime = moment.duration(currentTimefinal.diff(checkinTime));
  let totalTime = moment.utc(durationtime.as('milliseconds')).format('HH:mm:ss');
  //let finalcalbreaktime = moment.duration(currentTime.diff(checkoutTime)).asMinutes();
  const [dt, setDt] = useState(moment.utc(duration.as('milliseconds')).format('HH:mm:ss'));
  let getuserid, appVersionCode, androidUrl, iosUrl;

  useFocusEffect(
    React.useCallback(() => {
      const getCallBackScreen = async () => {
        var userInfo = await LocalService.LocalStorageService();
        getuserid = userInfo?._id;
        await RemoteController();
        setUserInfo(userInfo);
        setUserDesignation(userInfo?.designationid?.title ? userInfo?.designationid?.title : "---");
        setUserName(userInfo?.fullname);
        setUserID(userInfo?._id);
        getNotification(userInfo?._id);
        getCheckinTime(userInfo?._id);
        setUserProfilePic(userInfo?.profilepic);
        setUserJoinDate(userInfo?.property?.joiningdate ? userInfo.property.joiningdate : userInfo?.property?.date_of_joining)
      }
      getCallBackScreen();
    }, [])
  );

  useEffect(() => {
    //LANGUAGE MANAGEMENT FUNCTION
    MemberLanguage();
    inetrnetChecker();
    // CHECK REMOTECONTROLLER USE TO AUTOCONFIG APP
    RemoteController();
    getUserDeatilsLocalStorage();
    MenuPermission();
    getGalleryImages();
  }, []);

  useEffect(() => {
  }, [loading, backgroungImage, scanIconVisible, sharedIconVisible, notificationIconVisible, photoCounter,
    todayAttendTime, timerShow, mobileapppermissions, notification, userDesignation, userName, userID,
    timerShow, userProfilePic, shareusAndroid, shareusIos, userInfo, interNetStatus, visibleModel,
    userJoinDate, totalCF
  ])

  //Get CheckIn time
  const getCheckinTime = async (userid) => {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    let data = {
      date: today,
      id: userid,
    }
    try {
      const checkindatetime = await AttendanceService.getTodayAttendenceService(data);
      if (checkindatetime.data && checkindatetime.data.length > 0) {
        setTodayAttendTime(checkindatetime.data[0]);
        if (checkindatetime.data[0] && checkindatetime.data[0].property && checkindatetime.data[0].property.mode === 'checkin') {
          setTimerShow(true);
          let secTimer = setInterval(() => {
            setDt(new Date().toLocaleString())
          }, 100)
          return () => clearInterval(secTimer);
        } else {
          setTimerShow(false);
        }
      }
    } catch (error) {
      firebase.crashlytics().recordError(error);
      console.log(`error`, error);
    }
  }

  //check permission Function
  const checkPermission = () => {
    setTimeout(
      () => {
        MyPermissionController.checkAndRequestStoragePermission()
          .then((granted) => { })
          .catch((err) => console.log(err))
      },
      500
    );
  }

  //TIME OUT FUNCTION
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  // REMOTECONTROLLER USE TO AUTOCONFIG APP
  const RemoteController = async () => {
    var getUser = await AsyncStorage.getItem(REMOTEDATA);
    var userData = JSON.parse(getUser);
    if (userData) {
      setBackgroungImage(userData.homeimage);
      setScanIconVisible(userData.scanicon);
      setSharedIconVisible(userData.sharedicon);
      setNotificationIconVisible(userData.notificationicon);
      setSharesAndroid(userData.playstoreid);
      setShareUsIos(userData.appstoreid);
      if (Platform.OS === KEY.IOS) {
        appVersionCode = userData.appstoreversioncode;
      } else {
        appVersionCode = userData.appversioncode;
      }
      androidUrl = userData.playstoreid;
      iosUrl = userData.appstoreid;
    };
  };

  //GET USER DATA IN MOBILE LOCAL STORAGE
  const getUserDeatilsLocalStorage = async () => {
    var userInfo = await LocalService.LocalStorageService();
    if (userInfo) {
      getuserid = userInfo?._id;
      setUserInfo(userInfo);
      setUserDesignation(userInfo?.designationid?.title ? userInfo?.designationid?.title : "---");
      setUserName(userInfo?.fullname);
      setUserID(userInfo?._id);
      getUserDeatils(userInfo?._id);
      getCheckinTime(userInfo?._id);
      getNotification(userInfo?._id);
      setUserProfilePic(userInfo?.profilepic);
      setTotalCF(userInfo.cf ? userInfo.cf : 0);
      setUserJoinDate(userInfo?.property?.date_of_joining ? userInfo?.property?.date_of_joining : "---")
      PushNotifications();
      getAttendenceService(userInfo?._id);
      await getAppVersion(appVersionCode);
    }
  }

  //GET USER DATA USEING API CALL
  const getUserDeatils = async (id) => {
    if (interNetStatus) {
      try {
        const response = await getByIdUserService(id);
        if (response.data != null && response.data != 'undefind' && response.status == 200) {
          if (response.data.message === 'You do not have permission') {
            setloading(false);
            LocalService.RemoveAuthenticateUser();
            props.navigation.replace(SCREEN.AUTH);
          } else {
            Toast.show(languageConfig.welcometext, Toast.SHORT);
            LocalService.AuthenticateUser(response.data);
          }
        }
      } catch (error) {
        setloading(false);
        firebase.crashlytics().recordError(error);
        //LocalService.RemoveAuthenticateUser();
        props.navigation.replace(SCREEN.AUTH);
      }
    }
  }

  //GET IMAGE GALLERY COUNT API DATA GET
  const getGalleryImages = async () => {
    try {
      const response = await GalleryService();
      if (response.data != null && response.data != 'undefind' && response.status == 200) {
        setPhotoCounter(response.data.length);
      }
    } catch (error) {
      firebase.crashlytics().recordError(error);
    }
  }

  //CHECK MENU PERMISSION FUNCTION
  const MenuPermission = async () => {
    var userInfo = await LocalService.LocalStorageService();
    if (userInfo) {
      let mobileapppermissions = userInfo.role.mobileapppermissions;
      let finalMenuPermission = [];
      MenuDefaultArray.forEach(menuEle => {
        mobileapppermissions.forEach(MobileEle => {
          if (menuEle.menuname === MobileEle) {
            finalMenuPermission.push(menuEle)
          }
        });
      });
      setMobileAppperMissions(finalMenuPermission);
    }
  }

  //GET IMAGE GALLERY COUNT API DATA GET
  const getNotification = async (id) => {
    try {
      const response = await NotificationService(id);
      setNotification(response.data.length);
    } catch (error) {
      firebase.crashlytics().recordError(error);
    }
  }

  //MENU RENDER FUNCTION
  const renderMenu = (item) => (
    <TouchableOpacity onPress={() => props.navigation.navigate(item.item.screenname)} style={{ marginBottom: 0 }}>
      <View style={styles(item.item.colorcode).viewSquareTwoColumn}>
        <View style={{
          height: 65, width: 65, marginBottom: 10, backgroundColor: item.item.colorcode, borderRadius: 100,
          justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 15, alignSelf: KEY.CENTER, marginLeft: -5
        }}>
          <Image source={item.item.imageurl} style={{ height: item.item.height, width: item.item.width }} />
        </View>
        <Text numberOfLines={1}
          style={{
            flex: 1, textAlign: KEY.CENTER, alignItems: KEY.CENTER, justifyContent: KEY.CENTER,
            alignSelf: KEY.CENTER, fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.MENU_TEXT_COLOR
          }}>
          {item.item.title}</Text>
      </View>
    </TouchableOpacity>
  )

  //PUSHNOTIFICATION BACKGROUND FUNCTION
  const PushNotifications = async () => {
    let fcmToken = await firebase.messaging().getToken();
    if (fcmToken != undefined) {
      getFcmToken(fcmToken);
    }
    //PUSH NOTIFICATION FUNCTION
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        //console.log(`token.token`, token.token)
        //getFcmToken(token.token)
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
        if (notification.foreground) {
          notification.data = {
            message: notification.message,
            title: notification.title
          }
          //   console.log("NOTIFICATION:", notification);
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        // console.log("ACTION:", notification.action);
        // console.log("NOTIFICATION:", notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      senderID: MESSAGINGSENDERID,
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }

  //GET MESSAGE TOKEN
  const getFcmToken = async (fcmToken) => {
    let uniqueId;
    let deviceInfo;
    if (Platform.OS === 'android') {
      uniqueId = await DeviceInfo.getAndroidId()
      if (fcmToken) {
        deviceInfo = {
          anroiddevice: {
            "deviceid": uniqueId,
            "registrationid": fcmToken
          }
        }
        await UserPatch(deviceInfo);
      }
    } else {
      uniqueId = await DeviceInfo.getUniqueId();
      if (fcmToken) {
        deviceInfo = {
          iosdevice: {
            "deviceid": uniqueId,
            "registrationid": fcmToken
          }
        }
        await UserPatch(deviceInfo);
      }
    }
  }

  //UPDATE USER INFORMATION API CALL
  const UserPatch = async (deviceInfo) => {
    try {
      const response = await patchUserService(getuserid, deviceInfo);
      if (response.data != null && response.data != 'undefind' && response.status == 200) {
        console.log(`UPDATE DONE`);
      }
    }
    catch (error) {
      firebase.crashlytics().recordError(error);
    }
  }

  //ALERT BUTTON APP VERSIONCODE
  const checkAlertResponse = () =>
    Alert.alert(
      languageConfig.warning,
      Platform.OS === KEY.IOS ?
        languageConfig.homeupdatemessage
        : languageConfig.homeupdatemessage2,
      [
        {
          text: languageConfig.closetext,
          onPress: () => {
            if (Platform.OS === KEY.IOS) {
              RNExitApp.exitApp();
            } else {
              RNExitApp.exitApp();
            }
          }
        },
        {
          text: languageConfig.updatenow, onPress: () => {
            if (Platform.OS === KEY.IOS) {
              Linking.openURL(`itms-apps://apps.apple.com/id/app/${iosUrl}`);
            } else {
              Linking.openURL(`market://details?id=${androidUrl}`);
            }
          }
        }
      ]
    );

  //CHECK APP VERSIONCODE
  const getAppVersion = (value) => {
    const appVersionCode = DeviceInfo.getVersion();
    if (appVersionCode != value) {
      return checkAlertResponse();
    }
  }

  //SHARE BUTTON CLICK
  const onPressShareButton = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message: `Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=${androidUrl}&hl=en`,
        url: `https://play.google.com/store/apps/details?id=${androidUrl}&hl=en`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  //LogOut Button click to call 
  const onPressLogout = (todayAttendTime) => {
    Alert.alert(
      `${todayAttendTime?.property?.mode === 'checkin' ? languageConfig.checkout : languageConfig.checkin}`,
      `Are you sure you want to ${todayAttendTime?.property?.mode === 'checkin' ? languageConfig.checkout : languageConfig.checkin}`,
      [
        {
          text: languageConfig.cancel,
          style: "cancel"
        },
        {
          text: `${todayAttendTime?.property?.mode === 'checkin' ? languageConfig.checkout : languageConfig.checkin}`, onPress: () => {
            props.navigation.navigate(SCREEN.SCANNERSCREEN, { item: todayAttendTime });
            checkPermission();
          }
        }
      ]
    );
  }

  //Scan icon in check day in time
  const checkDayInTime = async () => {
    setloading(true);
    var today = new Date();
    let startDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    let endDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
    let data = {
      id: userID,
      datRange: { gte: startDateTime, lte: endDateTime }
    }
    try {
      const checkindatetime = await AttendanceService.AttendenceService(data);
      if (checkindatetime.data && checkindatetime.data.length > 0 && checkindatetime.data[0] && checkindatetime.data[0].property && checkindatetime.data[0].property.mode === 'checkin') {
        setloading(false);
        onPressLogout(checkindatetime.data[0]);
      } else {
        setloading(false);
        props.navigation.navigate(SCREEN.SCANNERSCREEN, { item: checkindatetime.data[0] })
      }
    } catch (error) {
      setloading(false);
      firebase.crashlytics().recordError(error);
      console.log(`error`, error);
    }
  }

  //VIEW PROFILE PICTURE 
  const onTouchViewProfile = () => {
    let viewimage = userProfilePic ? userProfilePic : DEFAULTPROFILE;
    props.navigation.navigate(SCREEN.VIEWIMAGESCREEN, { viewimage });
  }

  //INTERNER CHECKER FUNCTION
  const inetrnetChecker = () => {
    NetInfo.fetch().then(state => {
      setInterNetStatus(state.isConnected);
      setVisibleModel(state.isConnected === false ? true : false);
    });
  }

  //MODEL POPUP OPEN IN TRY AGAIN CLICK TO CALL
  const onRetry = () => {
    setloading(true);
    RemoteController();
    getUserDeatilsLocalStorage();
    MenuPermission();
    getGalleryImages();
    setVisibleModel(false);
    inetrnetChecker();
  }

  //get Attendence list api
  const getAttendenceService = (id) => {
    try {
      return AttendanceService.getLastAttendenceService(id).then(response => {
        setAttendencesList(response.data);
        setloading(false);
      })
    } catch (error) {
      console.log(`error`, error);
      firebase.crashlytics().recordError(error);
      setloading(false);
    }
  }

  //RENDER ATTANDENCE LIST USING FLATLIST
  const renderAllAttendencesList = ({ item }) => (
    <View style={styles().cardView}>
      <View style={styles().filledBox}>
        <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_BOLD, color: COLOR.WHITE }}>{moment(item.checkin).format('DD')}</Text>
        <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_BOLD, color: COLOR.WHITE }}>{moment(item.checkin).format('MMM')}</Text>
      </View>
      <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
        <Text style={styles().rectangleText}>CheckIn Time : {moment(item.checkin).format('h:mm:ss A')}</Text>
        {item.checkout && <Text style={styles().rectangleText}>{languageConfig.checkouttime + ' : ' + moment(item.checkout).format('h:mm:ss A')}</Text>}
        <Text style={styles().rectangleText}>Total Time : {getCalculateTime(item)}</Text>
      </View>
    </View>
  )

  //Calculate Total Time
  const getCalculateTime = (item) => {
    let checkinTime = moment(item && item.checkin);
    let checkoutTime = moment(item && item.checkout);
    let duration = moment.duration(checkoutTime.diff(checkinTime));
    let finalcal = moment.utc(duration.as('milliseconds')).format('HH:mm:ss');
    return finalcal;
  }

  return (
    !visibleModel ?
      <SafeAreaView style={{ flex: 1, alignItems: KEY.CENTER, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
        <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSCOLOR} barStyle={KEY.DARK_CONTENT} />
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
          <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 10 }}>
            <View style={styles().viweRound}>
              <View style={{ height: 99, width: 99, borderColor: COLOR.DEFALUTCOLOR, borderRadius: 100, borderWidth: 2 }}>
                <Image source={!userProfilePic ? IMAGE.USERPROFILE : { uri: userProfilePic }}
                  style={{ height: 95, width: 95, borderRadius: 100 }} />
              </View>
            </View>
            <Text style={styles().text} numberOfLines={1}>{userName}</Text>
          </View>

          {timerShow &&
            <View style={styles().viewMain1}>
              <View style={styles().viewRectangle1}>
                <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 5, alignSelf: KEY.FLEX_START, alignItems: KEY.CENTER }}>
                  <View style={styles().rounfIconStyle}>
                    <MaterialCommunityIcons name='timer-outline' size={24} color={COLOR.DEFALUTCOLOR} />
                  </View>
                  <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                    <View style={{ marginLeft: 15 }}>
                      <Text style={styles().rectangleText}>{languageConfig.checkintime}</Text>
                      <Text style={{
                        fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_BOLD
                      }}>{moment(checkinTime).format('DD MMM YYYY, h:mm:ss a')}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, alignItems: KEY.FLEX_END }}>
                    <TouchableOpacity style={styles().rectangleRound} onPress={() => checkDayInTime()}>
                      <Ionicons name='ios-log-out-outline' size={40} color={COLOR.DEFALUTCOLOR} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{
                  borderWidth: 0.3, marginTop: 0, borderColor: COLOR.BRIGHT_GRAY,
                  marginRight: 15, marginLeft: 15, width: WIDTH - 60
                }} />
                <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10, alignSelf: KEY.FLEX_START, alignItems: KEY.CENTER }}>
                  <View style={styles().rounfIconStyle}>
                    <MaterialCommunityIcons name='clock' size={24} color={COLOR.DEFALUTCOLOR} />
                  </View>
                  <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                    <View style={{ marginLeft: 15 }}>
                      <Text style={styles().rectangleText}>{languageConfig.totaltimetext}</Text>
                      {todayAttendTime && todayAttendTime.property && todayAttendTime.property.mode === 'checkout' ?
                        <Text style={{
                          fontSize: FONT.FONT_SIZE_16, textTransform: KEY.UPPERCASE, color: COLOR.BLACK,
                          fontWeight: FONT.FONT_WEIGHT_BOLD
                        }}>{totalTime}</Text>
                        : <Text style={{
                          fontSize: FONT.FONT_SIZE_16, textTransform: KEY.UPPERCASE, color: COLOR.BLACK,
                          fontWeight: FONT.FONT_WEIGHT_BOLD
                        }}>{finalcal}</Text>
                      }
                    </View>
                  </View>
                </View>
              </View>
            </View>
          }
          <View style={styles().viewMain1}>
            <View style={styles().viewRectangle1}>
              <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10, alignSelf: KEY.FLEX_START, alignItems: KEY.CENTER }}>
                <View style={styles().rounfIconStyle}>
                  <Fontisto name='date' size={18} color={COLOR.DEFALUTCOLOR} />
                </View>
                <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                  <View style={{ marginLeft: 15 }}>
                    <Text style={styles().rectangleText}>{languageConfig.joiningdate}</Text>
                    <Text style={{
                      fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                      fontWeight: FONT.FONT_WEIGHT_BOLD
                    }}>{userJoinDate ? moment(userJoinDate).format('DD MMM YYYY') : "---"}</Text>
                  </View>
                </View>
              </View>
              <View style={{
                borderWidth: 0.3, marginTop: 0, borderColor: COLOR.BRIGHT_GRAY,
                marginRight: 15, marginLeft: 15, width: WIDTH - 60
              }} />
              <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10, alignSelf: KEY.FLEX_START, alignItems: KEY.CENTER }}>
                <View style={styles().rounfIconStyle}>
                  <Ionicons name='person' size={24} color={COLOR.DEFALUTCOLOR} />
                </View>
                <View style={{ flexDirection: KEY.COLUMN, marginLeft: -2 }}>
                  <View style={{ marginLeft: 15 }}>
                    <Text style={styles().rectangleText}>{languageConfig.designationtext}</Text>
                    <Text style={{
                      fontSize: FONT.FONT_SIZE_16, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                      fontWeight: FONT.FONT_WEIGHT_BOLD
                    }}>{userDesignation}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles().viewMain}>
            {attendencesList && attendencesList.length > 0 &&
              <>
                <View style={{ marginTop: 10, marginLeft: 10 }} >
                  <Text style={styles().titletext}>{languageConfig.recentattendance}</Text>
                </View>
                <FlatList
                  data={attendencesList}
                  renderItem={renderAllAttendencesList}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item._id}
                  contentContainerStyle={{ paddingBottom: HEIGHT * 0.2 }}
                />
              </>
            }
          </View>
        </ScrollView>
        {
          todayAttendTime && todayAttendTime.property && todayAttendTime.property.mode === 'checkin' ?
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => checkDayInTime()}
              style={styles().scanBtnStyle}>
              <MaterialCommunityIcons name='qrcode-scan' size={25} color={COLOR.WHITE} />
              <Text style={{ fontSize: FONT.FONT_SIZE_14, fontWeight: FONT.FONT_BOLD, color: COLOR.WHITE, marginLeft: 10 }}>{"Scan for Check-out"}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => checkDayInTime()}
              style={styles().scanBtnStyle}>
              <MaterialCommunityIcons name='qrcode-scan' size={25} color={COLOR.WHITE} />
              <Text style={{ fontSize: FONT.FONT_SIZE_14, fontWeight: FONT.FONT_BOLD, color: COLOR.WHITE, marginLeft: 10 }}>{"Scan for Check-in"}</Text>
            </TouchableOpacity>
        }
        {loading ? <Loader /> : null}
      </SafeAreaView>
      :
      <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.DEFALUTCOLOR} barStyle={KEY.DARK_CONTENT} />

        {/* message model Pop */}
        <Modal
          animationType='slide'
          transparent={true}
          visible={visibleModel}
          animationInTiming={600}
          onRequestClose={() => setVisibleModel(!visibleModel)}
        >
          <View style={{ alignItems: KEY.CENTER, flex: 1 }}>
            <View style={{ position: KEY.ABSOLUTE, bottom: 0 }}>
              <View style={styles().modalContainer}>
                <Text style={styles().modalTitle}>{languageConfig.connectionerrortext}</Text>
                <Text style={styles().modalText}>
                  {languageConfig.connectionerrortext1}
                </Text>
                <Text style={styles().modalText}>
                  {languageConfig.connectionerrortext2}
                </Text>
                <TouchableOpacity style={styles().button} onPress={() => onRetry()}>
                  <Text style={styles().buttonText}>{languageConfig.tryagain}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
  );
}

export default HomeScreen;