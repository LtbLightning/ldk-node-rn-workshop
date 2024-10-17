import {useState, useEffect} from 'react';
import {WalletService} from '../services/WalletService';
import {ChannelParams} from '../types';
import {satsToMsats} from '../utils';

export const useWallet = () => {
  const [started, setStarted] = useState(false);
  const [walletService] = useState(new WalletService());
  const [nodeInfo, setNodeInfo] = useState({nodeId: '', listeningAddress: ''});
  const [balance, setBalance] = useState<number>(0);
  const [onChainAddress, setOnChainAddress] = useState<string>('');
  const [channels, setChannels] = useState<Array<any>>();

  const buildNode = async (mnemonic: string) => {
    // TODO: Implement the buildNode function
    // 1. Use walletService.buildNode(mnemonic) to build the node
    // 2. Set the node info using setNodeInfo
    // 3. Set started to true using setStarted
    // 4. Handle any errors and log them to the console
  };

  const onChainBalance = async () => {
    // TODO: Implement the onChainBalance function
    // 1. Use walletService.getOnChainBalance() to get the balance
    // 2. Set the balance using setBalance (default to 0 if undefined)
    // 3. Handle any errors and log them to the console
  };

  const newOnchainAddress = async () => {
    // TODO: Implement the newOnchainAddress function
    // 1. Use walletService.getNewOnchainAddress() to get a new address
    // 2. Set the address using setOnChainAddress (default to empty string if undefined)
    // 3. Handle any errors and log them to the console
  };

  const openChannel = async (params: ChannelParams) => {
    // TODO: Implement the openChannel function
    // 1. Use walletService.openChannel(params) to open a new channel
    // 2. Handle any errors and log them to the console
  };

  const listChannels = async () => {
    // TODO: Implement the listChannels function
    // 1. Use walletService.listChannels() to get the list of channels
    // 2. Set the channels using setChannels
    // 3. Handle any errors and log them to the console
  };

  const closeChannel = async (channelIndex: number) => {
    // TODO: Implement the closeChannel function
    // 1. Get the current channel from the channels array using the channelIndex
    // 2. If the channel exists, use walletService.closeChannel() to close it
    //    (You'll need the userChannelId and counterpartyNodeId from the channel)
    // 3. After closing, call listChannels() to update the channel list
    // 4. Handle any errors and log them to the console
  };

  const receiveBolt11Payment = async (amount: string) => {
    // TODO: Implement the receiveBolt11Payment function
    // 1. Check if walletService.getNode() and amount are available
    // 2. If available, use walletService.getNode()?.receiveViaJitChannel() to receive payment
    //    (Convert amount to millisatoshis using satsToMsats)
    // 3. Return the invoice as a string (remove double quotes)
    // 4. If node or amount is not available, log a warning
    // 5. Handle any errors and log them to the console
  };

  return {
    started,
    nodeInfo,
    balance,
    onChainAddress,
    channels,
    walletService,
    buildNode,
    onChainBalance,
    newOnchainAddress,
    openChannel,
    listChannels,
    closeChannel,
    receiveBolt11Payment,
  };
};
