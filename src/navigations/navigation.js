import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SPLASHSCREEN from '../screen/SplashScreen/SplashScreen';
import HOMESCREEN from '../screen/HomeScreen/HomeScreen';
import LOGINSCREEN from '../screen/LoginScreen/LoginScreen';
import PROFILESCREEN from '../screen/ProfileScreen/ProfileScreen';
import UPDATEPROFILESCREEN from '../screen/ProfileScreen/UpdateProfileScreen';
import FORGOTPASSWORDSCREEN from '../screen/ForgotPasswordScreen/ForgotPasswordScreen';
import NOTIFICATIONSCREEN from '../screen/HomeScreen/NotificationScreen';
import GALLERYSCREEN from '../screen/HomeScreen/GalleryScreen';
import CALENDARSCREEN from '../screen/CalendarScreen/CalendarScreen';
import SUPPORTSCREEN from '../screen/SupportScreen/SupportScreen';
import SUPPORTTICKETSCREEN from '../screen/SupportScreen/SupportTicketScreen';
import PASSWORDCHANGESCREEN from '../screen/ProfileScreen/PasswordChangeScreen';
import VIEWIMAGE from '../screen/HomeScreen/ViewImage';
import WEBVIEWSCREEN from '../screen/WebViewScreen/WebViewScreen';
import NEWPASSWORDSCREEN from '../screen/ForgotPasswordScreen/NewPasswordScreen';
import TASKSCREEN from '../screen/TaskScreen/TaskScreen';
import TICKETHISTORYSCREEN from '../screen/SupportScreen/TicketHistoryScreen';
import ANNOUNCEMENTSCREEN from '../screen/AnnouncementScreen/AnnouncementScreen';
import ADDLEAVESCREEN from '../screen/LeaveScreen/AddLeaveScreen';
import LEAVESCREEN from '../screen/LeaveScreen/LeaveScreen';
import MYCLAIMSCREEN from '../screen/MyClaimScreen/MyClaimScreen';
import ADDCLAIMSCREEN from '../screen/MyClaimScreen/AddClaimScreen';
import MYTEAMSCREEN from '../screen/MyTeamScreen/MyTeamScreen';
import REFERFRIENDREQUEST from '../screen/Refer_a_friend_screen/ReferFriendRequest';
import REFERFRIENDSCREEN from '../screen/Refer_a_friend_screen/ReferFriendScreen';
import SALARYSCREEN from '../screen/SalaryScreen/SalaryScreen';
import TIMESHEETSCREEN from '../screen/TimesheetScreen/TimesheetScreen';
import ATTENDANCESCREEN from '../screen/AttendanceScreen/AttendanceScreen';
import SCANNERSCREEN from '../screen/HomeScreen/ScannerScreen';
import VIEWIMAGESCREEN from '../screen/ViewImageScreen/ViewImageScreen';
import MENUSCREEN from '../screen/MenuScreen/MenuScreen';

import * as IMAGE from '../styles/image';
import * as COLOR from '../styles/colors';
import * as FONT from '../styles/typography';
import * as KEY from '../context/actions/key';
import * as SCREEN from '../context/screen/screenName';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Image, Button, Platform,
    TouchableOpacity, View, Text
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as LocalService from '../services/LocalService/LocalService';
import languageConfig from '../languages/languageConfig';
import { MemberLanguage } from '../services/LocalService/LanguageService';
import AsyncStorage from '@react-native-community/async-storage';
import { NotificationService } from '../services/NotificationService/NotificationService';
import { firebase } from '@react-native-firebase/crashlytics';

const AuthStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const TaskStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const GalleryStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//STATIC DATA
let MenuDefaultArray = [
    { "menuname": "task" },
    { "menuname": "gallery" }
];

