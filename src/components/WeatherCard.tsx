import React from 'react';
import {StyleSheet, Text, View, Image, ImageSourcePropType} from 'react-native';
import {hp, wp} from '../utils/responsive-dimension';
import moment from 'moment';

interface types {
  marginLeft: number;
  image: ImageSourcePropType;
  time: number;
  temp: number;
}

function WeatherCard({marginLeft, image, time, temp}: types) {
  let newTime = new Date(time * 1000);
  return (
    <View style={[styles.weatherInfo, {marginLeft}]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.degInfo}>{moment(newTime).format('ha')}</Text>
        <Text style={styles.degText}>{temp.toFixed()}°c</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(98),
    height: hp(98),
    backgroundColor: '#2E30AD07',
    borderRadius: wp(12),
  },
  image: {
    width: wp(56),
    height: wp(56),
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  degText: {
    fontSize: wp(32),
    marginTop: hp(10),
    fontFamily: 'DMSans-Bold',
    color: '#2E30AD',
  },
  degInfo: {
    fontSize: wp(18),
    marginTop: hp(8),
    fontFamily: 'DMSans-Bold',
    color: '#000000',
  },
});

export default WeatherCard;
