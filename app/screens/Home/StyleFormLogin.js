import {StyleSheet} from 'react-native';
import Theme from '../../Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  separator: {
    height: 1,
    width: '86%',
    backgroundColor: '#CED0CE',
    marginLeft: '7%',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    color: 'gray',
  },
  textContent: {
    marginTop: 5,
  },
  touchableOpacityStyle: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignContent: 'center',
    padding:5
  },
});

export default styles;