//Structure for the navigatin Drawer
const NavigationDrawerStructureRight = (props) => {
    const [userID, setUserID] = useState(null);
    const [notification, setNotification] = useState(0);

    useEffect(() => {
        AsyncStorage.getItem(KEY.AUTHUSER).then((res) => {
            if (res) {
                let userid = JSON.parse(res)._id;
                setUserID(userid);
                getNotification(userid);
            }
        });
    }, [])

    useEffect(() => {
    }, [userID, notification])

    //get notification function
    const getNotification = async (id) => {
        try {
            const response = await NotificationService(id);
            setNotification(response.data.length)
        } catch (error) {
            firebase.crashlytics().recordError(error);
        }
    }
    return (
        <TouchableOpacity
            onPress={() => props.navigationProps.navigate(SCREEN.NOTIFICATIONSCREEN)}
            style={{ alignItems: KEY.FLEX_END, marginRight: 5, marginTop: 10, height: 30, width: 30 }}>
            <Ionicons name="notifications-outline" size={25} color={COLOR.BLACK} style={{ marginTop: -0 }} />
            <View style={{
                marginRight: -5, marginTop: -35, height: 22, width: 22,
                borderRadius: 100, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, backgroundColor: COLOR.DEFALUTCOLOR
            }}>
                <Text style={{ fontWeight: FONT.FONT_BOLD, fontSize: 12, color: COLOR.WHITE }}>{notification}</Text>
            </View>
        </TouchableOpacity>
    );
}

//Structure for the navigatin Drawer
const NavigationDrawerStructureLeft = (props) => {
    const [memberInfo, setMemberInfo] = useState(false);

    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, [])

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberInfo(true);
        }
    }

    useEffect(() => {
    }, [memberInfo])

    return (
        <TouchableOpacity onPress={() => props.navigationProps.navigate(SCREEN.MENUSCREEN)} >
            <Image
                source={IMAGE.MENUICON}
                style={{
                    width: 27,
                    height: 18,
                    marginLeft: 0,
                    tintColor: COLOR.BLACK
                }}
            />
        </TouchableOpacity>
    )
}

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShadowVisible: false }}>
            <AuthStack.Screen
                name="LoginScreen"
                component={LOGINSCREEN}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen name="ForgotPasswordScreen" component={FORGOTPASSWORDSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.forgotpassword,
                headerTintColor: Platform.OS == 'android' ? COLOR.WHITE : COLOR.DEFALUTCOLOR,
                headerTransparent: true
            }} />
            <AuthStack.Screen name="NewPasswordScreen" component={NEWPASSWORDSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.forgotpassword,
                headerTintColor: Platform.OS == 'android' ? COLOR.WHITE : COLOR.DEFALUTCOLOR,
                headerTransparent: true
            }} />
        </AuthStack.Navigator>
    );
}

// const ProfileStackScreen = ({ navigation }) => {
//     return (
//         <ProfileStack.Navigator initialRouteName="ProfileScreen" screenOptions={{ headerShadowVisible: false }}>
//             <ProfileStack.Screen name="ProfileScreen" component={PROFILESCREEN} options={{
//                 headerTitleAlign: KEY.CENTER,
//                 title: languageConfig.profile,
//                 headerTintColor: COLOR.BLACK,
//                 headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
//                 headerLeft: () =>
//                     <NavigationDrawerStructureLeft
//                         navigationProps={navigation}
//                     />,
//                 headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
//             }} />
//             <ProfileStack.Screen name="PasswordChangeScreen" component={PASSWORDCHANGESCREEN} options={{
//                 headerTitleAlign: KEY.CENTER,
//                 title: languageConfig.changepassword,
//                 headerTintColor: COLOR.BLACK,
//                 headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR }
//             }} />
//             <ProfileStack.Screen name="UpdateProfileScreen" component={UPDATEPROFILESCREEN} options={{
//                 headerTitleAlign: KEY.CENTER,
//                 title: languageConfig.updateprofile,
//                 headerTintColor: COLOR.BLACK,
//                 headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR }
//             }} />
//         </ProfileStack.Navigator>
//     );
// }

// const TaskStackScreen = ({ navigation }) => {
//     return (
//         <TaskStack.Navigator initialRouteName="TaskScreen" screenOptions={{ headerShadowVisible: false }}>
//             <TaskStack.Screen name="TaskScreen" component={TASKSCREEN} options={{
//                 headerTitleAlign: KEY.CENTER,
//                 title: languageConfig.tasks,
//                 headerTintColor: COLOR.BLACK,
//                 headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
//                 headerLeft: () =>
//                     <NavigationDrawerStructureLeft
//                         navigationProps={navigation}
//                     />,
//                 headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
//             }} />
//         </TaskStack.Navigator>
//     );
// }

//Structure for the navigatin Drawer

const NavigationAddLeaveRight = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigationProps.navigate(SCREEN.ADDLEAVESCREEN)}
            style={{
                width: 80,
                height: 30,
                alignItems: KEY.CENTER,
                justifyContent: KEY.CENTER,
                borderRadius: 100,
                backgroundColor: COLOR.DEFALUTCOLOR,
                shadowColor: COLOR.BLACK,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
            }}>
            <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_12 }} >{"Add Leave"}</Text>
        </TouchableOpacity>
    );
}

