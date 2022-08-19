import React from 'react';
import {StyleSheet, View} from 'react-native';
import ArrowBack from '../assets/icons/ArrowBack';
import HambugerIcon from '../assets/icons/HambugerIcon';
import {hp, wp} from '../utils/responsive-dimension';

const Header = () => {
  return (
    <View style={styles.main}>
      <ArrowBack />
      <HambugerIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(24),
    paddingTop: hp(10),
  },
});

export default Header;
