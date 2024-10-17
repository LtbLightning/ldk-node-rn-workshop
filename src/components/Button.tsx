import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ButtonProps,
} from 'react-native';
import {AppColors} from '../styles';

export const Button = ({
  loading,
  style,
  title,
  ...rest
}: React.PropsWithChildren<ButtonProps & {loading?: boolean; style?: any}>) => {
  return (
    <TouchableOpacity style={{...styles.btn, ...style}} {...rest}>
      <Text style={{color: 'white', fontSize: 17}}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    backgroundColor: AppColors.blue,
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 12,
    margin: 7,
    alignItems: 'center',
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
