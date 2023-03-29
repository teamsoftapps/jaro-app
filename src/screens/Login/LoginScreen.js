import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import login_bg from '../../assets/images/login-background.png';
import Logo from '../../assets/images/Logo.png';
import location from '../../assets/images/location.png';
import input_bg from '../../assets/images/input_bg.png';
import order from '../../assets/images/order-icon.png';
import password from '../../assets/images/pass_icon.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [loginData, setLoginData] = useState({
    orderNumber: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const handleInput = async e => {
    e.preventDefault();
    // console.log('loginData>>>', loginData);

    const {data} = await axios.post(
      'http://10.0.2.2:4001/api/uploadCsv/appLogin',
      loginData,
    );

    console.log('data', data?.data);

    if (data && data?.data) {
      await AsyncStorage.setItem('userData', JSON.stringify(data?.data));
    }

    navigation.navigate('dashboard', {
      userData: data?.data[0],
    });

    resetForm();
  };

  const resetForm = () => {
    setLoginData({
      orderNumber: '',
      password: '',
    });
  };
  return (
    <ScrollView>
      <ImageBackground
        className="flex-1 w-full h-full relative"
        source={login_bg}>
        <Image className="self-center items-center mt-20" source={Logo} />
        <Image className="self-center mt-3" source={location} />

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
            <TouchableOpacity
              onPress={handleInput}
              className="mt-7 w-[70%] justify-center mr-auto ml-auto bg-[#970000] h-12 rounded">
              <Text className="self-center text-[18px] text-white">Login</Text>
            </TouchableOpacity>
            <Text className="self-center mt-1.5 text-red-700">{error}</Text>
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
