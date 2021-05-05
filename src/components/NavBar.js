import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { THEME } from '../theme';
import { AppBoldText } from '../components/ui/appBoldText';

export const NavBar = ({ title }) => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIos,
          android: styles.navbarAndroid,
        }),
      }}
    >
      <AppBoldText style={styles.text}>{title}</AppBoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  text: {
    color: Platform.OS === 'android' ? 'white' : THEME.MAIN_COLOR,
    fontSize: 20,
  },
  navbarIos: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.MAIN_COLOR,
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
});
