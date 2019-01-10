import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#CCCCCC',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  row: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#CCCCCC',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  command: {
    flex: 2,
    marginLeft: 12,
    fontSize: 16,
  },
  runtime: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

const Row = (props) => (
  // <View style={styles.container}>
    <TouchableHighlight style={styles.container} onPress={() => console.log('Press')}>
      <View style={styles.row}>
        {/*<Image source={{ uri: props.picture.large}} style={styles.photo} />*/}
        <Text numberOfLines={1} style={styles.command}>
          {`${props.command}`}
        </Text>
        <Text style={styles.runtime}>
          {`${props.runtime}`}
        </Text>
      </View>
    </TouchableHighlight>
  // </View>
);

export default Row;
