import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  command: {
    flex: 1,
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
  <View style={styles.container}>
    {/*<Image source={{ uri: props.picture.large}} style={styles.photo} />*/}
    <Text style={styles.command}>
      {`${props.command}`}
    </Text>
    <Text style={styles.runtime}>
      {`${props.runtime}`}
    </Text>
  </View>
);

export default Row;
