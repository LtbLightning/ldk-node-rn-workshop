import React, {useState, Fragment} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Button} from './Button';
import {IconButton} from './IconButton';
import {ModalView} from './ModalView';
import {styles} from '../styles';
import {ChannelParams} from '../types';

interface OpenChannelModalProps {
  openChannelCallback: (params: ChannelParams) => void;
  cancelCallback: () => void;
}

export const OpenChannelModal: React.FC<OpenChannelModalProps> = ({
  openChannelCallback,
  cancelCallback,
}) => {
  const [channelDetails, setChannelDetails] = useState<ChannelParams>({
    nodeId: '',
    ip: '',
    port: '',
    amount: '',
    counterPartyAmount: '',
  });

  const updateDetails = (key: keyof ChannelParams, value: string) => {
    setChannelDetails(st => ({...st, [key]: value}));
  };

  const showSubmit = Object.values(channelDetails).every(value => value !== '');

  return (
    <ModalView>
      <Fragment>
        <IconButton
          onPress={cancelCallback}
          title="X"
          style={styles.closeButton}
        />
        <Text style={{...styles.leftAlign, ...styles.boldNormal}}>
          Open Channel
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Node Id"
          placeholderTextColor="rgba(211, 211, 211, 1)"
          onChangeText={e => updateDetails('nodeId', e)}
          value={channelDetails.nodeId}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Ip Address"
          placeholderTextColor="rgba(211, 211, 211, 1)"
          onChangeText={e => updateDetails('ip', e)}
          value={channelDetails.ip}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Port"
          placeholderTextColor="rgba(211, 211, 211, 1)"
          onChangeText={e => updateDetails('port', e)}
          value={channelDetails.port}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Amount in sats"
          placeholderTextColor="rgba(211, 211, 211, 1)"
          onChangeText={e => updateDetails('amount', e)}
          value={channelDetails.amount}
        />
        <TextInput
          style={styles.textInput}
          placeholder="CounterPartyAmount in sats"
          placeholderTextColor="rgba(211, 211, 211, 1)"
          onChangeText={e => updateDetails('counterPartyAmount', e)}
          value={channelDetails.counterPartyAmount}
        />
        {showSubmit && (
          <Button
            title="Submit"
            style={styles.fullWidthBtn}
            onPress={() => openChannelCallback(channelDetails)}
          />
        )}
      </Fragment>
    </ModalView>
  );
};
