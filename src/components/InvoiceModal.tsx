import React from 'react';
import {Modal, View, Text} from 'react-native';
import {Button} from './Button';
import {styles} from '../styles';

interface InvoiceModalProps {
  visible: boolean;
  onClose: () => void;
  invoice: string;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  visible,
  onClose,
  invoice,
}) => {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.invoiceModal}>
          <Text style={styles.title}>Invoice</Text>
          <Text selectable style={[styles.invoiceText, {textAlign: 'left'}]}>
            {invoice}
          </Text>
          <Button style={styles.fullWidthBtn} title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};
