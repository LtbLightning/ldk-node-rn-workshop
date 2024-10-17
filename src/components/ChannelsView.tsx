import React from 'react';
import {View, Text} from 'react-native';
import {IconButton} from './IconButton';
import {ChannelsListView} from './ChannelsListView';
import {styles} from '../styles';
import {ChannelDetails} from 'ldk_node/lib/classes/Bindings';

interface ChannelsViewProps {
  channels: Array<ChannelDetails> | undefined;
  openChannelModal: () => void;
  handleMenuItemCallback: (
    index: number,
    channelIndex: number,
  ) => Promise<void>;
}

export const ChannelsView: React.FC<ChannelsViewProps> = ({
  channels,
  openChannelModal,
  handleMenuItemCallback,
}) => {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.boldNormal}>Channels</Text>
        <IconButton onPress={openChannelModal} title=" + Channel" />
      </View>
      <ChannelsListView
        channels={channels}
        menuItemCallback={handleMenuItemCallback}
      />
    </View>
  );
};
