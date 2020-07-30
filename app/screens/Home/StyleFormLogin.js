import React from 'react';
import { StyleSheet } from 'react-native';
import Theme from '../../Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  author: {
    color: 'gray'
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    width: 50,
    height: 50,
    backgroundColor: Theme.Colors.appDark,
    borderRadius: 25,
    alignContent: 'center',
    padding: 5
  },
});

export default styles;