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
import React, { useState } from 'react';
import login_bg from '../../assets/images/login-background.png';
import Logo from '../../assets/images/Logo.png';
import location from '../../assets/images/location.png';
import input_bg from '../../assets/images/input_bg.png';
import order from '../../assets/images/order-icon.png';
import password from "../../assets/images/pass_icon.png"

const LoginScreen = () => {
const [loginData,setLoginData] = useState({
  orderNo:"",
  password:""
})
 const handleInput = (e) => {
  e.preventDefault()
  console.log("loginData>>>",loginData)
  resetForm()
 }
const resetForm = () => {
  setLoginData({
    orderNo:"",
    password:""
  })
}
  return (
    <ScrollView>
    <ImageBackground  className="flex-1 w-full h-full relative" source={login_bg}>
      <Image className="self-center items-center mt-20"  source={Logo} />
      <Image className="self-center mt-3" source={location} />

      <ImageBackground className="-mt-36  w-full h-full" source={input_bg}>
        <View className="w-9/12 ml-auto mr-auto mt-24" >
          <Text className="text-[#000000] text-[29px] font-semibold ">Login</Text>
          <Text>Please enter your login credential</Text>
          <View className="mt-2.5">
            <Text  className="text-[#000000] text-[13px] font-medium" >Order Number</Text>
            <View className="mt-2.5 flex flex-row items-center px-4 bg-[#EEEEEE] gap-x-2 rounded-lg">
              <Image source={order} />
              <TextInput
                className="w-full"
              value={loginData.orderNo}
              onChangeText={(val)=>setLoginData({...loginData,orderNo:val})}
                placeholder="#123456"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View className="mt-2.5" >
            <Text  className="text-[#000000] text-[13px] font-medium" >Password</Text>
            <View className="mt-2.5 flex flex-row items-center px-4 bg-[#EEEEEE] gap-x-2 rounded-lg" >
              <Image source={password} />
              <TextInput
              className="w-full  mt-1"
              value={loginData.password}
                secureTextEntry={true}
                placeholder="***********"
                onChangeText={(val)=>setLoginData({...loginData,password:val})}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleInput} className="mt-7 w-[70%] justify-center mr-auto ml-auto bg-[#970000] h-12 rounded" >
            <Text className="self-center text-[18px] text-white" >Login</Text>
          </TouchableOpacity >
          <Text className="self-center mt-1.5"  >Terms Of Use Privacy Policy</Text>
        </View>
      </ImageBackground>
    </ImageBackground>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
 
});
