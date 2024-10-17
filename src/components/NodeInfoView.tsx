import React from 'react';
import {View, Text} from 'react-native';
import {BoxRow} from './BoxRow';

interface NodeInfoViewProps {
  nodeInfo: {
    listeningAddress: string;
    nodeId: string;
  };
  onChainAddress: string;
}

export const NodeInfoView: React.FC<NodeInfoViewProps> = ({
  nodeInfo,
  onChainAddress,
}) => {
  return (
    <View>
      <BoxRow title="Listening Address" value={nodeInfo.listeningAddress} />
      <BoxRow title="Node ID" value={nodeInfo.nodeId} />
      <BoxRow title="Funding Address" value={onChainAddress} />
    </View>
  );
};