//Structure for the navigatin Drawer
const NavigationAddClaimsRight = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigationProps.navigate(SCREEN.ADDCLAIMSCREEN)}
            style={{
                width: 80,
                height: 30,
                alignItems: KEY.CENTER,
                justifyContent: KEY.CENTER,
                borderRadius: 100,
                backgroundColor: COLOR.DEFALUTCOLOR,
                shadowColor: COLOR.BLACK,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
            }}>
            <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_12 }} >{"Add Claim"}</Text>
        </TouchableOpacity>
    );
}

//Structure for the navigatin Drawer
const NavigationAddReferFriendRight = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigationProps.navigate(SCREEN.REFERFRIENDREQUEST)}
            style={{
                width: 90,
                height: 30,
                alignItems: KEY.CENTER,
                justifyContent: KEY.CENTER,
                borderRadius: 100,
                backgroundColor: COLOR.DEFALUTCOLOR,
                shadowColor: COLOR.BLACK,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
            }}>
            <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_12 }} >{"Invite Friend"}</Text>
        </TouchableOpacity>
    );
}

//Structure for the navigatin Drawer
const NavigationAddSupportRight = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigationProps.navigate(SCREEN.SUPPORTTICKETSCREEN)}
            style={{
                width: 90,
                height: 30,
                alignItems: KEY.CENTER,
                justifyContent: KEY.CENTER,
                borderRadius: 100,
                backgroundColor: COLOR.DEFALUTCOLOR,
                shadowColor: COLOR.BLACK,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
            }}>
            <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_12 }} >{"Add Ticket"}</Text>
        </TouchableOpacity>
    );
}

// const GalleryStackScreen = ({ navigation }) => {
//     return (
//         <GalleryStack.Navigator GalleryScreen="GalleryScreen" screenOptions={{ headerShadowVisible: false }}>
//             <GalleryStack.Screen name="GalleryScreen" component={GALLERYSCREEN} options={{
//                 headerTitleAlign: KEY.CENTER,
//                 title: languageConfig.gallery,
//                 headerTintColor: COLOR.BLACK,
//                 headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
//                 headerLeft: () =>
//                     <NavigationDrawerStructureLeft
//                         navigationProps={navigation}
//                     />,
//                 headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
//             }} />
//             <GalleryStack.Screen name="ViewImage" component={VIEWIMAGE} options={{
//                 headerTitleAlign: KEY.CENTER,
//                 title: languageConfig.gallery,
//                 headerTintColor: COLOR.BLACK,
//                 headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
//                 headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
//             }} />
//         </GalleryStack.Navigator>
//     );
// }

