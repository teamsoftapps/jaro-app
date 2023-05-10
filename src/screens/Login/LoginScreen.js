import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import login_bg from '../../assets/images/login-background.png';
import Logo from '../../assets/images/Logo.png';
import locationImage from '../../assets/images/location.png';
import locationEnableImage from '../../assets/images/location-enable-image.png';
import input_bg from '../../assets/images/input_bg.png';
import order from '../../assets/images/order-icon.png';
import password from '../../assets/images/pass_icon.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const LoginScreen = ({navigation}) => {
  const [loginData, setLoginData] = useState({
    orderNumber: null,
    password: null,
  });
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(false);
  const [locationEnable, setLocationEnable] = useState(false);
  const [isLocationSent, setIsLocationSent] = useState(false);
  const [driverAddress, setDriverAddress] = useState('');

  const handleInput = async e => {
    e.preventDefault();
    // console.log('loginData>>>', loginData);
    setError(null);

    try {
      sendLocation();

      const {data} = await axios.post(
        'https://jaro-backend.herokuapp.com/api/uploadCsv/appLogin',
        loginData,
      );

      console.log('data', data?.data);

      if (data && data?.data) {
        const payload = {
          user: data?.data,
          driverAddress: driverAddress,
        };
        await AsyncStorage.setItem('userData', JSON.stringify(payload));
        navigation.navigate('dashboard', {
          userData: data?.data[0],
        });
      }

      resetForm();
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  const resetForm = () => {
    setLoginData({
      orderNumber: null,
      password: null,
    });
    setLocationEnable(false);
    setLocation(false);
    setDriverAddress('');
  };

  //location

  const getLocation = async () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        console.log('location', location);
        setLocationEnable(true);
      }
    });
    console.log(location);
  };

  //send location after filling login form

  const sendLocation = async () => {
    const address = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyCLmr10Fki0XLqeck5k3YdyeLchKOYvQ30`,
    );

    console.log('address', address?.data?.results[0]?.formatted_address);

    if (address) {
      const payload = {
        orderNumber: loginData.orderNumber,
        driverCoordinates: address?.data?.results[0]?.formatted_address,
      };
      setDriverAddress(address?.data?.results[0]?.formatted_address);

      console.log('map payload', payload);

      const {data} = await axios.patch(
        'https://jaro-backend.herokuapp.com/api/uploadCsv/driverLocation',
        payload,
      );

      console.log('data', data);

      if (data) {
        setIsLocationSent(true);
        setTimeout(() => {
          navigation.navigate('dashboard');
        }, 2000);
      }
    }
    // setError(null);

    // resetForm();
  };

  return (
    <ScrollView>
      <ImageBackground className="flex h-screen relative" source={login_bg}>
        <Image className="self-center items-center mt-20" source={Logo} />

        {!locationEnable ? (
          <Pressable onPress={getLocation} className="z-50">
            <Image className="self-center mt-2 mb-4" source={locationImage} />
          </Pressable>
        ) : (
          <Pressable className="z-50">
            <Image
              className="self-center mt-2 mb-4 w-[156] h-[156]"
              source={locationEnableImage}
            />
          </Pressable>
        )}
        <ImageBackground className="-mt-36  w-full h-[100vh]" source={input_bg}>
          <View className="w-9/12 ml-auto mr-auto mt-24">
            <Text className="text-[#000000] text-[29px] font-semibold ">
              Login
            </Text>
            <Text>Please enter your login credential</Text>
            <View className="mt-2.5">
              <Text className="text-[#000000] text-[13px] font-medium">
                Order Number
              </Text>
              <View className="mt-2.5 flex flex-row items-center px-4 bg-[#EEEEEE] gap-x-2 rounded-lg">
                <Image source={order} />
                <TextInput
                  className="w-full"
                  value={loginData.orderNumber}
                  onChangeText={val =>
                    setLoginData({...loginData, orderNumber: val})
                  }
                  placeholder="#123456"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View className="mt-2.5">
              <Text className="text-[#000000] text-[13px] font-medium">
                Password
              </Text>
              <View className="mt-2.5 flex flex-row items-center px-4 bg-[#EEEEEE] gap-x-2 rounded-lg">
                <Image source={password} />
                <TextInput
                  className="w-full  mt-1"
                  value={loginData.password}
                  secureTextEntry={true}
                  placeholder="***********"
                  onChangeText={val =>
                    setLoginData({...loginData, password: val})
                  }
                />
              </View>
            </View>
            <Pressable
              onPress={handleInput}
              disabled={!locationEnable && true}
              className={`mt-7 w-[70%] justify-center mr-auto ml-auto bg-[#970000] h-12 rounded ${
                !locationEnable ? 'opacity-60' : 'opacity-100'
              }`}>
              <Text className="self-center text-[18px] text-white">Login</Text>
            </Pressable>

            {/* <Text className="self-center text-[18px] text-red-500">
              {error}
            </Text> */}
            {error && (
              <Text className="self-center mt-1.5 text-red-700">{error}</Text>
            )}
            {!locationEnable && loginData.orderNumber && loginData.password && (
              <Text className="self-center mt-1.5 text-red-700">
                Enable Location to Login
              </Text>
            )}
            <Text className="self-center mt-1.5">
              Terms Of Use Privacy Policy
            </Text>
          </View>
        </ImageBackground>
      </ImageBackground>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
