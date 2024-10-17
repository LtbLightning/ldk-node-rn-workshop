import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from '../styles';
import {BalanceView} from './BalanceView';
import {NodeInfoView} from './NodeInfoView';
import {ActionButtons} from './ActionButtons';
import {ChannelsView} from './ChannelsView';

interface MainContentProps {
  balance: number;
  nodeInfo: {listeningAddress: string; nodeId: string};
  onChainAddress: string;
  onChainBalance: () => Promise<void>;
  newOnchainAddress: () => Promise<void>;
  openReceiveModal: () => void;
  listChannels: () => Promise<void>;
  channels: any[];
  openChannelModal: () => void;
  handleMenuItemCallback: (
    index: number,
    channelIndex: number,
  ) => Promise<void>;
}

export const MainContent: React.FC<MainContentProps> = ({
  balance,
  nodeInfo,
  onChainAddress,
  onChainBalance,
  newOnchainAddress,
  openReceiveModal,
  listChannels,
  channels,
  openChannelModal,
  handleMenuItemCallback,
}) => {
  return (
    <ScrollView style={{minHeight: '100%'}}>
      <View style={styles.responseBox}>
        <BalanceView balance={balance} />
        <NodeInfoView nodeInfo={nodeInfo} onChainAddress={onChainAddress} />
      </View>

      <ActionButtons
        onChainBalance={onChainBalance}
        newOnchainAddress={newOnchainAddress}
        openReceiveModal={openReceiveModal}
        listChannels={listChannels}
      />
      <ChannelsView
        channels={channels}
        openChannelModal={openChannelModal}
        handleMenuItemCallback={handleMenuItemCallback}
      />
    </ScrollView>
  );
};
