import React from 'react';
import {View} from 'react-native';
import {Button} from './Button';

interface ActionButtonsProps {
  onChainBalance: () => Promise<void>;
  newOnchainAddress: () => Promise<void>;
  openReceiveModal: () => void;
  listChannels: () => Promise<void>;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onChainBalance,
  newOnchainAddress,
  openReceiveModal,
  listChannels,
}) => {
  return (
    <View>
      <Button title="On Chain Balance" onPress={onChainBalance} />
      <Button title="New Funding Address" onPress={newOnchainAddress} />
      <Button title="Receive via Lightning" onPress={openReceiveModal} />
      <Button title="List Channels" onPress={listChannels} />
    </View>
  );
};
