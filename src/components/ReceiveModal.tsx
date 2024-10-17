import React, {useState} from 'react';
import {Modal, View, Text, TextInput} from 'react-native';
import {styles} from '../styles';
import {Button} from './Button';

interface ReceiveModalProps {
  visible: boolean;
  onClose: () => void;
  onReceive: (amount: string) => void;
}

export const ReceiveModal: React.FC<ReceiveModalProps> = ({
  visible,
  onClose,
  onReceive,
}) => {
  const [amount, setAmount] = useState('');

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.receiveModal}>
          <Text style={styles.title}>Receive via Lightning</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount in sats"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Button
            style={styles.fullWidthBtn}
            title={amount.length === 0 ? 'Close' : 'Receive'}
            onPress={() => {
              if (amount.length === 0) {
                onClose();
              } else {
                onReceive(amount);
              }
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
