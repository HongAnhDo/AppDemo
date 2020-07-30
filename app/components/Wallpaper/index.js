import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View
} from 'react-native';
import bgSrc from '../../assets/images/wallpaper.png';
import Theme from '../../Theme'

export default class Wallpaper extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
      >
        <View style={styles.picture} >
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

  picture: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: Theme.Colors.appLight
    // resizeMode: 'cover',
  },
  container: {
    flex: 1
  }
});