const HomeStackScreen = ({ navigation }) => {
    return (
        <HomeStack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShadowVisible: false }} >
            <HomeStack.Screen
                name="HomeScreen"
                component={HOMESCREEN}
                options={{
                    title: 'Dashboard', //Set Header Title
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />
            <HomeStack.Screen
                name="MenuScreen"
                component={MENUSCREEN}
                options={{
                    title: '', //Set Header Title
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUNDCOLOR, //Set Header color
                    },
                    headerTintColor: COLOR.BLACK, //Set Header text color
                    headerTitleAlign: KEY.CENTER,
                    headerTitleStyle: {
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM, //Set Header text style
                    }
                }}
            />
            <HomeStack.Screen name="TaskScreen" component={TASKSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.tasks,
                headerTintColor: COLOR.BLACK,
                headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                headerLeft: () =>
                    <NavigationDrawerStructureLeft
                        navigationProps={navigation}
                    />,
                headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
            }} />
            <HomeStack.Screen name="ProfileScreen" component={PROFILESCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.profile,
                headerTintColor: COLOR.BLACK,
                headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                headerLeft: () =>
                    <NavigationDrawerStructureLeft
                        navigationProps={navigation}
                    />,
                headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />
            }} />
            <ProfileStack.Screen name="PasswordChangeScreen" component={PASSWORDCHANGESCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.changepassword,
                headerTintColor: COLOR.BLACK,
                headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR }
            }} />
            <HomeStack.Screen name="ViewImage" component={VIEWIMAGE} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.gallery,
                headerTintColor: COLOR.BLACK,
                headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />
            }} />
            <HomeStack.Screen name="ViewImageScreen" component={VIEWIMAGESCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: '',
                headerTintColor: COLOR.BLACK,
                headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR }
            }} />
            <HomeStack.Screen name="UpdateProfileScreen" component={UPDATEPROFILESCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.updateprofilebtn,
                headerTintColor: COLOR.BLACK,
                headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR }
            }} />
            <HomeStack.Screen name="NotificationScreen" component={NOTIFICATIONSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.notification,
                headerTintColor: COLOR.BLACK,
                headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR }
            }} />
            <HomeStack.Screen name="GalleryScreen" component={GALLERYSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.gallery,
                headerTintColor: COLOR.BLACK,
                headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                headerLeft: () =>
                    <NavigationDrawerStructureLeft
                        navigationProps={navigation}
                    />,
                headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
            }} />
            <HomeStack.Screen name="SupportScreen" component={SUPPORTSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.support,
                headerTintColor: COLOR.BLACK,
                headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                headerLeft: () => <NavigationDrawerStructureLeft navigationProps={navigation} />,
                headerRight: () => <NavigationAddSupportRight navigationProps={navigation} />,
            }} />
            <HomeStack.Screen name="CalendarScreen" component={CALENDARSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.calendar,
                headerTintColor: COLOR.BLACK,
                headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
            }} />
            <HomeStack.Screen name="SupportTicketScreen" component={SUPPORTTICKETSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.supportticketname,
                headerTintColor: COLOR.BLACK,
                headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
            }} />
            <HomeStack.Screen name="TicketHistoryScreen" component={TICKETHISTORYSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.tickethistory,
                headerTintColor: COLOR.BLACK,
                headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR }
            }} />
            <HomeStack.Screen name="AnnouncementScreen" component={ANNOUNCEMENTSCREEN} options={{
                headerTitleAlign: KEY.CENTER,
                title: languageConfig.announcement,
                headerTintColor: COLOR.BLACK,
                headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                headerLeft: () =>
                    <NavigationDrawerStructureLeft
                        navigationProps={navigation}
                    />,
                headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
            }} />
            <HomeStack.Screen name="AddLeaveScreen" component={ADDLEAVESCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: languageConfig.leaverequest,
                    headerTintColor: COLOR.BLACK,
                    headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR }
                }} />
            <HomeStack.Screen name="LeaveScreen" component={LEAVESCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: languageConfig.myleaves,
                    headerTintColor: COLOR.BLACK,
                    headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                    headerLeft: () => <NavigationDrawerStructureLeft navigationProps={navigation} />,
                    headerRight: () => <NavigationAddLeaveRight navigationProps={navigation} />,
                }} />
            <HomeStack.Screen name="MyClaimScreen" component={MYCLAIMSCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: languageConfig.MyClaims,
                    headerTintColor: COLOR.BLACK,
                    headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                    headerLeft: () => <NavigationDrawerStructureLeft navigationProps={navigation} />,
                    headerRight: () => <NavigationAddClaimsRight navigationProps={navigation} />,
                }} />
            <HomeStack.Screen name="AddClaimScreen" component={ADDCLAIMSCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: languageConfig.claimrequest,
                    headerTintColor: COLOR.BLACK,
                    headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR }
                }} />
            <HomeStack.Screen name="MyTeamScreen" component={MYTEAMSCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: languageConfig.teams,
                    headerTintColor: COLOR.BLACK,
                    headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                }} />
            <HomeStack.Screen name="ReferFriendRequest" component={REFERFRIENDREQUEST}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: languageConfig.referfriendtitle,
                    headerTintColor: COLOR.BLACK,
                    headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                }} />
            <HomeStack.Screen name="ReferFriendScreen" component={REFERFRIENDSCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: languageConfig.referfriendtitle,
                    headerTintColor: COLOR.BLACK,
                    headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                    headerLeft: () => <NavigationDrawerStructureLeft navigationProps={navigation} />,
                    headerRight: () => <NavigationAddReferFriendRight navigationProps={navigation} />,
                }} />
            <HomeStack.Screen name="SalaryScreen" component={SALARYSCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: languageConfig.mysalary,
                    headerTintColor: COLOR.BLACK,
                    headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR }
                }} />
            <HomeStack.Screen name="TimesheetScreen" component={TIMESHEETSCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: languageConfig.timesheettitle,
                    headerTintColor: COLOR.BLACK,
                    headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                }} />
            <HomeStack.Screen name="AttendanceScreen" component={ATTENDANCESCREEN}
                options={{
                    headerTitleAlign: KEY.CENTER,
                    title: languageConfig.attendancetitle,
                    headerTintColor: COLOR.BLACK,
                    headerStyle: { backgroundColor: COLOR.BACKGROUNDCOLOR },
                    headerLeft: () =>
                        <NavigationDrawerStructureLeft
                            navigationProps={navigation}
                        />,
                    headerRight: () => <NavigationDrawerStructureRight navigationProps={navigation} />,
                }} />
            <HomeStack.Screen name="ScannerScreen"
                component={SCANNERSCREEN}
                options={{ headerShown: false }} />
            <HomeStack.Screen
                name="WebViewScreen"
                component={WEBVIEWSCREEN}
                options={{ headerShown: false }}
            />
        </HomeStack.Navigator>
    );
};

