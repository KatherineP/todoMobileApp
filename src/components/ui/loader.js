import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { AppText } from './appText';
import { THEME } from '../../theme';

export const Loader = () => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
