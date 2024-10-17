import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from '../styles';

interface IconButtonProps {
  onPress: () => void;
  title: string;
  style?: any;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  title,
  style,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.smallButton, ...style}}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}>
      <Text style={{color: disabled ? '#7F8C8D' : 'black'}}>{title}</Text>
    </TouchableOpacity>
  );
};
