import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {hp, wp} from '../../../utils/responsive-dimension';

interface tempText {
  temp?: string;
  main?: string;
  description?: string;
}
const TempText = ({temp, main, description}: tempText) => {
  return (
    <View>
      <Text style={styles.degText}>{temp}°c</Text>
      <Text
        style={[
          styles.mainText,
          {fontSize: wp(18), fontFamily: 'DMSans-Bold'},
        ]}>
        {main}
      </Text>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  content: {
    marginHorizontal: wp(24),
    marginTop: hp(40),
  },
  degText: {
    fontSize: wp(96),
    fontFamily: 'DMSans-Bold',
    color: '#2E30AD',
  },
  mainText: {
    fontSize: wp(18),
    fontFamily: 'DMSans-Bold',
  },
  descriptionText: {
    fontSize: wp(16),
    fontFamily: 'DMSans-Medium',
    color: '#4F4F4F',
  },
});

export default TempText;
