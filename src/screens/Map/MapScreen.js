import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Pressable,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
// Function to get permission for location
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
const MapScreen = ({navigation}) => {
  // state to hold location
  const [location, setLocation] = useState(false);
  const [error, setError] = useState(null);
  const [locationEnable, setLocationEnable] = useState(false);
  const [isLocationSent, setIsLocationSent] = useState(false);
  const [address, setAddress] = useState(null);
  // function to check permissions and get Location
  const getLocation = () => {
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
        setLocationEnable(true);
      }
    });
  };

  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(async () => {
    setOrderNumber(JSON.parse(await AsyncStorage.getItem('userData')));
  }, []);

  // console.log('order number', location?.coords.longitude);

  const getAddress = async () => {
    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyCLmr10Fki0XLqeck5k3YdyeLchKOYvQ30`,
    );
    if (data) {
      console.log(data?.results[0]?.formatted_address);
      setAddress(data?.results[0]?.formatted_address);
    }
  };

  const sendLocation = async () => {
    const address = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyCLmr10Fki0XLqeck5k3YdyeLchKOYvQ30`,
    );

    console.log('address', address?.data?.results[0]?.formatted_address);

    if (address) {
      const payload = {
        orderNumber: orderNumber.orderNumber,
        driverCoordinates: address?.data?.results[0]?.formatted_address,
      };

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
    <View style={styles.container}>
      {/* <Text>Welcome!</Text> */}
      <View
        style={{
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          width: '40%',
          backgroundColor: '#970000',
          display: 'flex',
          alignItems: 'center',
        }}>
        <Pressable onPress={getLocation}>
          <Text className="text-white font-semibold text-lg">Get Location</Text>
        </Pressable>
      </View>
      <Text className="text-black font-semibold text-md mt-4">
        Latitude: {location ? location.coords.latitude : null}
      </Text>
      <Text className="text-black font-semibold text-md mb-4">
        Longitude: {location ? location.coords.longitude : null}
      </Text>

      <View
        style={{
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          width: '40%',
          backgroundColor: '#970000',
          display: 'flex',
          alignItems: 'center',
          opacity: !locationEnable ? 0.6 : 1,
        }}>
        <Pressable onPress={sendLocation} disabled={!locationEnable && true}>
          <Text className="text-white font-semibold text-lg">
            Send Location
          </Text>
        </Pressable>
      </View>
      {isLocationSent && (
        <Text className="text-red-500 mt-4">Location has been sent!</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default MapScreen;
