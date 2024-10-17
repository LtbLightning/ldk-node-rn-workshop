import React, {useState} from 'react';
import {Text, TextInput} from 'react-native';
import {Node} from 'ldk_node';
import {Button} from './Button';
import {IconButton} from './IconButton';
import {ModalView} from './ModalView';
import {styles} from '../styles';
import {satsToMsats} from '../utils';

const menuItems = ['Close', 'Send', 'Receive'];

interface PaymentModalProps {
  index: number;
  hide: () => void;
  node: Node | undefined;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  index,
  hide,
  node,
}) => {
  const [value, setValue] = useState('');
  const [response, setResponse] = useState<any>();
  const isSend = index == 1;

  const handleSubmit = async () => {
    try {
      setValue('');
      let res = isSend
        ? await node?.sendPayment(value)
        : await node?.receiveViaJitChannel(
            satsToMsats(parseInt(value)),
            'test',
            3600,
          );
      console.log(res);
      setResponse(JSON.stringify(res).replaceAll('"', ''));
      isSend && hide();
    } catch (error) {
      console.log('---Send Payment--- ', error);
    }
  };

  return (
    <ModalView>
      <IconButton onPress={hide} title="X" style={styles.closeButton} />
      <Text style={{...styles.leftAlign, ...styles.boldText}}>
        {menuItems[index]}
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder={isSend ? 'Invoice' : 'Amount in sats'}
        onChangeText={setValue}
        value={value}
        multiline
      />
      <Button
        title={isSend ? 'Send' : 'Receive'}
        style={styles.fullWidthBtn}
        onPress={handleSubmit}
      />
      <Text selectable>{response}</Text>
    </ModalView>
  );
};
