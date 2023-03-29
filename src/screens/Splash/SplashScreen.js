import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import bg from '../../assets/images/login-background.png';
import Logo from '../../assets/images/Logo.png';
import buildings from '../../assets/images/splash_build.png';
import truck from '../../assets/images/truck.png';
import React, {useEffect, useState} from 'react';

const SplashScreen = ({navigation}) => {
  const leftValue = useState(new Animated.Value(-300))[0];

  const moveTruck = () => {
    Animated.timing(leftValue, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    moveTruck();
  }, []);

  const [show, setShow] = useState(false);
  setTimeout(() => setShow(true), 3000);
  show ? navigation.navigate('login') : '';
  return (
    <ImageBackground className="flex-1 w-full h-full relative" source={bg}>
      <Image className="self-center items-center  mt-20" source={Logo} />
      <Image resizeMode="cover" className="w-full mt-20" source={buildings} />
      <Animated.Image
        source={truck}
        style={{
          marginTop: -130,
          transform: [{translateX: leftValue}],
        }}
      />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
