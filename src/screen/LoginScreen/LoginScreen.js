import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, StyleSheet, SafeAreaView, ImageBackground,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import { LoginService } from '../../services/LoginService/LoginService';
import AsyncStorage from '@react-native-community/async-storage';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { REMOTEDATA } from '../../context/actions/type';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import STYLES from './Style';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default LoginScreen = (props) => {
    const [logo, setLogo] = useState(null);
    const [backgroungImage, setBackgroungImage] = useState(null);
    const [appLogoVisible, setAppLogoVisible] = useState(false);
    const [username, setUsername] = useState(null); //'telecaller1@gmail.com'
    const [password, setPassword] = useState(null); //'pass#123'
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const secondTextInputRef = React.createRef();

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        // check AuthController use to Login Or Not Login
        RemoteController();
        localStorageInfoCheck();
    }, []);

    useEffect(() => {
    }, [logo, backgroungImage, appLogoVisible, isChecked, username, password, usernameError, passwordError, loading]);

    const RemoteController = async () => {
        var getUser = await AsyncStorage.getItem(REMOTEDATA);
        var userData = JSON.parse(getUser);
        if (userData) {
            setLogo(userData.applogo)
            setBackgroungImage(userData.loginimage)
            setAppLogoVisible(userData.applogovisibleloginscreen)
        }
    };

    //check email validation
    const CheckUsername = (username) => {
        if (!username || username.length <= 0) {
            setUsername(null);
            setUsernameError(languageConfig.usernameerror);
            return;
        }
        setUsername(username);
        setUsernameError(null);
        return;
    }

    //check password validation
    const CheckPassword = (password) => {
        if (!password || password.length <= 0) {
            setPassword(null);
            setPasswordError(languageConfig.passwordrequiredtext);
            return;
        }
        setPassword(password);
        setPasswordError(null);
        return;
    }

    //add local storage Records
    const authenticateUser = (user) => (
        AsyncStorage.setItem(KEY.AUTHUSER, JSON.stringify(user))
    )

    //add local storage Records
    const setAuthUserInfo = (credentials) => (
        AsyncStorage.setItem(KEY.AUTHUSERINFO, JSON.stringify(credentials))
    )

    //add local storage Records
    const setAuthRemberUserInfo = (credentials) => (
        AsyncStorage.setItem(KEY.AUTHREMBERUSERINFO, JSON.stringify(credentials))
    )

    const onPressToLogin = async () => {
        if (!username || !password) {
            CheckUsername(username);
            CheckPassword(password);
            return;
        }
        const body = {
            username: username.trim(),
            password: password
        }
        setLoading(true);
        try {
            const response = await LoginService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                let token = response.data.user._id;
                //set header auth user key
                axiosConfig(token);
                authenticateUser(response.data.user);
                setAuthUserInfo(body);
                resetScreen();
                props.navigation.replace(SCREEN.DASHBOARD);
                Toast.show(languageConfig.loginsuccess, Toast.SHORT);
            }
        } catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            setPassword(null);
            setPasswordError(null);
            setLoading(false);
            Toast.show(languageConfig.wrongusererror, Toast.SHORT);
        }
    }

    //clear Field up data
    const resetScreen = () => {
        setUsername(null);
        setUsernameError(null);
        setPassword(null);
        setPasswordError(null);
        setLoading(false);
    }

    //check login info use to remember function
    const localStorageInfoCheck = async () => {
        const loginInfo = await LocalService.LocalRemberLoginStorageService();
        if (loginInfo == null) {
            LocalService.RemoveRemberLocalLoginStorageService();
            setIsChecked(false);
        } else {
            setUsername(loginInfo.username);
            setPassword(loginInfo.password);
            setIsChecked(true);
        }
    }

    //remember me function
    const rememberMe = async () => {
        if (isChecked) {
            setIsChecked(false);
            LocalService.RemoveRemberLocalLoginStorageService();
        } else {
            setIsChecked(true);
            const body = {
                username: username,
                password: password
            }
            setAuthRemberUserInfo(body);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={KEY.LIGHT_CONTENT} />
            <ImageBackground source={backgroungImage ? { uri: backgroungImage } : IMAGE.BACKGROUND_IMAGE} style={STYLES.backgroundImage}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={STYLES.containerView}>
                        {appLogoVisible ?
                            <Image source={logo ? { uri: logo } : IMAGE.MEMBROZ_LOGO} resizeMode={KEY.COVER}
                                style={STYLES.imageLogo} /> :
                            <View style={{ marginTop: HEIGHT / 3 }} />
                        }

                        <Text style={STYLES.welcomeText}>{languageConfig.welcometext}</Text>
                        <Text style={{ color: COLOR.WHITE, fontSize: 18, fontWeight: FONT.FONT_WEIGHT_BOLD, marginBottom: 45 }}>{languageConfig.logintext}</Text>

                        <View style={{ justifyContent: KEY.CENTER }}>
                            <TextInput
                                placeholder={languageConfig.usernameplaceholder}
                                placeholderTextColor={COLOR.WHITE}
                                selectionColor={COLOR.DEFALUTCOLOR}
                                returnKeyType={KEY.NEXT}
                                style={!usernameError ? STYLES.inputTextView : STYLES.inputTextViewError}
                                defaultValue={username}
                                blurOnSubmit={false}
                                autoCapitalize={KEY.NONE}
                                onSubmitEditing={() => secondTextInputRef.current.focus()}
                                onChangeText={(username) => CheckUsername(username)}
                            />
                            <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginBottom: 5, marginTop: -5 }}>{usernameError}</Text>
                        </View>

                        <View style={{ justifyContent: KEY.CENTER }}>
                            <TextInput
                                placeholder={languageConfig.passwordplaceholder}
                                placeholderTextColor={COLOR.WHITE}
                                selectionColor={COLOR.DEFALUTCOLOR}
                                returnKeyType={KEY.DONE}
                                style={!passwordError ? STYLES.inputTextView : STYLES.inputTextViewError}
                                secureTextEntry={true}
                                defaultValue={password}
                                blurOnSubmit={false}
                                ref={secondTextInputRef}
                                autoCapitalize={KEY.NONE}
                                onSubmitEditing={() => { Keyboard.dismiss(), onPressToLogin() }}
                                onChangeText={(password) => CheckPassword(password)}
                            />
                            <Text style={{ marginLeft: 10, fontSize: FONT.FONT_SIZE_16, color: COLOR.ERRORCOLOR, marginBottom: 5, marginTop: -5 }}>{passwordError}</Text>
                        </View>
                        <TouchableOpacity style={STYLES.loginBtn} onPress={() => onPressToLogin()}>
                            <Text style={{ fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>{languageConfig.loginbtn}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: KEY.ROW, marginTop: 20, alignItems: KEY.CENTER,
                        justifyContent: KEY.SPACEBETWEEN, marginLeft: 20, marginRight: 20
                    }}>
                        <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                            {
                                isChecked == true ?
                                    <TouchableOpacity onPress={() => rememberMe()}>
                                        <MaterialCommunityIcons size={25}
                                            color={COLOR.WHITE} name='check-box-outline'
                                            style={{ margin: 0 }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => rememberMe()}>
                                        <MaterialCommunityIcons size={25}
                                            color={COLOR.WHITE}
                                            name='checkbox-blank-outline'
                                            style={{ margin: 0 }} />
                                    </TouchableOpacity>
                            }
                            <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16, marginLeft: 2 }}>{languageConfig.remembertext}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.FORGOTPASSWORDSCREEN), resetScreen() }}>
                            <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>{languageConfig.forgetpasswordtext}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ paddingVertical: 50 }} /> */}
                </ScrollView>
            </ImageBackground>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}


