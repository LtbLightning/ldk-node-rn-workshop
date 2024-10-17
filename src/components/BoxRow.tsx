import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../styles';

interface BoxRowProps {
  title: string;
  value: any;
  color?: string;
}

export const BoxRow: React.FC<BoxRowProps> = ({title, value, color}) => {
  return (
    <View style={styles.boxRow}>
      <Text
        style={{
          ...styles.boldNormal,
          color: color ?? 'black',
        }}>{`${title}: `}</Text>
      <Text selectable style={{color: color ?? 'black', fontSize: 12}}>
        {value}
      </Text>
    </View>
  );
};
