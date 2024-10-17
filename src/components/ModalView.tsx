import React from 'react';
import {Modal, View} from 'react-native';
import {styles} from '../styles';

interface ModalViewProps {
  children: React.ReactNode;
}

export const ModalView: React.FC<ModalViewProps> = ({children}) => {
  return (
    <Modal transparent={true}>
      <View style={styles.modelContainer}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};
