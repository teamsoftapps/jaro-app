import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import logo from '../../assets/images/Logo.png';
import truckIcon from '../../assets/images/truckIcon.png';
import boxIcon from '../../assets/images/truckIcon.png';
import line from '../../assets/images/Line.png';
import smartphone from '../../assets/images/Smartphone.png';
import navigation from '../../assets/images/navigationIcon.png';
import clock from '../../assets/images/clockIcon.png';
import buldingImage from '../../assets/images/dashboard-building-bg.png';
import logoutIcon from '../../assets/images/logoutIcon.png';

const Dashboard = () => {
  return (
    <ScrollView className="min-h-scree">
      <View className="bg-white flex items-center pt-10 pb-5 rounded-bl-3xl rounded-br-3xl shadow-sm shadow-black">
        <Image source={logo} style={{width: 180, height: 55}} />
      </View>

      <View className="mt-5 bg-white mx-5 rounded-3xl relative shadow-sm shadow-black">
        <View className="pl-5 pt-5">
          <Text className="font-semibold text-black text-xl">
            Order Details
          </Text>
        </View>

        <View className="flex flex-row items-center h-[170]">
          <View className="flex flex-col items-center w-20">
            <View>
              <Image source={boxIcon} />
            </View>

            <View>
              <Image source={line} />
            </View>

            <View>
              <Image source={truckIcon} />
            </View>
          </View>

          <View>
            <View>
              <Text className="text-[#808285] text-md">Order No.</Text>
              <Text className="text-[#A71E21] text-xl font-semibold">
                #32145
              </Text>
            </View>

            <View className="mt-[40%]">
              <Text className="text-[#808285] text-md">Pickup No.</Text>
              <Text className="text-[#A71E21] text-xl font-semibold">
                #32145
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-[#A71E21] w-[60] items-center py-4 rounded-tr-3xl rounded-bl-3xl absolute top-0 right-0">
          <Image source={smartphone} />
        </View>
      </View>

      <View className="bg-white mt-5 mx-5 rounded-3xl relative h-1/4 flex shadow-sm shadow-black">
        <View className="pl-5 pt-5">
          <Text className="font-semibold text-black text-xl">
            Location Info
          </Text>
        </View>

        <View className="mt-5 flex flex-col justify-between h-[48%]">
          <View className="flex flex-row justify-self-start pl-5">
            <View>
              <Image source={navigation} />
            </View>

            <View className="ml-3 flex items-start">
              <Text className="text-[#343434] font-medium text-lg p-0 mt-[-2%]">
                Los Angeles, Canifornia, USA
              </Text>
              <Text>Los Angeles, Canifornia, USA</Text>
            </View>
          </View>

          <View className="flex flex-row justify-self-start pl-5 mt-[-10%]">
            <View>
              <Image source={clock} wi />
            </View>

            <View className="ml-3 flex items-start">
              <Text className="text-[#343434] font-medium text-lg p-0 mt-[-%]">
                11:00pm
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex relative h-[40vh] mt-5 items-center ">
        <View>
          <Image source={buldingImage} />
        </View>

        <View className="absolute flex w-full items-center  flex-col group">
          <View className="flex bg-white justify-center h-[80] w-[80] items-center rounded-full">
            <Image source={logoutIcon} />
          </View>

          <View className="flex items-center justify-center">
            <Text className="text-[#A39696]">
              brokered by Jaro Transportation
            </Text>
            <Text className="text-[#A39696] pb-10 mt-2">330-393-5659</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
