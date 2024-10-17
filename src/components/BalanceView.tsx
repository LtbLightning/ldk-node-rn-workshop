import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../styles';

interface BalanceViewProps {
  balance: number;
}

export const BalanceView: React.FC<BalanceViewProps> = ({balance}) => {
  return (
    <View>
      <Text style={styles.balanceText}>{balance / 100000000} BTC</Text>
    </View>
  );
};
