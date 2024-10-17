import React from 'react';
import {View, Image, Text, Platform} from 'react-native';
import {styles} from '../styles';

export const Header: React.FC = () => {
  return (
    <View
      style={{
        ...styles.row,
        paddingHorizontal: 25,
        marginTop: Platform.OS === 'ios' ? -20 : 0,
      }}>
      <Image
        source={require('../assets/reactnative_logo.png')}
        style={styles.img}
        resizeMode="contain"
      />
      <Text style={{fontWeight: '700', fontSize: 15, textAlign: 'center'}}>
        {'Demo App \n Ldk Node RN Workshop'}
      </Text>
      <Image source={require('../assets/ldk_logo.png')} style={styles.img} />
    </View>
  );
};
