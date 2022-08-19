/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Header from '../../components/Header';
import WeatherCard from '../../components/WeatherCard';
import {weatherApi} from '../../redux/WeatherApi';
import {getIconUrl} from '../../utils/getIcon';
import {hp, wp} from '../../utils/responsive-dimension';
import TempText from './components/TempText';
import Geolocation from 'react-native-geolocation-service';

const Home = () => {
  const [hasLocationPermission, setHasLocationPermission] =
    useState<any>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [trigger, result] = weatherApi.endpoints.getWeather.useLazyQuery();

  const checkLocationAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'App Location Permission',
          message:
            'The app need to access your location so that you can get accurate weather report.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        setHasLocationPermission(true);
      }
      return granted;
    } catch (err) {
      console.warn(err);
    }
  };

  const checkPermissionIOS = async () => {
    let locationPermission = await Geolocation.requestAuthorization(
      'whenInUse',
    );
    if (locationPermission === 'granted') {
      setHasLocationPermission(true);
    }
    return locationPermission;
  };

  const locationStatus = async () => {
    if (Platform.OS === 'android') {
      await checkLocationAndroid();
    } else {
      await checkPermissionIOS();
    }
    setLoading(false);
  };

  useEffect(() => {
    locationStatus();
  }, []);

  useEffect(() => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          trigger({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [hasLocationPermission]);

  if (!hasLocationPermission) {
    return (
      <View style={styles.loadingContainer}>
        <Text
          style={[styles.text, {fontSize: wp(18), fontFamily: 'DMSans-Bold'}]}>
          Location permission needed
        </Text>
        <TouchableOpacity onPress={() => Linking.openSettings()}>
          <Text>open settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (result?.isLoading || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'small'} color={'#2E30AD'} />
        {/* <Text
          style={[styles.text, {fontSize: wp(18), fontFamily: 'DMSans-Bold'}]}>
          {error?.data}
        </Text> */}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.text}>Today</Text>
        <View style={styles.tempInfoContainer}>
          <TempText
            temp={result?.data?.current.temp.toFixed()}
            main={result?.data?.current.weather[0].main}
            description={result?.data?.current.weather[0].description}
          />
          <Image
            source={{uri: getIconUrl(result?.data?.current.weather[0].icon)}}
            style={styles.todayWeatherIcon}
          />
        </View>

        <View style={{marginTop: hp(170)}}>
          <FlatList
            data={result?.data?.hourly}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.humidity}_${index}`}
            renderItem={({item}) => (
              <WeatherCard
                image={{uri: getIconUrl(item.weather[0].icon)}}
                time={item.dt}
                temp={item.temp}
                marginLeft={wp(24)}
              />
            )}
          />
        </View>
        <View style={styles.otherInfo}>
          <View style={styles.otherInfoChild}>
            <Text style={styles.infoText}>
              Pressure |{' '}
              <Text style={{fontFamily: 'DMSans-Bold'}}>
                {result?.data?.current.pressure &&
                  result?.data?.current.pressure / 100}
              </Text>
              hpa
            </Text>
          </View>
          <View style={[styles.otherInfoChild, styles.borderLeft]}>
            <Text style={styles.infoText}>
              Humidity |{' '}
              <Text style={{fontFamily: 'DMSans-Bold'}}>
                {result?.data?.current.humidity}
              </Text>
              %
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  content: {
    marginTop: hp(40),
  },
  text: {
    fontSize: wp(16),
    fontFamily: 'DMSans-Medium',
    paddingHorizontal: wp(24),
  },
  tempInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(24),
    paddingHorizontal: wp(24),
  },
  degText: {
    fontSize: wp(96),
    fontFamily: 'DMSans-Bold',
    color: '#2E30AD',
  },
  todayWeatherIcon: {
    width: wp(109),
    height: hp(109),
    resizeMode: 'contain',
  },
  otherInfo: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(44),
  },
  otherInfoChild: {
    alignItems: 'center',
    paddingHorizontal: wp(24),
    flex: 0.5,
    borderTopWidth: wp(1),
    borderBottomWidth: wp(1),
    borderColor: '#E0E0E0',
    paddingVertical: hp(46),
  },
  borderLeft: {
    borderLeftWidth: wp(1),
    borderColor: '#E0E0E0',
  },
  infoText: {
    fontSize: wp(18),
    fontFamily: 'DMSans-Regular',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
