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
import React from 'react';
import login_bg from '../../assets/images/login-background.png';
import Logo from '../../assets/images/Logo.png';
import location from '../../assets/images/location.png';
import input_bg from '../../assets/images/input_bg.png';
import order from '../../assets/images/order-icon.png';
import password from "../../assets/images/pass_icon.png"

const LoginScreen = () => {
  return (
    <ScrollView>
    <ImageBackground  className="flex-1 w-full h-full relative" source={login_bg}>
      <Image className="self-center items-center mt-20" style={styles.logo} source={Logo} />
      <Image className="self-center mt-3" style={styles.location} source={location} />

      <ImageBackground className="-mt-36" style={styles.input_bg} source={input_bg}>
        <View style={styles.container}>
          <Text style={styles.text}>Login</Text>
          <Text>Please enter your login credential</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label} >Order Number</Text>
            <View style={styles.inputBox}>
              <Image source={order} />
              <TextInput
                style={styles.input}
                placeholder="#123456"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} >Password</Text>
            <View style={styles.inputBox}>
              <Image source={password} />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="#123456"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.loginBtn} >
            <Text style={styles.loginTxt} >Login</Text>
          </TouchableOpacity>
          <Text style={{alignSelf:"center",marginTop:5}} >Terms Of Use Privacy Policy</Text>
        </View>
      </ImageBackground>
    </ImageBackground>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  // bg: {
  //   flex: 1,
  //   width: '100%',
  //   height: '100%',
  //   position: 'relative',
  // },
  // logo: {
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 80,
  // },
  // location: {
  //   marginTop: 20,
  //   alignSelf: 'center',
  // },
  input_bg: {
    position: 'relative',
    marginTop: -150,
    width: '100%',
    height: '100%',
  },
  container: {

    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 100,
  },
  text: {
    fontSize:29,
    fontWeight:600,
      color:"#000000"
  },
  label:{
color:"#000000",
fontSize:13,
fontWeight:500
  },
  inputBox: {
    marginTop: 10,
    display:"flex",
    flexDirection:"row",
    gap:15,
    alignItems:"center",
    backgroundColor:"#EEEEEE",
    paddingHorizontal:15,
    borderRadius:10
  },
  inputContainer: {
    marginTop: 10,
  },
  loginBtn:{
    marginTop:30,
    width:"70%",
    marginLeft:"auto",
    marginRight:"auto",
    backgroundColor:"#970000",
    height:50,
    justifyContent:"center",
    borderRadius:5
  },
  loginTxt:{
    alignSelf:"center",
    color:"#fff",
    fontSize:18
  }
});
