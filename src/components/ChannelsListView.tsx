import React, {Fragment} from 'react';
import {View, Text, Image} from 'react-native';
import {ChannelDetails} from 'ldk_node/lib/classes/Bindings';
import {IconButton} from './IconButton';
import {BoxRow} from './BoxRow';
import {styles, AppColors} from '../styles';
import {mSatsToSats} from '../utils';

interface ChannelsListViewProps {
  channels: Array<ChannelDetails> | undefined;
  menuItemCallback: (index: number, channelIndex: number) => void;
}

export const ChannelsListView: React.FC<ChannelsListViewProps> = ({
  channels,
  menuItemCallback,
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
                  source={require('../assets/complete.png')}
                  style={styles.channelIcon}
                />
              ) : (
                <Image
                  source={require('../assets/waiting.png')}
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