// const TabNavigation = () => {
//     const [taskVisible, setTaskVisible] = useState(false);
//     const [galleryVisible, setGalleryVisible] = useState(false);
//     useEffect(() => {
//         //LANGUAGE MANAGEMENT FUNCTION
//         MemberLanguage();
//         MenuPermission();
//     }, []);
//     useEffect(() => {
//     }, [taskVisible, galleryVisible]);
//     //CHECK MENU PERMISSION FUNCTION
//     const MenuPermission = async () => {
//         var userInfo = await LocalService.LocalStorageService();
//         if (userInfo) {
//             let mobileapppermissions = userInfo.role.mobileapppermissions;
//             mobileapppermissions.forEach(MobileEle => {
//                 let filter = MenuDefaultArray.find(e => e.menuname == MobileEle);
//                 if (filter && filter != undefined && filter.menuname == 'task') {
//                     setTaskVisible(true);
//                 }
//                 if (filter && filter != undefined && filter.menuname == 'gallery') {
//                     setGalleryVisible(true);
//                 }
//             });
//         }
//     }
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, color, size }) => {
//                     if (route.name === 'Home') {
//                         return (
//                             <MaterialCommunityIcons
//                                 name={focused ? 'home' : 'home'}
//                                 size={25}
//                                 color={color}
//                                 style={{ marginTop: 5 }}
//                             />
//                         );
//                     } else if (route.name === 'Task') {
//                         return (
//                             <MaterialCommunityIcons
//                                 name={focused ? 'clipboard-text-outline' : 'clipboard-text-outline'}
//                                 size={25}
//                                 color={color}
//                                 style={{ marginTop: 5 }}
//                             />
//                         );
//                     } else if (route.name === 'Profile') {
//                         return (
//                             <FontAwesome
//                                 name={focused ? 'user' : 'user'}
//                                 size={25}
//                                 color={color}
//                                 style={{ marginTop: 5 }}
//                             />
//                         );
//                     } else if (route.name === 'Gallery') {
//                         return (
//                             <Entypo
//                                 name={focused ? 'images' : 'images'}
//                                 size={25}
//                                 color={color}
//                                 style={{ marginTop: 5 }}
//                             />
//                         );
//                     }
//                 },
//                 tabBarActiveTintColor: COLOR.DEFALUTCOLOR,
//                 tabBarInactiveTintColor: COLOR.LIGHT_BLACK,
//                 tabBarStyle: {
//                     height: Platform.OS == 'android' ? 55 : 60,
//                     borderTopRightRadius: 10,
//                     borderTopLeftRadius: 10,
//                     backgroundColor: COLOR.BACKGROUNDCOLOR,
//                 },
//                 tabBarLabelStyle: { fontSize: FONT.FONT_SIZE_14, textTransform: KEY.CAPITALIZE, marginBottom: 5 },
//                 tabBarHideOnKeyboard: true,
//                 headerTintColor: COLOR.BACKGROUNDCOLOR
//             })}
//             backBehavior="initialRoute"
//         >
//             <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false, title: languageConfig.home }} />
//             {
//                 taskVisible &&
//                 <Tab.Screen name="Task" component={TaskStackScreen} options={{ headerShown: false, title: languageConfig.task }} />
//             }
//             {
//                 galleryVisible &&
//                 <Tab.Screen name="Gallery" component={GalleryStackScreen} options={{ headerShown: false, title: languageConfig.gallery }} />
//             }
//             <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ headerShown: false, title: languageConfig.profile }} />
//         </Tab.Navigator>
//     );
// }

export default NavigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SPLASHSCREEN} options={{ headerShown: false }} />
                <Stack.Screen name="HomeStack" component={HomeStackScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Auth" component={AuthStackScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}