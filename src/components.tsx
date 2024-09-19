import {
  ButtonProps,
  Image,
  Keyboard,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Fragment, useState} from 'react';

import {ChannelDetails} from 'ldk_node/lib/classes/Bindings';
import {Node} from 'ldk_node';
import {AppColors, styles} from './styles';
import React from 'react';

export const satsToMsats = (sats: number) => sats * 1000;
export const mSatsToSats = (mSats: number) => mSats / 1000 + 'sats';

export interface ChannelParams {
  nodeId: string;
  ip: string;
  port: string;
  amount: string;
  counterPartyAmount: string;
}

const menuItems = ['Close', 'Send', 'Receive'];

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

export const Header = () => {
  return (
    <View
      style={{
        ...styles.row,
        paddingHorizontal: 25,
        marginTop: Platform.OS === 'ios' ? -20 : 0,
      }}>
      <Image
        source={require('./assets/reactnative_logo.png')}
        style={styles.img}
        resizeMode="contain"
      />
      <Text style={{fontWeight: '700', fontSize: 15, textAlign: 'center'}}>
        {'Demo App \n Ldk Node RN Workshop'}
      </Text>
      <Image source={require('./assets/ldk_logo.png')} style={styles.img} />
    </View>
  );
};

export const MnemonicView = ({
  buildNodeCallback,
}: {
  buildNodeCallback: Function;
}) => {
  const androidMnemonic =
    'awkward fox lawn senior flavor cook genuine cake endorse rare walk this';
  const iosMnemonic =
    'absurd aware donate anxiety gather lottery advice document advice choice limb balance';

  const [mnemonic, setMnemonic] = useState(
    Platform.OS === 'android'
      ? androidMnemonic
      : Platform.Version == '17.0'
      ? androidMnemonic
      : iosMnemonic,
  );
  return (
    <View>
      <Text style={styles.boldText}>Enter Menmonic</Text>
      <TextInput
        multiline
        style={styles.responseBox}
        onChangeText={setMnemonic}
        value={mnemonic}
      />
      {mnemonic != '' && (
        <Button
          title="Start Node"
          onPress={() => buildNodeCallback(mnemonic)}
        />
      )}
    </View>
  );
};

export const IconButton = ({
  onPress,
  title,
  style,
  disabled,
}: {
  onPress: any;
  title: string;
  style?: any;
  disabled?: boolean;
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

export const OpenChannelModal = ({
  openChannelCallback,
  cancelCallback,
}: {
  openChannelCallback: (params: ChannelParams) => {};
  cancelCallback: any;
}) => {
  const [channelDetails, setChannelDetails] = useState({
    nodeId: '',
    ip: '',
    port: '',
    amount: '',
    counterPartyAmount: '',
  });

  const updateDetails = (key: any, value: any) => {
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
          onChangeText={e => updateDetails('nodeId', e)}
          value={channelDetails.nodeId}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Ip Address"
          onChangeText={e => updateDetails('ip', e)}
          value={channelDetails.ip}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Port"
          onChangeText={e => updateDetails('port', e)}
          value={channelDetails.port}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Amount in sats"
          onChangeText={e => updateDetails('amount', e)}
          value={channelDetails.amount}
        />
        <TextInput
          style={styles.textInput}
          placeholder="CounterPartyAmount in sats"
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

export const ModalView = (props: any) => {
  return (
    <Modal transparent={true}>
      <View style={styles.modelContainer}>
        <View style={styles.modalView}>{props.children}</View>
      </View>
    </Modal>
  );
};

export const ChannelsListView = ({
  channels,
  menuItemCallback,
}: {
  channels: Array<ChannelDetails> | undefined;
  menuItemCallback: Function;
}) => {
  if (!channels?.length) {
    return <Text style={{alignSelf: 'center'}}>No Open Channels</Text>;
  }
  return (
    <Fragment>
      {channels?.map((channel, channelIndex) => {
        let isReady = channel.isChannelReady && channel.isUsable;
        return (
          <View
            key={channelIndex}
            style={{
              ...styles.channelListView,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: 12,
            }}>
            <View style={styles.channelSideView}>
              {isReady ? (
                <Image
                  source={require('./assets/complete.png')}
                  style={styles.channelIcon}
                />
              ) : (
                <Image
                  source={require('./assets/waiting.png')}
                  style={styles.channelIcon}
                />
              )}
              <Text>{`${channel.confirmations} / ${channel.confirmationsRequired}`}</Text>
            </View>
            <View style={styles.channelMainView}>
              <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                {channel.userChannelId.userChannelIdHex}
              </Text>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <BoxRow
                    title="Capacity"
                    value={`${channel.channelValueSats}sats`}
                    color={AppColors.blue}
                  />
                  <BoxRow
                    title="Local Balance"
                    value={mSatsToSats(channel.outboundCapacityMsat)}
                    color={AppColors.green}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <BoxRow
                    title="Inbound"
                    value={mSatsToSats(channel.inboundCapacityMsat)}
                    color={AppColors.green}
                  />
                  <BoxRow
                    title="Outbound"
                    value={mSatsToSats(channel.outboundCapacityMsat)}
                    color={AppColors.red}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <IconButton
                  onPress={() => menuItemCallback(1, channelIndex)}
                  title="Send"
                  style={styles.channelButton}
                  disabled={!isReady}
                />
                <IconButton
                  onPress={() => menuItemCallback(2, channelIndex)}
                  title="Receive"
                  style={styles.channelButton}
                  disabled={!isReady}
                />
                <IconButton
                  onPress={() => menuItemCallback(0, channelIndex)}
                  title="Close"
                  style={styles.channelButton}
                  disabled={!isReady}
                />
              </View>
            </View>
          </View>
        );
      })}
    </Fragment>
  );
};

export const PaymentModal = ({
  index,
  hide,
  node,
}: {
  index: number;
  hide: Function;
  node: Node | undefined;
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
          ); // Adjusted for JIT channel
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

export const BoxRow = ({
  title,
  value,
  color,
}: {
  title: string;
  value: any;
  color?: string;
}) => {
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

export const ReceiveModal = ({visible, onClose, onReceive}) => {
  const [amount, setAmount] = useState('');

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
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
              Keyboard.dismiss();
              onReceive(amount);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export const InvoiceModal = ({visible, onClose, invoice}) => {
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
